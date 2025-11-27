import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getActivities } from "../services/activity.service";
import { Activity } from "../types/activity";

// Agregamos discountAsc y discountDesc
type SortValue =
  | ""
  | "priceAsc"
  | "priceDesc"
  | "nameAsc"
  | "nameDesc"
  | "discountAsc"
  | "discountDesc";

const Home = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState<SortValue>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const loadActivities = async (selectedSort: SortValue) => {
    try {
      setLoading(true);
      setError(null);

      // Mapeamos el valor del select al valor que entiende el backend en ?sort=
      let sortParam: string | undefined;

      if (selectedSort === "nameAsc" || selectedSort === "nameDesc") {
        // el backend solo tiene "name" (A-Z)
        sortParam = "name";
      } else if (selectedSort === "") {
        sortParam = undefined;
      } else {
        // priceAsc, priceDesc, discountAsc, discountDesc
        sortParam = selectedSort;
      }

      const data = await getActivities(sortParam);
      let parsed: Activity[] = Array.isArray(data) ? data.map((a) => a) : [];

      // Para Z-A en nombre, invertimos el array (el backend ya lo mandó A-Z)
      if (selectedSort === "nameDesc") {
        parsed = [...parsed].reverse();
      }

      setActivities(parsed);
    } catch (err: any) {
      console.error(err);
      setError("No se pudieron cargar las actividades.");
    } finally {
      setLoading(false);
    }
  };

  // Carga inicial sin orden
  useEffect(() => {
    loadActivities("");
  }, []);

  const handleSortChange = (value: SortValue) => {
    setSort(value);
    loadActivities(value);
  };

  // 🔎 Filtrado en frontend por nombre / ciudad / provincia / categoría
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const visibleActivities = !normalizedSearch
    ? activities
    : activities.filter((a) => {
        const name = a.name?.toLowerCase() ?? "";
        const city = a.city?.name?.toLowerCase() ?? "";
        const province = a.city?.province?.name?.toLowerCase() ?? "";
        const category = a.category?.name?.toLowerCase() ?? "";
        return (
          name.includes(normalizedSearch) ||
          city.includes(normalizedSearch) ||
          province.includes(normalizedSearch) ||
          category.includes(normalizedSearch)
        );
      });

  return (
    <div>
      <section
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(15,23,42,0.7), rgba(15,23,42,0.85)), url('https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1600')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          padding: "3.5rem 1rem 3rem",
          textAlign: "center"
        }}
      >
        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto"
          }}
        >
          <p
            style={{
              fontSize: "0.8rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
              opacity: 0.9
            }}
          >
            EXPERIENCIAS EN PATAGONIA
          </p>
          <h1
            style={{
              fontSize: "2.1rem",
              fontWeight: 700,
              marginBottom: "0.75rem"
            }}
          >
            Descubrí los mejores tours en el sur argentino
          </h1>
          <p
            style={{
              fontSize: "0.95rem",
              maxWidth: "640px",
              margin: "0 auto",
              opacity: 0.92
            }}
          >
            Excursiones seleccionadas, grupos reducidos y salidas diarias.
            Encontrá tu próxima aventura entre montañas, glaciares y lagos
            patagónicos.
          </p>
        </div>
      </section>

      <section
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          padding: "2rem 1rem 3rem"
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            marginBottom: "1.5rem"
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "1.35rem",
                fontWeight: 600,
                marginBottom: "0.25rem"
              }}
            >
              Todas las actividades
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#64748b" }}>
              Elegí entre las excursiones más populares de la región.
            </p>
          </div>

          {/* Controles: búsqueda + orden */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "0.75rem",
              fontSize: "0.9rem"
            }}
          >
            {/* 🔎 Input de búsqueda */}
            <input
              type="text"
              placeholder="Buscar por nombre, ciudad o categoría..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: "0.35rem 0.6rem",
                borderRadius: "9999px",
                border: "1px solid #cbd5f5",
                fontSize: "0.85rem",
                minWidth: "220px"
              }}
            />

            {/* Select de orden que usa el Strategy del backend */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}
            >
              <span style={{ color: "#475569" }}>Ordenar por:</span>
              <select
                value={sort}
                onChange={(e) =>
                  handleSortChange(e.target.value as SortValue)
                }
                style={{
                  padding: "0.35rem 0.6rem",
                  borderRadius: "9999px",
                  border: "1px solid #cbd5f5",
                  fontSize: "0.85rem",
                  backgroundColor: "white",
                  cursor: "pointer"
                }}
              >
                <option value="">Sin orden</option>
                <option value="priceAsc">Precio (menor a mayor)</option>
                <option value="priceDesc">Precio (mayor a menor)</option>
                <option value="discountDesc">Mayor descuento</option>
                <option value="discountAsc">Menor descuento</option>
                <option value="nameAsc">Nombre (A-Z)</option>
                <option value="nameDesc">Nombre (Z-A)</option>
              </select>
            </div>
          </div>
        </div>

        {loading && <p>Cargando actividades...</p>}
        {error && <p style={{ color: "crimson" }}>{error}</p>}

        {!loading && !error && (
          <div
            style={{
              display: "grid",
              gap: "1.75rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))"
            }}
          >
            {visibleActivities.map((a) => {
              const cover =
                a.images && a.images.length > 0 ? a.images[0].url : null;
              const cityName = a.city?.name ?? a.location;
              const provinceName = a.city?.province?.name;
              return (
                <Link
                  key={a.activity_id}
                  to={`/destinos/${a.activity_id}`}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "0.9rem",
                    boxShadow: "0 18px 25px -12px rgba(15,23,42,0.18)",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    textDecoration: "none",
                    color: "inherit"
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      paddingTop: "62%",
                      backgroundImage: cover
                        ? `url(${cover})`
                        : "linear-gradient(to bottom, #1d4ed8, #0ea5e9)",
                      backgroundSize: "cover",
                      backgroundPosition: "center"
                    }}
                  >
                    {a.category?.name && (
                      <span
                        style={{
                          position: "absolute",
                          left: "0.75rem",
                          top: "0.75rem",
                          backgroundColor: "rgba(15,23,42,0.85)",
                          color: "white",
                          fontSize: "0.7rem",
                          padding: "0.25rem 0.55rem",
                          borderRadius: "9999px",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em"
                        }}
                      >
                        {a.category.name}
                      </span>
                    )}
                    {a.price && (
                      <span
                        style={{
                          position: "absolute",
                          right: "0.75rem",
                          bottom: "0.75rem",
                          backgroundColor: "rgba(15,23,42,0.9)",
                          color: "white",
                          fontSize: "0.75rem",
                          padding: "0.25rem 0.55rem",
                          borderRadius: "9999px"
                        }}
                      >
                        Desde ARS {a.price.toLocaleString("es-AR")}
                      </span>
                    )}
                  </div>

                  <div
                    style={{
                      padding: "0.85rem 0.9rem 0.95rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.4rem"
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1rem",
                        fontWeight: 600
                      }}
                    >
                      {a.name}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "#64748b"
                      }}
                    >
                      {cityName}
                      {provinceName ? ` · ${provinceName}` : ""}
                    </p>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "#0369a1",
                        marginTop: "0.35rem"
                      }}
                    >
                      Ver detalles ›
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;