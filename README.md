<<<<<<< Updated upstream

📊 EVM Dashboard
📝 Descripción
EVM Dashboard es una aplicación para la gestión y seguimiento de proyectos utilizando la metodología Earned Value Management (EVM).
Permite administrar proyectos, actividades y registros de auditoría, además de calcular indicadores clave de desempeño en costos y cronograma.

La solución está compuesta por tres partes principales:

Backend Python (FastAPI)
Backend Node.js
Frontend para visualización y gestión de la información
🚀 Funcionalidades
Gestión de proyectos y actividades
Consulta, actualización y eliminación de actividades
Registro y consulta de auditoría
Cálculo de indicadores EVM:
A nivel de actividad
Consolidado a nivel de proyecto
Indicadores de desempeño de costos y cronograma
API REST con documentación automática (OpenAPI/Swagger)
📈 Indicadores EVM
El sistema calcula los principales indicadores de Earned Value Management:

Indicador	Descripción
BAC	Budget at Completion
PV	Planned Value
EV	Earned Value
AC	Actual Cost
CV	Cost Variance
SV	Schedule Variance
CPI	Cost Performance Index
SPI	Schedule Performance Index
EAC	Estimate at Completion
VAC	Variance at Completion
Estos indicadores permiten determinar si un proyecto está:

Dentro o fuera del presupuesto
Adelantado o retrasado respecto al cronograma
🏗️ Arquitectura

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
💡 Nota: Se recomienda usar un entorno virtual para el backend Python.

📂 Clonar el repositorio
Para comenzar a trabajar localmente, clona el repositorio e ingresa al directorio principal:

git clone https://github.com/espartacarlos22/evm-dashboard.git
cd evm-dashboard


⚙️ Configuración rápida
Base de datos
1. Crear la base de datos:
Ejecuta la siguiente sentencia en PostgreSQL:

CREATE DATABASE evm_dashboard;
2. Configurar variables de entorno:
Crea un archivo .env dentro del directorio backend-python/:

DATABASE_URL=postgresql://USUARIO:CONTRASEÑA@localhost:5432/evm_dashboard
DEBUG=True
⚠️ Advertencia: No subir archivos .env con credenciales reales al repositorio. Usa .env.example como referencia.


▶️ Ejecución local recomendada
1. Iniciar PostgreSQL en tu sistema.

2. Inicializar la base de datos ejecutando las migraciones con Alembic:

cd backend-python
alembic upgrade head
3. Activar el entorno virtual para Python:

.\.venv\Scripts\Activate.ps1
4. Iniciar el backend de Python:

uvicorn main:app --reload
Disponible en: http://127.0.0.1:8000

5. Iniciar el backend de Node.js:

cd backend-node
npm install
npm run dev
6. Iniciar el frontend:

cd frontend
npm install
npm run dev


📑 Documentación de la API
Una vez iniciado el backend en Python, puedes consultar la documentación interactiva en:

Swagger UI: http://127.0.0.1:8000/docs
ReDoc: http://127.0.0.1:8000/redoc
OpenAPI Spec: http://127.0.0.1:8000/openapi.json


🧪 Pruebas
Para ejecutar las pruebas en backend-python:

python -m pytest -v
Para verificar la cobertura de código:

python -m pytest --cov=app.services --cov-report=term-missing
Estado actual:

35 passed
100% cobertura en app.services


🌱 Flujo de desarrollo con Git
1. Crear una nueva rama para cada funcionalidad:

git checkout -b feature/nombre-de-la-funcionalidad
2. Subir cambios:

git add .
git commit -m "Descripción de los cambios"
git push -u origin feature/nombre-de-la-funcionalidad
3. Crear Pull Request:
Luego crea un Pull Request hacia la rama develop.



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

