"use client";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function AjustesPage() {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push("/sign-in");
  }

  return (
    <div style={{ background: "#FAFAF9", minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ maxWidth: 540, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Configuración</p>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1A1A1A", margin: 0, letterSpacing: "-0.5px" }}>Ajustes</h1>
        </div>

        {/* Perfil */}
        <div style={{ marginBottom: 12 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Perfil</p>
          <div style={{ background: "#FFFFFF", border: "0.5px solid #E5E7EB", borderRadius: 14, overflow: "hidden" }}>

            {/* Avatar + nombre */}
            <div style={{ padding: "20px 20px 16px", display: "flex", alignItems: "center", gap: 14, borderBottom: "0.5px solid #F3F4F6" }}>
              {user?.imageUrl ? (
                <img src={user.imageUrl} alt="Avatar" style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
              ) : (
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 20, fontWeight: 700, color: "#6366F1" }}>
                    {user?.firstName?.[0] || user?.username?.[0] || "?"}
                  </span>
                </div>
              )}
              <div>
                <p style={{ fontSize: 16, fontWeight: 700, color: "#1A1A1A", margin: "0 0 2px" }}>
                  {user?.firstName && user?.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : user?.firstName || user?.username || "Usuario"}
                </p>
                <p style={{ fontSize: 13, color: "#9CA3AF", margin: 0 }}>@{user?.username || "sin username"}</p>
              </div>
            </div>

            {/* Email */}
            <Campo label="Email" valor={user?.primaryEmailAddress?.emailAddress || "—"} />
            <Campo label="Nombre" valor={user?.firstName || "—"} />
            <Campo label="Username" valor={user?.username ? `@${user.username}` : "—"} ultimo />
          </div>
        </div>

        {/* Botón gestionar cuenta */}
        <button
          onClick={() => openUserProfile()}
          style={{
            width: "100%", background: "#FFFFFF", border: "0.5px solid #E5E7EB",
            borderRadius: 14, padding: "14px 20px", fontSize: 14, fontWeight: 600,
            color: "#6366F1", cursor: "pointer", textAlign: "left",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: 24, transition: "border-color 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = "#C7D2FE")}
          onMouseLeave={e => (e.currentTarget.style.borderColor = "#E5E7EB")}
        >
          <span>Gestionar cuenta</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Cerrar sesión */}
        <div style={{ marginBottom: 12 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Sesión</p>
          <button
            onClick={handleSignOut}
            style={{
              width: "100%", background: "#FFFFFF", border: "0.5px solid #E5E7EB",
              borderRadius: 14, padding: "14px 20px", fontSize: 14, fontWeight: 600,
              color: "#EF4444", cursor: "pointer", textAlign: "left",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              transition: "border-color 0.15s, background 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#FECACA"; e.currentTarget.style.background = "#FEF2F2"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.background = "#FFFFFF"; }}
          >
            <span>Cerrar sesión</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>

        {/* Versión */}
        <p style={{ fontSize: 12, color: "#D1D5DB", textAlign: "center", marginTop: 32 }}>
          ChangeME · MVP v0.1
        </p>

      </div>
    </div>
  );
}

// ── CAMPO PERFIL ──────────────────────────────────────────────
function Campo({ label, valor, ultimo }: { label: string; valor: string; ultimo?: boolean }) {
  return (
    <div style={{
      padding: "12px 20px",
      borderBottom: ultimo ? "none" : "0.5px solid #F3F4F6",
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <span style={{ fontSize: 13, color: "#6B7280", fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: 13, color: "#1A1A1A", fontWeight: 500 }}>{valor}</span>
    </div>
  );
}