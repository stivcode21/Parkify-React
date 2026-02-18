import { useEffect, useMemo, useState, useLayoutEffect, useRef } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import styles from "./Finance.module.css";
import { buildApiUrl } from "@/utils/apiBase";
import { useNotification } from "@/context/notificationProvider/notificationProvider";
import { useLoader } from "@/context/loaderProvider/LoaderProvider";
import ExitModal from "@/components/atoms/exitModal/ExitModal";

// Convierte cualquier valor de monto a numero seguro (0 si es invalido).
const parseAmount = (value) => {
  if (value === null || value === undefined) return 0;
  const numeric = Number(String(value).replace(/[^\d.-]/g, ""));
  return Number.isFinite(numeric) ? numeric : 0;
};

// Formatea un numero como moneda COP (sin decimales).
const formatCurrency = (value) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value || 0);

// Convierte una fecha a una llave YYYY-MM-DD para agrupar por dia.
const dateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Nombre corto del dia en espanol (0=Dom, 6=Sab).
const dayLabel = (date) =>
  ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"][date.getDay()];

// Intenta parsear una fecha; si es invalida devuelve null.
const safeDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date;
};

// Contenedor que mide su ancho/alto y se lo pasa al chart para que sea responsivo.
const ChartFrame = ({ height, children }) => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height });

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    // Lee dimensiones del contenedor y actualiza estado.
    const update = (rect) => {
      const nextWidth = rect?.width || element.clientWidth || 0;
      const nextHeight = rect?.height || element.clientHeight || height || 0;
      setSize({ width: nextWidth, height: nextHeight });
    };

    update(element.getBoundingClientRect());

    // Observa cambios de tamaño para re-renderizar el chart.
    if (typeof ResizeObserver === "undefined") return undefined;

    const observer = new ResizeObserver((entries) => {
      if (!entries.length) return;
      update(entries[0].contentRect);
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [height]);

  const ready = size.width > 0 && size.height > 0;

  return (
    <div ref={ref} className={styles.chartWrap} style={{ height }}>
      {ready ? children(size) : null}
    </div>
  );
};

