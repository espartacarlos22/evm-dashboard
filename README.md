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
Backend Python

Responsable de la API desarrollada con FastAPI, la lógica de negocio,
los cálculos EVM, la persistencia mediante SQLAlchemy y las pruebas
automatizadas.

Backend Node.js

Componente backend desarrollado con Node.js destinado a complementar
la arquitectura de la aplicación.

Frontend

Aplicación web encargada de proporcionar la interfaz de usuario y
consumir los servicios backend.

PostgreSQL

Base de datos utilizada para la persistencia de proyectos, actividades,
auditoría y demás información de la aplicación.

Tecnologías utilizadas
Backend Python
Python 3.13
FastAPI
SQLAlchemy
Pydantic
PostgreSQL
Alembic
Pytest
Pytest-Cov
Uvicorn
Backend Node.js
Node.js
npm

Las dependencias del backend Node.js se encuentran definidas en su
respectivo archivo package.json.

Frontend

El frontend contiene su propia configuración y dependencias.

La documentación específica del framework y las dependencias del
frontend se actualizará conforme avance su implementación.

Control de versiones
Git
GitHub
Pull Requests
Ramas de funcionalidad
Requisitos

Antes de ejecutar el proyecto se requiere tener instalado:

Git
Python 3.13 o compatible
PostgreSQL
Node.js
npm

Se recomienda utilizar un entorno virtual para el backend Python.

Clonar el repositorio

Repositorio oficial:

https://github.com/espartacarlos22/evm-dashboard

Para clonar el proyecto:

git clone https://github.com/espartacarlos22/evm-dashboard.git
cd evm-dashboard
Ramas principales

La rama principal de desarrollo es:

develop

Para comenzar a trabajar con la versión actual:

git checkout develop
git pull origin develop

Las nuevas funcionalidades se desarrollan mediante ramas independientes.

Ejemplo:

git checkout -b feature/nueva-funcionalidad

Una vez terminada la funcionalidad:

git add .
git commit -m "Descripción del cambio"
git push -u origin feature/nueva-funcionalidad

Posteriormente se crea un Pull Request hacia:

develop

Las ramas de funcionalidad se conservan como parte del historial del
desarrollo.

Configuración de la base de datos

El backend Python utiliza PostgreSQL.

La configuración de conexión se realiza mediante variables de entorno.

Crear un archivo:

backend-python/.env

Ejemplo:

DATABASE_URL=postgresql://usuario:password@localhost:5432/evm_dashboard
DEBUG=True

No se deben subir credenciales reales al repositorio.

Para facilitar la configuración de nuevos entornos se recomienda mantener
un archivo:

backend-python/.env.example

con las variables requeridas, pero sin credenciales reales.

Backend Python
Crear entorno virtual

Desde la carpeta backend-python:

cd backend-python
python -m venv .venv
Windows PowerShell
.venv\Scripts\Activate.ps1
Windows CMD
.venv\Scripts\activate
Instalar dependencias

Con el entorno virtual activado:

pip install -r requirements.txt
Inicializar la base de datos

Las migraciones de la base de datos se administran mediante
Alembic.

Para aplicar las migraciones:

alembic upgrade head
Ejecutar el backend Python

Desde:

backend-python/

ejecutar:

uvicorn main:app --reload

La API estará disponible en:

http://127.0.0.1:8000

Documentación interactiva de FastAPI:

http://127.0.0.1:8000/docs

Documentación alternativa:

http://127.0.0.1:8000/redoc
API REST
Health Check
GET /health

Permite verificar el estado de la aplicación.

Proyectos
POST   /projects/
GET    /projects/
GET    /projects/{project_id}
PUT    /projects/{project_id}
DELETE /projects/{project_id}
Actividades
POST   /activities/
GET    /activities/
GET    /activities/{activity_id}
GET    /activities/project/{project_id}
PATCH  /activities/{activity_id}
DELETE /activities/{activity_id}
Auditoría
GET /audit/
GET /audit/{audit_id}
GET /audit/entity/{entity}
GET /audit/entity-id/{entity_id}
GET /audit/action/{action}
Endpoints EVM

El sistema proporciona endpoints específicos para consultar los cálculos
de Earned Value Management.

EVM de un proyecto
GET /projects/{project_id}/evm

Calcula los indicadores EVM agregando las actividades pertenecientes
al proyecto.

EVM de una actividad
GET /projects/{project_id}/activities/{activity_id}/evm

Calcula los indicadores EVM correspondientes a una actividad específica.

Cálculos EVM

El sistema calcula los principales indicadores de Earned Value Management.

Budget at Completion
BAC = Budget at Completion

Representa el presupuesto total planificado para completar el trabajo.

Planned Value
PV = (planned_progress / 100) × BAC

Representa el valor presupuestado del trabajo que debería haberse
completado según el progreso planificado.

Earned Value
EV = (actual_progress / 100) × BAC

Representa el valor presupuestado del trabajo que realmente se ha
completado.

Actual Cost
AC = Actual Cost

Representa el costo real incurrido para realizar el trabajo.

Cost Variance
CV = EV - AC

Permite determinar el desempeño del proyecto o actividad respecto al
presupuesto.

Schedule Variance
SV = EV - PV

Permite determinar el desempeño respecto al cronograma planificado.

Cost Performance Index
CPI = EV / AC

Interpretación:

CPI > 1 → UNDER_BUDGET
CPI < 1 → OVER_BUDGET
CPI = 1 → ON_BUDGET
Schedule Performance Index
SPI = EV / PV

Interpretación:

