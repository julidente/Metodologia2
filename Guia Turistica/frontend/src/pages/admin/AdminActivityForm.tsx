import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import type { ActivityCreate, Activity, City, Category } from "../../types/activity";
import { createActivity, getActivityById, updateActivity } from "../../services/activity.service";
import { apiClient } from "../../services/apiClient";

interface Props {
  mode: "create" | "edit";
}

const AdminActivityForm = ({ mode }: Props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(mode === "edit");
  const [error, setError] = useState<string | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ActivityCreate>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      discount: 0,
      location: "",
      city_id: 0,
      category_id: 0
    }
  });

  // Cargar listas de ciudades y categorías para los selects
  useEffect(() => {
    (async () => {
      try {
        const [citiesData, categoriesData] = await Promise.all([
          apiClient("cities"),
          apiClient("categories")
        ]);
        setCities(citiesData);
        setCategories(categoriesData);
      } catch (err: any) {
        console.error(err);
        setError("No se pudieron cargar ciudades y categorías.");
      }
    })();
  }, []);

  // Cargar datos de la actividad en modo edición
  useEffect(() => {
    if (mode === "edit" && id) {
      (async () => {
        try {
          const data: Activity = await getActivityById(id);
          reset({
            name: data.name,
            description: data.description ?? "",
            price: data.price,
            discount: data.discount ?? 0,
            location: data.location,
            city_id: data.city_id,
            category_id: data.category_id
          });
        } catch (err: any) {
          console.error(err);
          setError("No se pudo cargar la actividad.");
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setLoading(false);
    }
  }, [mode, id, reset]);

  const onSubmit = async (data: ActivityCreate) => {
    try {
      const payload: ActivityCreate = {
        ...data,
        price: Number(data.price),
        discount: data.discount ? Number(data.discount) : 0,
        city_id: Number(data.city_id),
        category_id: Number(data.category_id)
      };

      if (mode === "create") {
        await createActivity(payload);
      } else if (mode === "edit" && id) {
        await updateActivity(id, payload);
      }
      navigate("/admin/activities");
    } catch (err: any) {
      console.error(err);
      setError("Error al guardar la actividad.");
    }
  };

  if (loading) {
    return <p style={{ padding: "2rem 1rem" }}>Cargando actividad...</p>;
  }

  return (
    <section
      style={{
        maxWidth: "960px",
        margin: "0 auto",
        padding: "2rem 1rem"
      }}
    >
      <h1 style={{ fontSize: "1.6rem", fontWeight: 600, marginBottom: "1rem" }}>
        {mode === "create" ? "Crear nuevo destino" : "Editar destino"}
      </h1>

      {error && <p style={{ color: "crimson", marginBottom: "0.75rem" }}>{error}</p>}

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          background: "#f8fafc",
          padding: "1.5rem",
          borderRadius: "0.75rem",
          border: "1px solid #e2e8f0"
        }}
      >
        <div>
          <label style={{ display: "block", fontSize: "0.9rem", marginBottom: "0.25rem" }}>
            Título
          </label>
          <input
            type="text"
            {...register("name", { required: "El título es obligatorio" })}
            style={{
              width: "100%",
              borderRadius: "0.375rem",
              border: "1px solid #cbd5e1",
              fontSize: "0.9rem",
              padding: "0.35rem 0.5rem"
            }}
          />
          {errors.name && (
            <p style={{ color: "crimson", fontSize: "0.8rem" }}>
              {String(errors.name.message)}
            </p>
          )}
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.9rem", marginBottom: "0.25rem" }}>
            Descripción
          </label>
          <textarea
            rows={4}
            {...register("description")}
            style={{
              width: "100%",
              borderRadius: "0.375rem",
              border: "1px solid #cbd5e1",
              fontSize: "0.9rem",
              padding: "0.35rem 0.5rem",
              resize: "vertical"
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.9rem", marginBottom: "0.25rem" }}>
            Ubicación / dirección
          </label>
          <input
            type="text"
            {...register("location", { required: "La ubicación es obligatoria" })}
            style={{
              width: "100%",
              borderRadius: "0.375rem",
              border: "1px solid #cbd5e1",
              fontSize: "0.9rem",
              padding: "0.35rem 0.5rem"
            }}
          />
          {errors.location && (
            <p style={{ color: "crimson", fontSize: "0.8rem" }}>
              {String(errors.location.message)}
            </p>
          )}
        </div>

        {/* AQUÍ CAMBIA: de input number a selects */}
        <div
          style={{
            display: "grid",
            gap: "0.75rem",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))"
          }}
        >
          <div>
            <label style={{ display: "block", fontSize: "0.9rem", marginBottom: "0.25rem" }}>
              Ciudad
            </label>
            <select
              {...register("city_id", {
                required: "Ciudad obligatoria",
                valueAsNumber: true,
                validate: (value) => value > 0 || "Ciudad obligatoria"
              })}
              style={{
                width: "100%",
                borderRadius: "0.375rem",
                border: "1px solid #cbd5e1",
                fontSize: "0.9rem",
                padding: "0.35rem 0.5rem"
              }}
            >
              <option value={0}>Seleccioná una ciudad</option>
              {cities.map((city) => (
                <option key={city.city_id} value={city.city_id}>
                  {city.name}
                </option>
              ))}
            </select>
            {errors.city_id && (
              <p style={{ color: "crimson", fontSize: "0.8rem" }}>
                {String(errors.city_id.message)}
              </p>
            )}
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.9rem", marginBottom: "0.25rem" }}>
              Categoría
            </label>
            <select
              {...register("category_id", {
                required: "Categoría obligatoria",
                valueAsNumber: true,
                validate: (value) => value > 0 || "Categoría obligatoria"
              })}
              style={{
                width: "100%",
                borderRadius: "0.375rem",
                border: "1px solid #cbd5e1",
                fontSize: "0.9rem",
                padding: "0.35rem 0.5rem"
              }}
            >
              <option value={0}>Seleccioná una categoría</option>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category_id && (
              <p style={{ color: "crimson", fontSize: "0.8rem" }}>
                {String(errors.category_id.message)}
              </p>
            )}
          </div>
        </div>
        {/* FIN CAMBIO */}

        <div
          style={{
            display: "grid",
            gap: "0.75rem",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))"
          }}
        >
          <div>
            <label style={{ display: "block", fontSize: "0.9rem", marginBottom: "0.25rem" }}>
              Precio base (ARS)
            </label>
            <input
              type="number"
              step="1"
              {...register("price", { required: "El precio es obligatorio", valueAsNumber: true })}
              style={{
                width: "100%",
                borderRadius: "0.375rem",
                border: "1px solid #cbd5e1",
                fontSize: "0.9rem",
                padding: "0.35rem 0.5rem"
              }}
            />
            {errors.price && (
              <p style={{ color: "crimson", fontSize: "0.8rem" }}>
                {String(errors.price.message)}
              </p>
            )}
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.9rem", marginBottom: "0.25rem" }}>
              Descuento (%)
            </label>
            <input
              type="number"
              step="1"
              {...register("discount", { valueAsNumber: true })}
              style={{
                width: "100%",
                borderRadius: "0.375rem",
                border: "1px solid #cbd5e1",
                fontSize: "0.9rem",
                padding: "0.35rem 0.5rem"
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            marginTop: "0.5rem",
            borderRadius: "0.375rem",
            border: "none",
            background: "#0f766e",
            color: "white",
            padding: "0.5rem 0.75rem",
            fontSize: "0.9rem",
            cursor: "pointer",
            alignSelf: "flex-start",
            opacity: isSubmitting ? 0.7 : 1
          }}
        >
          {isSubmitting ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </section>
  );
};

export default AdminActivityForm;