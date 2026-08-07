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



## 🛠️ Tecnologías

### Backend Python
* Python 3.13
* FastAPI
* Uvicorn
* SQLAlchemy
* Pydantic
* PostgreSQL
* Alembic
* Pytest / Pytest-Cov

### Backend Node.js
* Node.js
* npm
* *[Tecnologías adicionales del backend Node.js]*

### Frontend
* *[Tecnología utilizada por el frontend]*
* *[Gestor de paquetes utilizado]*

### Base de datos
* PostgreSQL

### Control de versiones
* Git
* GitHub

---

## 📋 Requisitos previos

Antes de ejecutar el proyecto, asegúrate de contar con:
* Git
* Python 3.13 o compatible
* PostgreSQL
* Node.js
* npm

> 💡 **Nota:** Se recomienda usar un entorno virtual para el backend Python.

---


<h2><b>📂 Clonar el repositorio</b></h2>

<p>Para comenzar a trabajar localmente, clona el repositorio e ingresa al directorio principal:</p>

<pre><code>git clone https://github.com/espartacarlos22/evm-dashboard.git
cd evm-dashboard</code></pre>

<br>
<hr>
<br>

<h2><b>⚙️ Configuración rápida</b></h2>

<h3><b>Base de datos</b></h3>

<p><b>1. Crear la base de datos:</b><br>
Ejecuta la siguiente sentencia en PostgreSQL:</p>

<pre><code>CREATE DATABASE evm_dashboard;</code></pre>

<p><b>2. Configurar variables de entorno:</b><br>
Crea un archivo <code>.env</code> dentro del directorio <code>backend-python/</code>:</p>

<pre><code>DATABASE_URL=postgresql://USUARIO:CONTRASEÑA@localhost:5432/evm_dashboard
DEBUG=True</code></pre>

<blockquote>⚠️ <b>Advertencia:</b> No subir archivos <code>.env</code> con credenciales reales al repositorio. Usa <code>.env.example</code> como referencia.</blockquote>

<br>
<hr>
<br>

<h2><b>▶️ Ejecución local recomendada</b></h2>

<p><b>1. Iniciar PostgreSQL</b> en tu sistema.</p>

<p><b>2. Inicializar la base de datos</b> ejecutando las migraciones con Alembic:</p>

<pre><code>cd backend-python
alembic upgrade head</code></pre>

<p><b>3. Iniciar el backend de Python:</b></p>

<pre><code>uvicorn main:app --reload</code></pre>

<p><i>Disponible en:</i> <code>http://127.0.0.1:8000</code></p>

<p><b>4. Iniciar el backend de Node.js:</b></p>

<pre><code>cd backend-node
npm install
npm run dev</code></pre>

<p><b>5. Iniciar el frontend:</b></p>

<pre><code>cd frontend
npm install
npm run dev</code></pre>

<br>
<hr>
<br>

<h2><b>📑 Documentación de la API</b></h2>

<p>Una vez iniciado el backend en Python, puedes consultar la documentación interactiva en:</p>

<ul>
  <li><b>Swagger UI:</b> <code>http://127.0.0.1:8000/docs</code></li>
  <li><b>ReDoc:</b> <code>http://127.0.0.1:8000/redoc</code></li>
  <li><b>OpenAPI Spec:</b> <code>http://127.0.0.1:8000/openapi.json</code></li>
</ul>

<br>
<hr>
<br>

<h2><b>🧪 Pruebas</b></h2>

<p><b>Para ejecutar las pruebas en <code>backend-python</code>:</b></p>

<pre><code>python -m pytest -v</code></pre>

<p><b>Para verificar la cobertura de código:</b></p>

<pre><code>python -m pytest --cov=app.services --cov-report=term-missing</code></pre>

<p><b>Estado actual:</b></p>
<ul>
  <li><code>35 passed</code></li>
  <li><code>100%</code> cobertura en <code>app.services</code></li>
</ul>

<br>
<hr>
<br>

<h2><b>🌱 Flujo de desarrollo con Git</b></h2>

<p><b>1. Crear una nueva rama para cada funcionalidad:</b></p>

<pre><code>git checkout -b feature/nombre-de-la-funcionalidad</code></pre>

<p><b>2. Subir cambios:</b></p>

<pre><code>git add .
git commit -m "Descripción de los cambios"
git push -u origin feature/nombre-de-la-funcionalidad</code></pre>

<p><b>3. Crear Pull Request:</b><br>
Luego crea un Pull Request hacia la rama <code>develop</code>.</p>

<br>
<hr>
<br>

<h2><b>📘 Documentación adicional</b></h2>

<p>El proyecto incluye <code>AI_PROCESS.md</code>, donde se detalla:</p>

<ul>
  <li><b>Herramientas de IA utilizadas</b></li>
  <li><b>Proceso de aprendizaje de EVM</b></li>
  <li><b>Validación de fórmulas y cálculos</b></li>
  <li><b>Decisiones técnicas y de arquitectura</b></li>
  <li><b>Reflexión sobre el proceso de desarrollo</b></li>
</ul>

<br>
<hr>
<br>

<h2><b>📌 Estado del proyecto</b></h2>

<ul>
  <li><b>Backend Python:</b> Configuración inicial, modelos, migraciones, APIs, cálculos EVM, pruebas unitarias e integración, cobertura completa.</li>
  <li><b>Backend Node.js:</b> Implementación, integración, pruebas, documentación.</li>
  <li><b>Frontend:</b> Interfaz, integración con APIs, visualización de proyectos, actividades e indicadores EVM, pruebas.</li>
</ul>

<br>
<hr>
<br>

<h2><b>📄 Licencia</b></h2>

<p>Proyecto desarrollado como parte de un proceso de evaluación técnica.</p>

<br>
<hr>
<br>

<h2><b>👤 Autor</b></h2>

<p><b>Carlos Andrés Oviedo Guayara</b><br>
<b>Repositorio:</b> <a href="https://github.com/espartacarlos22/evm-dashboard">evm-dashboard</a></p>
