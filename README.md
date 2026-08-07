# EVM Dashboard

Aplicación web para la gestión y seguimiento de proyectos y actividades
utilizando la metodología **Earned Value Management (EVM)**.

El proyecto está compuesto por:

- Backend desarrollado en **Python + FastAPI**.
- Backend desarrollado en **Node.js**.
- Frontend para la interacción con el sistema.
- Base de datos **PostgreSQL**.
- Pruebas automatizadas para validar la lógica de negocio y los endpoints.

---

## Descripción

EVM Dashboard permite gestionar proyectos y sus actividades, registrar
información de seguimiento y obtener indicadores de desempeño utilizando
**Earned Value Management (EVM)**.

El sistema contempla:

- Gestión de proyectos.
- Gestión de actividades.
- Asociación entre proyectos y actividades.
- Registro de auditoría.
- Cálculos de Earned Value Management (EVM).
- Indicadores de desempeño de costos.
- Indicadores de desempeño del cronograma.
- API REST.
- Pruebas automatizadas.
- Persistencia de información en PostgreSQL.

Los principales indicadores EVM implementados son:

- **BAC** — Budget at Completion.
- **PV** — Planned Value.
- **EV** — Earned Value.
- **AC** — Actual Cost.
- **CV** — Cost Variance.
- **SV** — Schedule Variance.
- **CPI** — Cost Performance Index.
- **SPI** — Schedule Performance Index.
- **EAC** — Estimate at Completion.
- **VAC** — Variance at Completion.

---

# Arquitectura

El proyecto utiliza una arquitectura separada por componentes:

```text
evm-dashboard/
│
├── backend-python/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── db/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── tests/
│   │
│   ├── alembic/
│   ├── main.py
│   ├── requirements.txt
│   └── ...
│
├── backend-node/
│   └── ...
│
├── frontend/
│   └── ...
│
├── README.md
├── AI_PROCESS.md
└── ...