SPI > 1 → AHEAD_OF_SCHEDULE
SPI < 1 → BEHIND_SCHEDULE
SPI = 1 → ON_SCHEDULE
Estimate at Completion
EAC = BAC / CPI

Representa una estimación del costo total esperado al finalizar.

Variance at Completion
VAC = BAC - EAC

Representa la variación estimada respecto al presupuesto original.

Manejo de casos especiales

El sistema contempla situaciones en las que no es posible realizar
determinados cálculos.

Por ejemplo, cuando:

AC = 0

el CPI no puede calcularse y se devuelve:

CPI = null

Cuando:

PV = 0

el SPI no puede calcularse y se devuelve:

SPI = null

Cuando el CPI no está definido, tampoco es posible calcular el EAC
y el VAC.

En estos casos los estados correspondientes se reportan como:

UNDEFINED
Pruebas

Las pruebas automatizadas se encuentran en:

backend-python/app/tests/

La estructura actual contempla pruebas unitarias y de integración:

app/tests/
│
├── integration/
│   └── test_evm_api.py
│
├── unit/
│   ├── test_activity_service.py
│   ├── test_audit_service.py
│   ├── test_evm_service.py
│   └── test_project_service.py
│
└── test_database.py
Ejecutar todas las pruebas

Desde backend-python:

python -m pytest -v
Ejecutar pruebas del servicio EVM
python -m pytest app/tests/unit/test_evm_service.py -v
Ejecutar pruebas de integración EVM
python -m pytest app/tests/integration/test_evm_api.py -v
Ejecutar pruebas con cobertura
python -m pytest --cov=app.services --cov-report=term-missing

La implementación actual de los servicios cuenta con una cobertura del
100% según la ejecución de las pruebas automatizadas.

Flujo de desarrollo

El desarrollo del proyecto se realiza utilizando Git y ramas de
funcionalidad.

Flujo general:

                         ┌──────────────────────────┐
                         │         develop          │
                         └────────────┬─────────────┘
                                      │
                                      ▼
                         ┌──────────────────────────┐
                         │    feature/* branch      │
                         └────────────┬─────────────┘
                                      │
                              Desarrollo
                                      │
                                      ▼
                              Pruebas locales
                                      │
                                      ▼
                                  Commit
                                      │
                                      ▼
                                   Push
                                      │
                                      ▼
                             Pull Request
                                      │
                                      ▼
                         ┌──────────────────────────┐
                         │         develop          │
                         └──────────────────────────┘

Cada funcionalidad debe:

Partir de develop.
Desarrollarse en una rama feature/*.
Incluir las pruebas correspondientes.
Ejecutar la suite de pruebas.
Verificar la cobertura cuando corresponda.
Realizar commits descriptivos.
Hacer push de la rama.
Crear un Pull Request hacia develop.
Historial de desarrollo

Entre las funcionalidades desarrolladas se encuentran:

Configuración inicial del proyecto.
Configuración de modelos y base de datos.
Configuración de Alembic.
Creación de schemas Pydantic.
Configuración de sesiones de base de datos.
Implementación de la API de proyectos.
Implementación de la API de actividades.
Implementación del sistema de auditoría.
Implementación de cálculos EVM por actividad.
Implementación de cálculos EVM por proyecto.
Pruebas unitarias de los servicios.
Pruebas de integración de los endpoints EVM.
Validación mediante cobertura de código.
Proceso de desarrollo asistido por IA

El proceso de desarrollo asistido por inteligencia artificial se encuentra
documentado en:

AI_PROCESS.md

Este documento contiene:

Herramientas de IA utilizadas.
Motivos para utilizar cada herramienta.
Prompts utilizados durante el desarrollo.
Proceso de aprendizaje de EVM.
Validación de las fórmulas antes de implementarlas.
Decisiones técnicas tomadas durante el desarrollo.
Decisiones en las que no se siguieron las recomendaciones de la IA.
Validación de los cálculos.
Decisiones de arquitectura realizadas de forma independiente.
Reflexión sobre el proceso de desarrollo.
Seguridad

No se deben almacenar en el repositorio:

.env
contraseñas
tokens
claves API
credenciales de base de datos

Los archivos de configuración locales deben mantenerse fuera del control
de versiones.

Se recomienda utilizar:

.env.example

para documentar las variables de entorno requeridas sin incluir
credenciales reales.

Estado del proyecto

Actualmente el backend Python cuenta con:

Gestión de proyectos.
Gestión de actividades.
Gestión de auditoría.
API REST con FastAPI.
Cálculos EVM por actividad.
Cálculos EVM agregados por proyecto.
Pruebas unitarias.
Pruebas de integración para los endpoints EVM.
Cobertura del 100% de los servicios.
Flujo de trabajo basado en ramas y Pull Requests.

El backend Node.js y el frontend forman parte de la arquitectura general
del proyecto y continúan su proceso de desarrollo e integración.

Contribución

Para realizar cambios en el proyecto:

Crear una rama a partir de develop.
Implementar la funcionalidad.
Agregar o actualizar las pruebas correspondientes.
Ejecutar las pruebas.
Verificar que no existan errores.
Crear un commit descriptivo.
Subir la rama al repositorio.
Crear un Pull Request hacia develop.

Ejemplo:

git checkout develop
git pull origin develop

git checkout -b feature/nueva-funcionalidad

# Realizar cambios

git add .
git commit -m "Add nueva funcionalidad"
git push -u origin feature/nueva-funcionalidad
Licencia

Este proyecto fue desarrollado como parte de un proceso de evaluación
técnica.
