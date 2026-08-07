# 📊 EVM Dashboard

## 📝 Descripción

**EVM Dashboard** es una aplicación para la gestión y seguimiento de proyectos utilizando la metodología **Earned Value Management (EVM)**.  
Permite administrar proyectos, actividades y registros de auditoría, además de calcular indicadores clave de desempeño en costos y cronograma.

La solución está compuesta por tres partes principales:
* **Backend Python (FastAPI)**
* **Backend Node.js**
* **Frontend** para visualización y gestión de la información

---

## 🚀 Funcionalidades

* Gestión de proyectos y actividades
* Consulta, actualización y eliminación de actividades
* Registro y consulta de auditoría
* Cálculo de indicadores EVM:
  * A nivel de actividad
  * Consolidado a nivel de proyecto
* Indicadores de desempeño de costos y cronograma
* API REST con documentación automática (OpenAPI/Swagger)

---

## 📈 Indicadores EVM

El sistema calcula los principales indicadores de **Earned Value Management**:

| Indicador | Descripción |
| :--- | :--- |
| **BAC** | Budget at Completion |
| **PV** | Planned Value |
| **EV** | Earned Value |
| **AC** | Actual Cost |
| **CV** | Cost Variance |
| **SV** | Schedule Variance |
| **CPI** | Cost Performance Index |
| **SPI** | Schedule Performance Index |
| **EAC** | Estimate at Completion |
| **VAC** | Variance at Completion |

Estos indicadores permiten determinar si un proyecto está:
* Dentro o fuera del presupuesto
* Adelantado o retrasado respecto al cronograma

---

## 🏗️ Arquitectura

```

EVM Dashboard
│
├── frontend
│   └── Interfaz de usuario
│
├── backend-python
│   ├── API REST
│   ├── Servicios
│   ├── Repositorios
│   ├── Modelos
│   ├── Schemas
│   ├── Cálculos EVM
│   └── Pruebas
│
├── backend-node
│   └── Servicios/API Node.js
│
└── PostgreSQL
    └── Base de datos

```


🛠️ Tecnologías
Backend Python
Python 3.13

FastAPI

Uvicorn

SQLAlchemy

Pydantic

PostgreSQL

Alembic

Pytest / Pytest-Cov

Backend Node.js
Node.js

npm

[Tecnologías adicionales del backend Node.js]

Frontend
[Tecnología utilizada por el frontend]

[Gestor de paquetes utilizado]

Base de datos
PostgreSQL

Control de versiones
Git

GitHub

📋 Requisitos previos
Antes de ejecutar el proyecto, asegúrate de contar con:

Git

Python 3.13 o compatible

PostgreSQL

Node.js

npm

Nota: Se recomienda usar un entorno virtual para el backend Python.

📂 Clonar el repositorio
Bash
git clone [https://github.com/espartacarlos22/evm-dashboard.git](https://github.com/espartacarlos22/evm-dashboard.git)
cd evm-dashboard
⚙️ Configuración rápida
Base de datos
Crear la base de datos:

SQL
CREATE DATABASE evm_dashboard;
Configurar variables de entorno en backend-python/.env:

Code snippet
DATABASE_URL=postgresql://USUARIO:CONTRASEÑA@localhost:5432/evm_dashboard
DEBUG=True
⚠️ Advertencia: No subir archivos .env con credenciales al repositorio. Usa .env.example como referencia.

▶️ Ejecución local recomendada
Iniciar PostgreSQL

Inicializar la base de datos:

Bash
cd backend-python
alembic upgrade head
Iniciar backend Python:

Bash
uvicorn main:app --reload
Disponible en: http://127.0.0.1:8000

Iniciar backend Node.js:

Bash
cd backend-node
npm install
npm run dev
Iniciar frontend:

Bash
cd frontend
npm install
npm run dev
📑 Documentación de la API
Swagger UI: http://127.0.0.1:8000/docs

ReDoc: http://127.0.0.1:8000/redoc

OpenAPI: http://127.0.0.1:8000/openapi.json

🧪 Pruebas
Ejecutar pruebas en backend-python:

Bash
python -m pytest -v
Cobertura de código:

Bash
python -m pytest --cov=app.services --cov-report=term-missing
Estado actual:

35 passed

100% cobertura en app.services

🌱 Flujo de desarrollo con Git
Crear una nueva rama para cada funcionalidad:

Bash
git checkout -b feature/nombre-de-la-funcionalidad
Subir cambios:

Bash
git add .
git commit -m "Descripción de los cambios"
git push -u origin feature/nombre-de-la-funcionalidad
Luego crear un Pull Request hacia develop.

📘 Documentación adicional
El proyecto incluye AI_PROCESS.md, donde se detalla:

Herramientas de IA utilizadas

Proceso de aprendizaje de EVM

Validación de fórmulas y cálculos

Decisiones técnicas y de arquitectura

Reflexión sobre el proceso de desarrollo

📌 Estado del proyecto
Backend Python: Configuración inicial, modelos, migraciones, APIs, cálculos EVM, pruebas unitarias e integración, cobertura completa.

Backend Node.js: Implementación, integración, pruebas, documentación.

Frontend: Interfaz, integración con APIs, visualización de proyectos, actividades e indicadores EVM, pruebas.

📄 Licencia
Proyecto desarrollado como parte de un proceso de evaluación técnica.

👤 Autor
Carlos Andrés Oviedo Guayara

Repositorio: evm-dashboard