const Finance = () => {
  const [records, setRecords] = useState([]);
  const notify = useNotification();
  const { toggleLoader } = useLoader();

  useEffect(() => {
    const fetchRecords = async () => {
      toggleLoader(true);
      try {
        const res = await fetch(buildApiUrl("vehicles/records"), {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          notify("Error", "No se pudieron obtener las finanzas.");
          return;
        }

        const data = await res.json();
        // Guardamos solo el arreglo esperado.
        setRecords(Array.isArray(data.vehicles) ? data.vehicles : []);
      } catch (error) {
        console.error("Error al obtener finanzas:", error);
        notify("Error", "Error al obtener las finanzas.");
      } finally {
        toggleLoader(false);
      }
    };

    fetchRecords();
  }, []);

  const analytics = useMemo(() => {
    // Normaliza registros: monto numerico + fecha de salida valida.
    const completed = records
      .map((record) => {
        const amount = parseAmount(record.monto_total);
        const exitDate = safeDate(record.fecha_salida);

        return {
          ...record,
          amount,
          exitDate,
        };
      })
      // Solo consideramos tickets cerrados (con fecha de salida).
      .filter((record) => record.exitDate);

    // Metricas globales.
    const totalRevenue = completed.reduce(
      (sum, record) => sum + record.amount,
      0,
    );

    const totalTickets = completed.length;
    const avgTicket = totalTickets ? totalRevenue / totalTickets : 0;

    // Acumuladores por dia (YYYY-MM-DD).
    const revenueByDay = new Map();
    const ticketsByDay = new Map();

    completed.forEach((record) => {
      const exitKey = record.exitDate ? dateKey(record.exitDate) : null;
      if (!exitKey) return;
      revenueByDay.set(
        exitKey,
        (revenueByDay.get(exitKey) || 0) + record.amount,
      );
      ticketsByDay.set(exitKey, (ticketsByDay.get(exitKey) || 0) + 1);
    });

    // Crea un arreglo de los ultimos 7 dias (incluye hoy).
    const dailyStats = Array.from({ length: 7 }, (_, index) => {
      const day = new Date();
      day.setDate(day.getDate() - (6 - index));
      const key = dateKey(day);
      return {
        name: dayLabel(day),
        total: revenueByDay.get(key) || 0,
        tickets: ticketsByDay.get(key) || 0,
      };
    });
    const todayRevenue = dailyStats[6]?.total || 0;

    // Total del mes calendario actual.
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const monthRevenue = completed.reduce((sum, record) => {
      const exit = record.exitDate;
      if (
        exit &&
        exit.getMonth() === currentMonth &&
        exit.getFullYear() === currentYear
      ) {
        return sum + record.amount;
      }
      return sum;
    }, 0);

    // Suma de la semana (los 7 dias del arreglo).
    const weekRevenue = dailyStats.reduce((sum, day) => sum + day.total, 0);

    return {
      totalTickets,
      avgTicket,
      todayRevenue,
      monthRevenue,
      weekRevenue,
      dailyStats,
    };
  }, [records]);

  // Fecha de actualizacion mostrada en el header.
  const updatedAt = new Date().toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <ExitModal route="/dashboard" />
        </div>
        <div className={styles.titleBlock}>
          <span className={styles.eyebrow}>Resumen financiero</span>
          <h2 className={styles.title}>Finanzas del parqueadero</h2>
          <p className={styles.subtitle}>
            Visualiza ingresos, tickets y horas pico en un solo vistazo.
          </p>
        </div>
        <div className={styles.headerMeta}>
          <span className={styles.metaChipAlt}>Actualizado {updatedAt}</span>
        </div>
      </header>

      <section className={styles.kpiGrid}>
        <article className={styles.kpiCard} style={{ "--delay": "0s" }}>
          <span className={styles.kpiLabel}>Tickets cerrados</span>
          <strong className={styles.kpiValue}>{analytics.totalTickets}</strong>
          <span className={styles.kpiHint}>Tickets con cobro registrado</span>
        </article>

        <article className={styles.kpiCard} style={{ "--delay": "0.05s" }}>
          <span className={styles.kpiLabel}>Ticket promedio</span>
          <strong className={styles.kpiValue}>
            {formatCurrency(analytics.avgTicket)}
          </strong>
          <span className={styles.kpiHint}>Valor medio por salida</span>
        </article>

        <article className={styles.kpiCard} style={{ "--delay": "0.1s" }}>
          <span className={styles.kpiLabel}>Ingresos de hoy</span>
          <strong className={styles.kpiValue}>
            {formatCurrency(analytics.todayRevenue)}
          </strong>
          <span className={styles.kpiHint}>Cobros registrados hoy</span>
        </article>

        <article className={styles.kpiCard} style={{ "--delay": "0.15s" }}>
          <span className={styles.kpiLabel}>Ingresos del mes</span>
          <strong className={styles.kpiValue}>
            {formatCurrency(analytics.monthRevenue)}
          </strong>
          <span className={styles.kpiHint}>Mes calendario en curso</span>
        </article>
      </section>

      <section className={styles.chartGrid}>
        <article className={`${styles.card} ${styles.cardWide}`}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>Ingresos ultimos 7 dias</h3>
              <p className={styles.cardSubtitle}>
                Tendencia diaria de facturacion.
              </p>
            </div>
            <span className={styles.cardBadge}>
              {formatCurrency(analytics.weekRevenue)}
            </span>
          </div>
          <ChartFrame height={200}>
            {(size) => (
              <AreaChart
                width={size.width}
                height={size.height}
                data={analytics.dailyStats}
                margin={{ left: -10 }}
              >
                <defs>
                  <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#60a5fa" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(148, 163, 184, 0.2)" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) =>
                    value >= 1000 ? `${Math.round(value / 1000)}k` : value
                  }
                />
                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{
                    background: "#0f172a",
                    border: "1px solid rgba(148, 163, 184, 0.3)",
                    borderRadius: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#60a5fa"
                  strokeWidth={2}
                  fill="url(#revenueFill)"
                />
              </AreaChart>
            )}
          </ChartFrame>
        </article>

        <article className={`${styles.card} ${styles.cardMedium}`}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>Tickets por dia</h3>
              <p className={styles.cardSubtitle}>Demanda diaria de parqueo.</p>
            </div>
          </div>
          <ChartFrame height={200}>
            {(size) => (
              <BarChart
                width={size.width}
                height={size.height}
                data={analytics.dailyStats}
                margin={{ left: -10 }}
              >
                {/* pintar grilla */}
                <CartesianGrid stroke="rgba(148, 163, 184, 0.2)" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  formatter={(value) => `${value} tickets`}
                  contentStyle={{
                    background: "#0f172a",
                    border: "1px solid rgba(148, 163, 184, 0.3)",
                    borderRadius: "12px",
                  }}
                />
                <Bar dataKey="tickets" fill="#22d3ee" radius={[12, 12, 0, 0]} />
              </BarChart>
            )}
          </ChartFrame>
        </article>
      </section>
    </div>
  );
};

export default Finance;