======= # 📊 EVM Dashboard
📝 Descripción
EVM Dashboard es una aplicación para la gestión y seguimiento de proyectos utilizando la metodología Earned Value Management (EVM).
Permite administrar proyectos, actividades y registros de auditoría, además de calcular indicadores clave de desempeño en costos y cronograma.

La solución está compuesta por tres partes principales:

Backend Python (FastAPI)
Backend Node.js
Frontend para visualización y gestión de la información
🚀 Funcionalidades
Gestión de proyectos y actividades
Consulta, actualización y eliminación de actividades
Registro y consulta de auditoría
Cálculo de indicadores EVM:
A nivel de actividad
Consolidado a nivel de proyecto
Indicadores de desempeño de costos y cronograma
API REST con documentación automática (OpenAPI/Swagger)
📈 Indicadores EVM
El sistema calcula los principales indicadores de Earned Value Management:

Indicador	Descripción
BAC	Budget at Completion
PV	Planned Value
EV	Earned Value
AC	Actual Cost
CV	Cost Variance
SV	Schedule Variance
CPI	Cost Performance Index
SPI	Schedule Performance Index
EAC	Estimate at Completion
VAC	Variance at Completion
Estos indicadores permiten determinar si un proyecto está:

Dentro o fuera del presupuesto
Adelantado o retrasado respecto al cronograma
🏗️ Arquitectura

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
Express.js
TypeScript
PostgreSQL
Prisma ORM
JWT
Zod
dotenv
CORS
REST API
Frontend
React
TypeScript
Vite
npm
Material UI (MUI)
React Router
Axios
Base de datos
PostgreSQL (Supabase)
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
💡 Nota: Se recomienda usar un entorno virtual para el backend Python.

📂 Clonar el repositorio
Para comenzar a trabajar localmente, clona el repositorio e ingresa al directorio principal:

git clone https://github.com/espartacarlos22/evm-dashboard.git
cd evm-dashboard


⚙️ Configuración rápida
Base de datos
1. Crear la base de datos:
Ejecuta la siguiente sentencia en PostgreSQL:

CREATE DATABASE evm_dashboard;
2. Configurar variables de entorno:
Crea un archivo .env dentro del directorio backend-python/:

DATABASE_URL=postgresql://USUARIO:CONTRASEÑA@localhost:5432/evm_dashboard
DEBUG=True
⚠️ Advertencia: No subir archivos .env con credenciales reales al repositorio. Usa .env.example como referencia.


▶️ Ejecución local recomendada
1. Iniciar PostgreSQL en tu sistema.

2. Inicializar la base de datos ejecutando las migraciones con Alembic:

cd backend-python
alembic upgrade head
3. Activar el entorno virtual para Python:

.\.venv\Scripts\Activate.ps1
4. Iniciar el backend de Python:

uvicorn main:app --reload
Disponible en: http://127.0.0.1:8000

4. Iniciar el backend de Node.js:

cd backend-node
npm install
npm run dev
5. Iniciar el frontend:

cd frontend
npm install
npm run dev


📑 Documentación de la API
Una vez iniciado el backend en Python, puedes consultar la documentación interactiva en:

Swagger UI: http://127.0.0.1:8000/docs
ReDoc: http://127.0.0.1:8000/redoc
OpenAPI Spec: http://127.0.0.1:8000/openapi.json


🧪 Pruebas
Para ejecutar las pruebas en backend-python:

python -m pytest -v
Para verificar la cobertura de código:

python -m pytest --cov=app.services --cov-report=term-missing
Estado actual:

35 passed
100% cobertura en app.services


🌱 Flujo de desarrollo con Git
1. Crear una nueva rama para cada funcionalidad:

git checkout -b feature/nombre-de-la-funcionalidad
2. Subir cambios:

git add .
git commit -m "Descripción de los cambios"
git push -u origin feature/nombre-de-la-funcionalidad
3. Crear Pull Request:
Luego crea un Pull Request hacia la rama develop.



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

>>>>>>> Stashed changes
