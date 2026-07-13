const Anthropic = require('@anthropic-ai/sdk')
const prisma = require('./db')

const client = new Anthropic()

const TOOLS = [
  {
    name: 'listar_eventos',
    description: 'Lista todos los eventos del usuario. Úsala para buscar un evento antes de modificarlo o eliminarlo.',
    input_schema: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'crear_evento',
    description: 'Crea un nuevo evento en el calendario del usuario.',
    input_schema: {
      type: 'object',
      properties: {
        titulo:      { type: 'string', description: 'Título del evento (requerido)' },
        descripcion: { type: 'string', description: 'Descripción opcional' },
        fecha:       { type: 'string', description: 'Fecha en formato YYYY-MM-DD (requerido)' },
        horaInicio:  { type: 'string', description: 'Hora de inicio en formato HH:MM' },
        horaFin:     { type: 'string', description: 'Hora de fin en formato HH:MM' }
      },
      required: ['titulo', 'fecha']
    }
  },
  {
    name: 'actualizar_evento',
    description: 'Actualiza un evento existente. Requiere el ID del evento.',
    input_schema: {
      type: 'object',
      properties: {
        id:          { type: 'string', description: 'ID del evento a actualizar (requerido)' },
        titulo:      { type: 'string', description: 'Nuevo título' },
        descripcion: { type: 'string', description: 'Nueva descripción' },
        fecha:       { type: 'string', description: 'Nueva fecha en formato YYYY-MM-DD' },
        horaInicio:  { type: 'string', description: 'Nueva hora de inicio en formato HH:MM' },
        horaFin:     { type: 'string', description: 'Nueva hora de fin en formato HH:MM' }
      },
      required: ['id']
    }
  },
  {
    name: 'eliminar_evento',
    description: 'Elimina un evento del calendario. Requiere el ID del evento.',
    input_schema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'ID del evento a eliminar (requerido)' }
      },
      required: ['id']
    }
  }
]

async function ejecutarHerramienta(nombre, input, userId) {
  switch (nombre) {
    case 'listar_eventos': {
      const eventos = await prisma.evento.findMany({
        where: { userId },
        orderBy: { fecha: 'asc' }
      })
      return JSON.stringify(eventos)
    }
    case 'crear_evento': {
      const { titulo, descripcion, fecha, horaInicio, horaFin } = input
      const evento = await prisma.evento.create({
        data: {
          titulo,
          descripcion: descripcion || null,
          fecha,
          horaInicio: horaInicio || null,
          horaFin: horaFin || null,
          userId
        }
      })
      return JSON.stringify(evento)
    }
    case 'actualizar_evento': {
      const { id, titulo, descripcion, fecha, horaInicio, horaFin } = input
      const evento = await prisma.evento.update({
        where: { id, userId },
        data: {
          ...(titulo !== undefined && { titulo }),
          ...(descripcion !== undefined && { descripcion }),
          ...(fecha !== undefined && { fecha }),
          ...(horaInicio !== undefined && { horaInicio }),
          ...(horaFin !== undefined && { horaFin })
        }
      })
      return JSON.stringify(evento)
    }
    case 'eliminar_evento': {
      const { id } = input
      const evento = await prisma.evento.delete({
        where: { id, userId }
      })
      return JSON.stringify({ eliminado: true, evento })
    }
    default:
      return JSON.stringify({ error: `Herramienta desconocida: ${nombre}` })
  }
}

async function ejecutarAgente(mensaje, userId) {
  const today = new Date().toISOString().split('T')[0]
  const messages = [{ role: 'user', content: mensaje }]

  const system = `Eres un asistente de calendario inteligente. Ayudas al usuario a gestionar sus eventos.
Puedes listar, crear, actualizar y eliminar eventos.
Si el usuario quiere modificar o eliminar un evento sin dar el ID, primero lista los eventos para encontrar el correcto.
Responde siempre en español y confirma las acciones realizadas con los detalles relevantes.
Fecha de hoy: ${today}.`

  while (true) {
    const response = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 4096,
      thinking: { type: 'adaptive' },
      system,
      tools: TOOLS,
      messages
    })

    messages.push({ role: 'assistant', content: response.content })

    if (response.stop_reason === 'end_turn') {
      const textBlock = response.content.find(b => b.type === 'text')
      return textBlock ? textBlock.text : 'Listo.'
    }

    if (response.stop_reason === 'tool_use') {
      const toolResults = []
      for (const block of response.content) {
        if (block.type !== 'tool_use') continue
        let result
        try {
          result = await ejecutarHerramienta(block.name, block.input, userId)
        } catch (err) {
          result = JSON.stringify({ error: err.message })
        }
        toolResults.push({
          type: 'tool_result',
          tool_use_id: block.id,
          content: result
        })
      }
      messages.push({ role: 'user', content: toolResults })
    } else {
      break
    }
  }

  return 'No pude completar la operación.'
}

module.exports = { ejecutarAgente }
