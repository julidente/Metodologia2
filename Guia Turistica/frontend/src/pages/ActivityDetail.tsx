import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActivityById } from "../services/activity.service";
import { Activity, activitySchema } from "../types/activity";

const ActivityDetail = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await getActivityById(id);
        const parsed = data;
        setActivity(parsed);
      } catch (err: any) {
        console.error(err);
        setError("No se pudo cargar el destino.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return <p style={{ padding: "2rem 1rem" }}>Cargando destino...</p>;
  }

  if (error || !activity) {
    return (
      <p style={{ padding: "2rem 1rem", color: "crimson" }}>
        {error || "Destino no encontrado"}
      </p>
    );
  }

  //const cover = activity.images && activity.images.length > 0 ? activity.images[0].url : null;
  const cover =
  activity.images && activity.images.length > 0
    ? `${import.meta.env.VITE_BACKEND_URL}${activity.images[0].url}`
    : null;
  const cityName = activity.city?.name ?? activity.location;
  const provinceName = activity.city?.province?.name;
  const categoryName = activity.category?.name;

  return (
    <section
      style={{
        maxWidth: "960px",
        margin: "0 auto",
        padding: "2rem 1rem 3rem"
      }}
    >
      <div
        style={{
          height: "260px",
          backgroundImage: cover
            ? `url(${cover})`
            : "linear-gradient(to bottom, #1d4ed8, #0ea5e9)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "0.75rem",
          marginBottom: "1rem"
        }}
      />
      <h1
        style={{
          fontSize: "1.6rem",
          fontWeight: 600,
          marginBottom: "0.5rem"
        }}
      >
        {activity.name}
      </h1>
      <p style={{ fontSize: "0.9rem", color: "#475569", marginBottom: "0.75rem" }}>
        {cityName}
        {provinceName ? ` · ${provinceName}` : ""}
        {categoryName ? ` · ${categoryName}` : ""}
      </p>
      {activity.description && (
        <p style={{ fontSize: "0.95rem", color: "#0f172a", marginBottom: "1rem" }}>
          {activity.description}
        </p>
      )}
      <ul style={{ fontSize: "0.9rem", color: "#475569", paddingLeft: "1.25rem" }}>
        <li>Precio: ARS {activity.price.toLocaleString("es-AR")}</li>
        {typeof activity.discount === "number" && activity.discount > 0 && (
          <li>Descuento: {activity.discount}%</li>
        )}
        <li>Ubicación: {activity.location}</li>
      </ul>
    </section>
  );
};

export default ActivityDetail;
