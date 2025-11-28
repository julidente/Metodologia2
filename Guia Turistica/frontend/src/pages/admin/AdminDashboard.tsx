const AdminDashboard = () => {
  return (
    <section
      style={{
        maxWidth: "1120px",
        margin: "0 auto",
        padding: "2rem 1rem"
      }}
    >
      <h1 style={{ fontSize: "1.6rem", fontWeight: 600, marginBottom: "0.75rem" }}>
        Panel del administrador
      </h1>
      <p style={{ fontSize: "0.9rem", color: "#475569" }}>
        Desde acá vas a poder administrar destinos, imágenes y toda la información del sitio turístico.
      </p>
    </section>
  );
};

export default AdminDashboard;
