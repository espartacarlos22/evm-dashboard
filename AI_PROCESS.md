# AI_PROCESS.md

# Proceso de uso de Inteligencia Artificial

## 1. Introducción

Durante el desarrollo de esta prueba técnica utilicé herramientas de Inteligencia Artificial como apoyo para investigar, aprender conceptos nuevos, analizar alternativas técnicas, resolver problemas y revisar diferentes aspectos de la implementación.

La herramienta principal que utilicé fue ChatGPT.

Mi objetivo no fue delegar completamente el desarrollo de la solución en la Inteligencia Artificial, sino utilizarla como una herramienta de apoyo durante el proceso de ingeniería.

Considero especialmente importante aclarar esto porque uno de los principales retos de esta prueba fue la implementación del Valor Ganado (Earned Value Management - EVM), una metodología que no había implementado anteriormente.

Por esta razón, utilicé la Inteligencia Artificial inicialmente como una herramienta de aprendizaje para comprender la metodología, sus indicadores y la relación entre las diferentes fórmulas.

Posteriormente utilicé la IA como apoyo durante el desarrollo del backend, la resolución de problemas, la identificación de casos borde, las pruebas y la revisión de algunas decisiones técnicas.

En todos los casos procuré entender las soluciones antes de incorporarlas al proyecto y validar que los resultados fueran coherentes con los requisitos de la prueba.

---

# 2. Herramientas de Inteligencia Artificial utilizadas

## 2.1 ChatGPT

La principal herramienta de Inteligencia Artificial que utilicé durante el desarrollo fue ChatGPT.

La elegí principalmente porque permite realizar preguntas de manera iterativa y profundizar sobre una respuesta cuando un concepto no queda completamente claro.

Durante el desarrollo la utilicé para:

- Aprender la metodología EVM.
- Comprender las fórmulas solicitadas en la prueba.
- Comprender la interpretación de CPI y SPI.
- Analizar alternativas de arquitectura.
- Resolver dudas sobre Python y FastAPI.
- Resolver problemas encontrados durante el desarrollo.
- Revisar posibles casos borde.
- Analizar estrategias de pruebas.
- Revisar aspectos relacionados con PostgreSQL.
- Analizar organización y separación de responsabilidades.
- Apoyar la documentación técnica.

La IA fue utilizada como una herramienta de apoyo y no como una fuente que debiera seguirse de manera automática.

Cuando una respuesta involucraba una decisión importante de arquitectura o lógica de negocio, analicé la propuesta antes de implementarla.

---

# 3. Cómo aprendí EVM

Uno de los primeros retos de la prueba fue comprender el concepto de Valor Ganado.

Antes de implementar las fórmulas necesitaba entender qué representaba cada indicador y, principalmente, por qué las fórmulas permitían determinar si un proyecto estaba teniendo un buen o mal desempeño.

Comencé relacionando cuatro conceptos fundamentales:

- Presupuesto total del proyecto.
- Avance planificado.
- Avance real.
- Costo real.

A partir de estos conceptos comprendí la relación entre BAC, PV, EV y AC.

Posteriormente estudié los indicadores derivados:

- CV.
- SV.
- CPI.
- SPI.
- EAC.
- VAC.

La Inteligencia Artificial me ayudó a entender estos conceptos mediante ejemplos numéricos.

Sin embargo, antes de implementar las fórmulas hice comprobaciones manuales para verificar que los resultados obtenidos fueran coherentes.

---

# 4. Comprensión de las fórmulas EVM

## 4.1 BAC — Budget at Completion

BAC corresponde al presupuesto total planificado para completar el proyecto.

Por ejemplo:

    BAC = 100.000

Esto significa que el presupuesto total del proyecto es de 100.000 unidades monetarias.

---

## 4.2 PV — Planned Value

PV representa el valor planificado del trabajo que debería haberse completado a la fecha de corte.

La fórmula es:

    PV = % planificado × BAC

Por ejemplo:

    BAC = 100.000
    Avance planificado = 60%

    PV = 0,60 × 100.000
    PV = 60.000

Esto significa que, de acuerdo con la planificación, el proyecto debería haber generado un valor equivalente a 60.000.

---

## 4.3 EV — Earned Value

EV representa el valor del trabajo que realmente ha sido completado.

La fórmula es:

    EV = % completado × BAC

Por ejemplo:

    BAC = 100.000
    Avance real = 40%

    EV = 0,40 × 100.000
    EV = 40.000

Por lo tanto, el trabajo realmente completado representa un valor de 40.000.

---

## 4.4 AC — Actual Cost

AC representa el costo real incurrido hasta la fecha de corte.

Por ejemplo:

    AC = 50.000

Esto significa que hasta ese momento se han gastado 50.000.

---

## 4.5 CV — Cost Variance

CV permite comparar el valor obtenido con el costo real.

La fórmula es:

    CV = EV - AC

Utilizando el ejemplo:

    EV = 40.000
    AC = 50.000

    CV = 40.000 - 50.000
    CV = -10.000

Un CV negativo indica un comportamiento desfavorable en costos.

---

## 4.6 SV — Schedule Variance

SV permite comparar el valor realmente obtenido con el valor que se esperaba obtener de acuerdo con la planificación.

La fórmula es:

    SV = EV - PV

Por ejemplo:

    EV = 40.000
    PV = 60.000

    SV = 40.000 - 60.000
    SV = -20.000

Un SV negativo indica que el proyecto está por debajo del avance planificado.

---

## 4.7 CPI — Cost Performance Index

CPI permite medir la eficiencia del proyecto respecto al costo.

La fórmula es:

    CPI = EV / AC

Por ejemplo:

    EV = 40.000
    AC = 50.000

    CPI = 40.000 / 50.000
    CPI = 0,80

La interpretación que utilicé fue:

    CPI > 1 → desempeño favorable en costos
    CPI = 1 → desempeño acorde con el presupuesto
    CPI < 1 → desempeño desfavorable en costos

En este caso, un CPI de 0,80 indica que el proyecto está teniendo una eficiencia inferior a la esperada en relación con sus costos.

---

## 4.8 SPI — Schedule Performance Index

SPI permite medir la eficiencia respecto al cronograma.

La fórmula es:

    SPI = EV / PV

Por ejemplo:

    EV = 40.000
    PV = 60.000

    SPI = 40.000 / 60.000
    SPI = 0,67

La interpretación es:

    SPI > 1 → avance superior al planificado
    SPI = 1 → avance acorde con lo planificado
    SPI < 1 → avance inferior al planificado

Por lo tanto, un SPI de 0,67 indica que el proyecto está retrasado respecto a lo planificado.

---

## 4.9 EAC — Estimate at Completion

EAC permite estimar el costo final del proyecto teniendo en cuenta el desempeño actual.

La fórmula utilizada es:

    EAC = BAC / CPI

Por ejemplo:

    BAC = 100.000
    CPI = 0,80

    EAC = 100.000 / 0,80
    EAC = 125.000

Esto indica que, manteniendo el desempeño actual, el proyecto podría finalizar con un costo aproximado de 125.000.

---

## 4.10 VAC — Variance at Completion

VAC permite comparar el presupuesto original con el costo estimado al finalizar.

La fórmula es:

    VAC = BAC - EAC

Por ejemplo:

    BAC = 100.000
    EAC = 125.000

    VAC = 100.000 - 125.000
    VAC = -25.000

Un VAC negativo indica que el proyecto tiene una proyección de sobrecosto frente al presupuesto original.

---

# 5. Cómo validé que entendía las fórmulas

No me limité a implementar las fórmulas directamente en el código.

Realicé cálculos manuales utilizando escenarios sencillos para comprobar que podía interpretar correctamente los resultados.

Utilicé el siguiente ejemplo:

| Variable | Valor |
|---|---:|
| BAC | 100.000 |
| Avance planificado | 60% |
| Avance real | 40% |
| AC | 50.000 |

A partir de estos datos calculé:

| Indicador | Resultado |
|---|---:|
| PV | 60.000 |
| EV | 40.000 |
| CV | -10.000 |
| SV | -20.000 |
| CPI | 0,80 |
| SPI | 0,67 |
| EAC | 125.000 |
| VAC | -25.000 |

Después analicé si la interpretación tenía sentido.

El proyecto debía haber completado el 60% del trabajo, pero solamente había completado el 40%, por lo que era lógico que el SPI fuera menor que 1.

También había gastado 50.000 para generar solamente 40.000 de valor ganado, por lo que era lógico que el CPI fuera menor que 1.

Finalmente, debido al CPI de 0,80, la estimación del costo final resultaba superior al presupuesto inicial.

Esta comprobación me permitió validar no solamente las operaciones matemáticas, sino también la interpretación de los indicadores.

---

# 6. Implementación del backend

Para el backend elegí Python con FastAPI y PostgreSQL como base de datos.

Elegí esta combinación porque me permite construir una API REST clara, mantener separada la lógica de negocio y utilizar una base de datos relacional adecuada para la información de proyectos y actividades.

El backend tiene como principales responsabilidades:

- Crear proyectos.
- Consultar proyectos.
- Actualizar proyectos.
- Eliminar proyectos.
- Crear actividades.
- Consultar actividades.
- Actualizar actividades.
- Eliminar actividades.
- Calcular los indicadores EVM.
- Consolidar los indicadores del proyecto.
- Validar los datos recibidos.
- Manejar los casos borde.
- Exponer la información mediante una API REST.

La estructura conceptual de la solución es:

    Cliente
       |
       v
    FastAPI
       |
       v
    Validación
       |
       v
    Lógica de negocio
       |
       v
    Persistencia
       |
       v
    PostgreSQL

---

# 7. Separación de la lógica de negocio

Una decisión importante fue evitar colocar toda la lógica de EVM directamente dentro de los endpoints.

Los endpoints tienen como responsabilidad principal recibir las solicitudes, validar la información necesaria y devolver las respuestas correspondientes.

Los cálculos de EVM pertenecen a la lógica de negocio.

Separar estas responsabilidades facilita:

- Las pruebas unitarias.
- La lectura del código.
- El mantenimiento.
- La modificación futura de las fórmulas.
- La reutilización de la lógica.

También evita que los controladores se conviertan en bloques grandes de lógica difícil de mantener.

---

# 8. Casos borde analizados

Durante el desarrollo presté especial atención a los casos donde las fórmulas podían presentar comportamientos especiales.

## 8.1 AC igual a cero

CPI se calcula mediante:

    CPI = EV / AC

Si AC es cero, una división normal generaría un error.

Por esta razón, este escenario debe manejarse explícitamente.

---

## 8.2 PV igual a cero

SPI se calcula mediante:

    SPI = EV / PV

Cuando PV es cero tampoco es posible realizar una división convencional.

Este caso debe manejarse de forma controlada.

---

## 8.3 Avance real igual a cero

Si el avance real es 0%:

    EV = 0

Esto representa una situación válida del proyecto y no necesariamente un error.

---

## 8.4 Avance planificado igual a cero

Si el avance planificado es 0%:

    PV = 0

En consecuencia, SPI requiere un tratamiento especial.

---

## 8.5 Proyecto sin actividades

También consideré que un proyecto puede existir sin actividades asociadas.

La ausencia de actividades no debería provocar un error inesperado en el servidor.

La aplicación debe poder representar correctamente que todavía no existe información suficiente para realizar una consolidación basada en actividades.

---

# 9. Uso de IA durante la implementación

Durante la implementación utilicé ChatGPT como apoyo en diferentes momentos.

La IA me permitió avanzar más rápidamente cuando encontré dudas técnicas o conceptos que necesitaba investigar.

Entre los temas para los cuales utilicé IA estuvieron:

- Python.
- FastAPI.
- PostgreSQL.
- Estructuración del backend.
- API REST.
- Validación de datos.
- Manejo de errores.
- Pruebas.
- EVM.
- Casos borde.
- Organización del código.
- Git y flujo de trabajo.

Una característica importante de mi proceso fue utilizar las respuestas como punto de partida y posteriormente revisar si la solución propuesta realmente se ajustaba al problema.

---

# 10. Decisiones en las que no seguí ciegamente las recomendaciones de la IA

## 10.1 Mantener la lógica EVM fuera de los endpoints

Una alternativa que podía implementarse era realizar directamente los cálculos dentro de los endpoints.

No consideré conveniente hacerlo de esa manera porque habría mezclado responsabilidades.

Preferí mantener la lógica de negocio separada para que pudiera ser probada de forma independiente.

La razón principal fue mantener el código más claro y facilitar su mantenimiento.

---

## 10.2 Manejar explícitamente los casos de división por cero

Otra situación que analicé fue el comportamiento de CPI y SPI cuando sus denominadores son cero.

No considero adecuado que un estado válido del proyecto termine provocando una excepción inesperada en el servidor.

Por esta razón, decidí que estos escenarios debían formar parte explícita de las reglas de negocio.

Esto permite que la API responda de forma controlada en lugar de producir un error matemático no gestionado.

---

# 11. Decisión arquitectónica tomada independientemente

Una decisión que tomé desde el punto de vista de diseño fue separar la lógica de cálculo de EVM de la capa HTTP.

La razón fue que las fórmulas representan reglas propias del dominio del problema.

No dependen de FastAPI, HTTP ni de la forma en que el usuario interactúa con la aplicación.

Por lo tanto, consideré que debía existir una separación clara entre:

    Entrada HTTP
          ↓
    Validación
          ↓
    Lógica de negocio
          ↓
    Persistencia

Esta decisión también facilita la evolución futura de la aplicación.

Por ejemplo, si posteriormente se quisiera utilizar la misma lógica de cálculo desde otro tipo de interfaz, no sería necesario duplicar las fórmulas.

---

# 12. Estrategia de pruebas

Las pruebas se plantearon en dos niveles principales.

## 12.1 Pruebas unitarias

Las pruebas unitarias se enfocan principalmente en la lógica de negocio.

Los escenarios importantes incluyen:

- Cálculo normal.
- AC igual a cero.
- PV igual a cero.
- Avance real igual a cero.
- Avance planificado igual a cero.
- CPI menor que 1.
- CPI igual a 1.
- CPI mayor que 1.
- SPI menor que 1.
- SPI igual a 1.
- SPI mayor que 1.
- Variaciones positivas.
- Variaciones negativas.

El objetivo es comprobar que la lógica produzca resultados correctos y no solamente que una función devuelva algún valor.

---

## 12.2 Pruebas de integración

Las pruebas de integración permiten verificar el comportamiento de la API.

Entre los aspectos evaluados se encuentran:

- Códigos de respuesta HTTP.
- Estructura de las respuestas.
- Validación de los datos enviados.
- Creación de proyectos.
- Consulta de proyectos.
- Actualización de proyectos.
- Eliminación de proyectos.
- Creación de actividades.
- Consulta de actividades.
- Actualización de actividades.
- Eliminación de actividades.
- Resultados de EVM.

---

# 13. Calidad y mantenibilidad

Durante el desarrollo procuré mantener el código sencillo y fácil de entender.

Los principales criterios que tuve en cuenta fueron:

- Utilizar nombres descriptivos.
- Evitar responsabilidades mezcladas.
- Evitar duplicación innecesaria.
- Mantener la lógica de negocio separada.
- Validar los datos de entrada.
- Manejar explícitamente los casos borde.
- Crear pruebas sobre la lógica importante.
- Utilizar una base de datos relacional.
- Mantener documentación del proyecto.
- Utilizar control de versiones.

Mi objetivo fue que otro desarrollador pudiera tomar el proyecto y entender su estructura sin necesitar conocer previamente todo el proceso de desarrollo.

---

# 14. Git y control de versiones

Utilicé Git durante el desarrollo para mantener un historial de los cambios realizados.

La estructura de ramas se planteó siguiendo el flujo solicitado por la prueba:

    main
      |
      +---- release/*
      |
    develop
      |
      +---- feature/*
      |
      +---- feature/*

Las funcionalidades se desarrollaron de manera independiente y posteriormente se integraron a la rama de desarrollo.

También procuré utilizar mensajes de commit descriptivos para que el historial permitiera entender qué cambios se realizaron.

---

# 15. Documentación del proyecto

Además del código fuente, preparé documentación para facilitar la ejecución y comprensión del proyecto.

El README contiene la información necesaria para:

- Comprender el objetivo de la aplicación.
- Conocer el stack utilizado.
- Configurar las variables de entorno.
- Configurar la base de datos.
- Ejecutar el backend.
- Ejecutar las pruebas.
- Conocer los principales endpoints.
- Comprender la estructura general del proyecto.

La intención es que otro desarrollador pueda reproducir el proyecto localmente siguiendo las instrucciones proporcionadas.

---

# 16. Reflexión sobre el uso de Inteligencia Artificial

Uno de los principales aprendizajes de esta prueba fue entender que utilizar Inteligencia Artificial en desarrollo no significa simplemente copiar código generado.

En mi caso, la IA fue especialmente útil para aprender EVM, porque era una metodología que no había implementado anteriormente.

Pude utilizarla para realizar preguntas, solicitar ejemplos, analizar casos y aclarar conceptos.

Sin embargo, también comprobé que una respuesta de IA debe ser analizada antes de convertirse en una decisión de desarrollo.

Una respuesta puede ser técnicamente válida pero no necesariamente ser la mejor alternativa para el contexto específico del proyecto.

Por esta razón, intenté utilizar la IA como un asistente para pensar y aprender, y no como sustituto del criterio de ingeniería.

La validación manual de los cálculos fue especialmente importante para mí.

No quería comprobar únicamente que el código devolviera números, sino que esos números representaran correctamente la situación del proyecto.

---

# 17. Qué haría diferente si repitiera el ejercicio

Si volviera a realizar la prueba, dedicaría más tiempo al principio a definir completamente los casos de prueba antes de comenzar la implementación.

En particular, definiría desde el inicio una matriz con:

- Casos normales.
- Valores cero.
- Valores límite.
- Avance de 0%.
- Avance de 100%.
- Proyectos sin actividades.
- CPI menor que 1.
- CPI igual a 1.
- CPI mayor que 1.
- SPI menor que 1.
- SPI igual a 1.
- SPI mayor que 1.

También documentaría las decisiones arquitectónicas a medida que las tomo.

Esto facilitaría posteriormente explicar por qué elegí una alternativa determinada y permitiría que el documento de proceso se construyera de manera paralela al desarrollo.

Finalmente, dedicaría desde el primer día un espacio específico para registrar el uso de Inteligencia Artificial y las decisiones tomadas a partir de sus recomendaciones.

---

# 18. Conclusión

El uso de Inteligencia Artificial fue una parte importante de mi proceso de desarrollo, principalmente como herramienta de aprendizaje, investigación y apoyo técnico.

El reto más importante fue comprender una metodología nueva y convertir sus conceptos en reglas de negocio que pudieran ser implementadas y probadas.

Durante el proceso aprendí que utilizar IA de manera efectiva requiere mantener criterio propio.

La herramienta puede ayudar a explicar conceptos, encontrar alternativas y acelerar la resolución de problemas, pero la responsabilidad sobre la solución final continúa siendo del desarrollador.

Por esta razón, además de implementar las funcionalidades solicitadas, procuré validar manualmente los cálculos EVM, analizar los casos borde, separar las responsabilidades del backend y mantener una estructura que pudiera ser comprendida y mantenida por otro desarrollador.

Considero que el principal aprendizaje de la prueba no fue solamente implementar una aplicación funcional, sino aprender a utilizar una herramienta de Inteligencia Artificial dentro de un proceso de ingeniería sin perder la comprensión sobre las decisiones y el código desarrollado.

---

# 19. Prompts utilizados durante el desarrollo

En esta sección se deben registrar los prompts utilizados durante el desarrollo en el mismo orden en que fueron realizados.

## Prompt 1

> Necesito desarrollar esta prueba técnica de Trycore Colombia.

Quiero construir una aplicación fullstack para gestionar proyectos y actividades y calcular indicadores de Earned Value Management (EVM).

ARQUITECTURA

Usaremos:

- Backend: Python + FastAPI
- ORM: SQLAlchemy
- Migraciones: Alembic
- Base de datos: PostgreSQL
- Podemos usar Supabase como proveedor de PostgreSQL.
- Frontend: React + TypeScript
- Build: Vite
- UI: Material UI (MUI)
- API: REST
- Documentación: OpenAPI/Swagger
- Pruebas backend: pytest
- Git: Gitflow
  - main
  - develop
  - feature/*
  - release/*
- Repositorio: GitHub

Quiero desarrollar el proyecto desde Visual Studio Code.

Importante a tener en cuenta:
Quiero construirlo paso a paso. No quiero recibir todo el proyecto de una sola vez.

En cada etapa debes:
1. Explicarme qué vamos a construir.
2. Explicarme por qué lo hacemos.
3. Indicarme exactamente qué carpetas y archivos crear.
4. Darme el código completo de cada archivo.
5. Indicarme exactamente desde qué carpeta ejecutar cada comando.
6. Explicarme cómo probar que funciona.
7. No avanzar al siguiente capítulo hasta verificar que el anterior funciona.

También quiero mantener una arquitectura limpia:
- Los endpoints/controladores no deben contener lógica de negocio.
- La lógica EVM debe estar en servicios independientes.
- Usar schemas/DTOs para requests y responses.
- Usar modelos SQLAlchemy para persistencia.
- Separar routers, servicios, modelos y configuración.
- Mantener las variables sensibles en .env.
- Nunca subir .env a GitHub.

BASE DE DATOS

Usaremos PostgreSQL mediante Supabase.

Necesito que me ayudes a construir las tablas:

PROJECTS
- id UUID
- name
- description
- status
- created_at
- updated_at

ACTIVITIES
- id UUID
- project_id UUID
- name
- BAC
- planned_progress
- actual_progress
- actual_cost
- created_at
- updated_at

AUDIT_LOGS
- id UUID
- entity
- entity_id UUID
- action
- description
- created_at

Las relaciones y restricciones deben estar correctamente definidas.

Usaremos Alembic para crear y modificar el esquema de la base de datos.

EVM

Cada actividad debe calcular:

PV = planned_progress × BAC

EV = actual_progress × BAC

CV = EV − AC

SV = EV − PV

CPI = EV / AC

SPI = EV / PV

EAC = BAC / CPI

VAC = BAC − EAC

También necesitamos una interpretación:

CPI > 1 = favorable en costos
CPI < 1 = desfavorable en costos
CPI = 1 = según presupuesto

SPI > 1 = adelantado
SPI < 1 = atrasado
SPI = 1 = según cronograma

Debemos manejar correctamente casos como:

- AC = 0
- PV = 0
- EV = 0
- actividades sin datos
- proyecto sin actividades

La lógica debe evitar divisiones por cero y devolver respuestas claras.

BACKEND

Crear una API REST con FastAPI para:

Projects:
- crear proyecto
- consultar proyectos
- consultar proyecto por ID
- actualizar proyecto
- eliminar proyecto
- consultar indicadores EVM consolidados

Activities:
- crear actividad
- consultar actividades
- consultar actividad por ID
- actualizar actividad
- eliminar actividad

EVM:
- calcular indicadores por actividad
- calcular indicadores consolidados por proyecto

La API debe tener Swagger/OpenAPI.

FRONTEND

Crear un dashboard con React + TypeScript + Vite + MUI.

Debe permitir:

- visualizar proyectos
- crear proyectos
- editar proyectos
- eliminar proyectos
- seleccionar un proyecto
- visualizar sus actividades
- crear actividades
- editar actividades
- eliminar actividades
- visualizar PV, EV, AC, CV, SV, CPI, SPI, EAC y VAC
- visualizar el estado de CPI y SPI
- mostrar una gráfica de PV, EV y AC
- actualizar los indicadores cuando cambien los datos

El diseño debe ser sencillo, profesional y claro.

PRUEBAS

Implementar pruebas unitarias para toda la lógica EVM.

Mínimo:

- CPI normal
- SPI normal
- AC = 0
- PV = 0
- EV = 0
- proyecto sin actividades
- cálculos consolidados

También crear pruebas de integración para los endpoints.

Objetivo:

- mínimo 80% de cobertura en la capa de negocio.

CALIDAD

Configurar linting y mantener código limpio.

Evitar:

- código duplicado
- variables sin utilizar
- números mágicos
- strings mágicos
- lógica de negocio dentro de endpoints
- funciones demasiado grandes
- código comentado innecesario

GITFLOW

Quiero trabajar así:

main
  ↓
develop
  ↓
feature/*
  ↓
Pull Request
  ↓
develop
  ↓
release/*
  ↓
main

Cada funcionalidad debe desarrollarse en una rama feature.

Los commits deben ser descriptivos y en inglés.

Ejemplos:

Add project model

Add activity CRUD endpoints

Add EVM calculation service

Add EVM unit tests

Fix CPI zero division case

Add project dashboard

* Quiero que me guíes paso a paso.

NO me entregues todo el proyecto de una vez.

## Prompt 2

> Quiero continuar el desarrollo de mi prueba técnica de Trycore Colombia.

Te voy a proporcionar una imagen de la estructura ACTUAL de mi proyecto en Visual Studio Code.

Debes utilizar esta estructura como punto de partida y NO debes asumir que el proyecto está vacío.

OBJETIVO

Quiero terminar completamente el backend desarrollado con:

- Python
- FastAPI
- SQLAlchemy
- Alembic
- PostgreSQL
- Supabase como proveedor de PostgreSQL
- Pydantic
- pytest

La arquitectura debe ser limpia y mantenible.

ESTRUCTURA ACTUAL

La imagen que te proporciono muestra la estructura actual de mi proyecto.

Debes:

1. Revisar primero la estructura.
2. Identificar qué archivos ya existen.
3. Identificar cuáles están completos.
4. Identificar cuáles debemos crear.
5. Identificar cuáles debemos modificar.
6. No crear archivos duplicados.
7. No eliminar archivos existentes sin explicarme primero por qué.
8. No cambiar la arquitectura existente innecesariamente.
9. Mantener compatibilidad con el código que ya funciona.

IMPORTANTE

Quiero que trabajemos ARCHIVO POR ARCHIVO.

NO quiero que me entregues todo el backend de una sola vez.

Para cada archivo debemos seguir este proceso:

1. Explicarme para qué sirve el archivo.
2. Explicarme por qué lo necesitamos.
3. Indicarme si:
   - debemos crearlo,
   - modificarlo,
   - o dejarlo como está.
4. Darme el código COMPLETO del archivo.
5. Indicarme exactamente dónde guardar el archivo.
6. Explicarme qué parte de la arquitectura utiliza.
7. Indicarme los comandos necesarios para probarlo.
8. Ejecutar/verificar la prueba conmigo.
9. Si existe algún error, solucionarlo antes de continuar.
10. Solo después de comprobar que funciona debemos pasar al siguiente archivo.

NO avances automáticamente al siguiente proceso.

Quiero que esperes mi confirmación después de cada etapa.

--------------------------------------------------
ARQUITECTURA DEL BACKEND
--------------------------------------------------

Quiero mantener aproximadamente esta separación:

app/
│
├── api/
│   ├── router.py
│   └── endpoints/
│
├── core/
│   ├── config.py
│   ├── constants.py
│   └── security.py
│
├── db/
│   ├── base.py
│   ├── database.py
│   └── session.py
│
├── models/
│   ├── project.py
│   ├── activity.py
│   └── audit_log.py
│
├── repositories/
│
├── schemas/
│   ├── project.py
│   ├── activity.py
│   └── evm.py
│
├── services/
│   ├── project_service.py
│   ├── activity_service.py
│   └── evm_service.py
│
├── tests/
│
└── utils/

La estructura real puede ser ligeramente diferente porque ya existe código.

No quiero que la reemplaces automáticamente.

Primero analiza la imagen.

--------------------------------------------------
BASE DE DATOS
--------------------------------------------------

Ya utilizamos PostgreSQL mediante Supabase.

Las tablas principales son:

PROJECTS

- id UUID
- name
- description
- status
- created_at
- updated_at

ACTIVITIES

- id UUID
- project_id UUID
- name
- BAC
- planned_progress
- actual_progress
- actual_cost
- created_at
- updated_at

AUDIT_LOGS

- id UUID
- entity
- entity_id UUID
- action
- description
- created_at

Las relaciones deben estar correctamente definidas.

Los UUID deben utilizarse como identificadores.

Alembic debe ser utilizado para todas las migraciones.

NO debemos crear las tablas manualmente desde los endpoints.

--------------------------------------------------
EVM
--------------------------------------------------

El sistema debe calcular los siguientes indicadores:

PV = planned_progress × BAC

EV = actual_progress × BAC

CV = EV − AC

SV = EV − PV

CPI = EV / AC

SPI = EV / PV

EAC = BAC / CPI

VAC = BAC − EAC

Donde:

BAC = Budget at Completion
AC = Actual Cost
PV = Planned Value
EV = Earned Value

Interpretación:

CPI > 1:
Favorable en costos.

CPI < 1:
Desfavorable en costos.

CPI = 1:
Según presupuesto.

SPI > 1:
Adelantado.

SPI < 1:
Atrasado.

SPI = 1:
Según cronograma.

--------------------------------------------------
CASOS BORDE
--------------------------------------------------

La lógica EVM debe manejar correctamente:

- AC = 0
- PV = 0
- EV = 0
- BAC = 0
- actividades sin datos válidos
- proyecto sin actividades
- proyecto con una actividad
- proyecto con múltiples actividades

Nunca debemos permitir una división por cero.

La respuesta debe ser clara y consistente.

La lógica EVM debe estar en un SERVICE.

NO debe estar dentro del endpoint.

--------------------------------------------------
BACKEND API
--------------------------------------------------

Quiero construir los endpoints necesarios para:

PROJECTS

POST
Crear proyecto.

GET
Consultar proyectos.

GET /{project_id}
Consultar proyecto por ID.

PUT/PATCH
Actualizar proyecto.

DELETE
Eliminar proyecto.

EVM

GET
Consultar indicadores consolidados de un proyecto.

ACTIVITIES

POST
Crear actividad.

GET
Consultar actividades de un proyecto.

GET /{activity_id}
Consultar actividad.

PUT/PATCH
Actualizar actividad.

DELETE
Eliminar actividad.

EVM POR ACTIVIDAD

Debe existir una forma clara de obtener los indicadores EVM de una actividad.

--------------------------------------------------
CAPA DE ARQUITECTURA
--------------------------------------------------

Quiero mantener esta responsabilidad:

ROUTER / ENDPOINT

Debe:

- recibir request
- validar parámetros
- llamar al service
- devolver response

No debe contener lógica EVM.

SERVICE

Debe contener:

- lógica de negocio
- cálculos EVM
- validaciones de negocio
- consolidación de indicadores

REPOSITORY

Debe encargarse de:

- consultas SQLAlchemy
- crear registros
- actualizar registros
- eliminar registros
- obtener registros

MODEL

Debe representar las tablas PostgreSQL.

SCHEMA

Debe representar:

- Request
- Response
- DTOs

--------------------------------------------------
AUDITORÍA
--------------------------------------------------

Quiero utilizar AUDIT_LOGS para registrar operaciones importantes.

Por ejemplo:

CREATE
UPDATE
DELETE

La auditoría debe permitir saber:

- qué entidad cambió
- qué ID tuvo
- qué acción ocurrió
- descripción
- fecha

La implementación debe mantenerse sencilla y limpia.

--------------------------------------------------
OPENAPI / SWAGGER
--------------------------------------------------

FastAPI debe generar automáticamente OpenAPI.

Quiero que los endpoints tengan:

- descripción
- parámetros
- request schema
- response schema
- códigos HTTP apropiados
- errores claros

Al finalizar debemos comprobar Swagger.

--------------------------------------------------
PRUEBAS
--------------------------------------------------

Quiero desarrollar las pruebas junto con cada funcionalidad.

NO quiero dejar todas las pruebas para el final.

Para cada funcionalidad debemos crear:

1. pruebas unitarias
2. pruebas de integración cuando corresponda

EVM debe tener pruebas como mínimo para:

- cálculo normal de CPI
- cálculo normal de SPI
- AC = 0
- PV = 0
- EV = 0
- BAC = 0
- proyecto sin actividades
- proyecto con una actividad
- proyecto con varias actividades
- consolidación de indicadores

También debemos probar los endpoints.

Cada endpoint debe tener al menos una prueba de integración.

Objetivo:

Mínimo 80% de cobertura en la capa de negocio.

Al finalizar quiero ejecutar:

pytest

y también:

pytest --cov=app

--------------------------------------------------
CALIDAD
--------------------------------------------------

Quiero mantener código profesional.

Evitar:

- lógica de negocio en routers
- código duplicado
- variables sin utilizar
- funciones demasiado grandes
- números mágicos
- strings mágicos
- imports innecesarios
- código comentado innecesariamente
- consultas SQL duplicadas
- acceso directo a la base de datos desde los endpoints

--------------------------------------------------
PROCESO DE DESARROLLO
--------------------------------------------------

Quiero desarrollar en este orden, salvo que después de revisar la estructura recomiendes un pequeño cambio:

FASE 1
Revisión de la arquitectura actual.

FASE 2
Schemas Pydantic.

FASE 3
Repositories.

FASE 4
Services.

FASE 5
EVM Service.

FASE 6
Endpoints de Projects.

FASE 7
Endpoints de Activities.

FASE 8
Endpoints EVM.

FASE 9
Auditoría.

FASE 10
Pruebas unitarias.

FASE 11
Pruebas de integración.

FASE 12
Swagger/OpenAPI.

FASE 13
Validación completa del backend.

FASE 14
README.

No avances automáticamente entre fases.

--------------------------------------------------
GITFLOW
--------------------------------------------------

Estoy utilizando GitHub y Gitflow.

Las ramas son:

main
develop
feature/*
release/*

Cada funcionalidad debe desarrollarse en una rama feature.

Ejemplos:

feature/project-crud
feature/activity-crud
feature/evm-calculations
feature/api-tests

Los commits deben estar en inglés y ser descriptivos.

Ejemplos:

Add project schemas

Add project repository

Add project service

Add project CRUD endpoints

Add EVM calculation service

Add EVM unit tests

Add activity integration tests

Cuando terminemos una funcionalidad:

1. revisar git status
2. revisar los archivos modificados
3. hacer git add
4. hacer commit
5. hacer push
6. indicarme exactamente el comando

No hagas commits automáticamente.

Primero explícame qué vamos a subir.

--------------------------------------------------
REGLA PARA LOS COMANDOS
--------------------------------------------------

Cada vez que me des un comando debes indicarme:

CARPETA DESDE LA QUE DEBO EJECUTARLO

Por ejemplo:

Desde:

C:\Users\USUARIO\Documents\Proyecto - evm-dashboard\evm-dashboard\backend-python

ejecutar:

python -m pytest

No quiero ejecutar comandos desde una carpeta diferente por accidente.

Como estoy utilizando Windows + PowerShell + Visual Studio Code, todos los comandos deben ser compatibles con PowerShell.

--------------------------------------------------
REGLA PARA LOS ERRORES
--------------------------------------------------

Si aparece un error:

NO continúes.

Primero:

1. analiza el error
2. explícame qué significa
3. identifica el archivo responsable
4. dame la corrección
5. volvemos a ejecutar la prueba
6. verificamos que funcione
7. solamente entonces continuamos

--------------------------------------------------
REGLA PRINCIPAL
--------------------------------------------------

NO quiero recibir todo el código del backend de una vez.

Quiero construirlo contigo paso a paso.

Quiero entender qué estoy construyendo porque posteriormente debo presentar esta prueba técnica y explicarla en un video de máximo 10 minutos.

Por lo tanto, cada decisión técnica debe explicarse de forma sencilla.

No quiero solamente código.

Quiero entender:

- qué hace
- por qué existe
- cómo se conecta con los demás componentes
- cómo se prueba
- cómo llega una petición desde FastAPI hasta PostgreSQL
- cómo vuelve la respuesta al cliente

--------------------------------------------------
OBJETIVO FINAL
--------------------------------------------------

Al terminar quiero tener un backend profesional y funcional que permita:

1. Crear proyectos.
2. Consultar proyectos.
3. Actualizar proyectos.
4. Eliminar proyectos.
5. Crear actividades.
6. Consultar actividades.
7. Actualizar actividades.
8. Eliminar actividades.
9. Calcular EVM por actividad.
10. Calcular EVM consolidado por proyecto.
11. Registrar auditoría.
12. Validar errores.
13. Ejecutar pruebas unitarias.
14. Ejecutar pruebas de integración.
15. Obtener al menos 80% de cobertura en la capa de negocio.
16. Consultar la documentación Swagger.
17. Ejecutar migraciones mediante Alembic.
18. Mantener PostgreSQL/Supabase correctamente conectado.

Al finalizar cada funcionalidad quiero poder probarla directamente mediante Swagger o pruebas automatizadas.

--------------------------------------------------
COMIENZO
--------------------------------------------------

Primero analiza la imagen de la estructura actual del proyecto que te estoy proporcionando.

NO escribas código todavía.

Primero dime:

1. Qué archivos identificas.
2. Qué partes de la arquitectura ya están construidas.
3. Qué partes faltan.
4. Qué archivos debemos revisar antes de crear nuevos archivos.
5. Si detectas algún problema en la estructura actual.

Después de ese análisis, propón el primer archivo que debemos trabajar.

ESPERA MI CONFIRMACIÓN ANTES DE CONTINUAR.

## Prompt 3

> Estoy desarrollando una prueba técnica para Trycore Colombia llamada EVM Dashboard.

Ya terminé los capítulos anteriores del backend y actualmente tengo esta arquitectura:

backend-python/
├── alembic/
├── app/
│   ├── api/
│   ├── core/
│   ├── db/
│   ├── models/
│   ├── repositories/
│   ├── schemas/
│   ├── services/
│   ├── tests/
│   └── utils/
├── .env
├── .gitignore
├── alembic.ini
├── main.py
└── requirements.txt

Stack actual:

- Python
- FastAPI
- SQLAlchemy
- PostgreSQL mediante Supabase
- Alembic
- Pydantic
- pytest
- Git/GitHub
- Gitflow

Los modelos SQLAlchemy de Project, Activity y AuditLog ya existen y las migraciones de Alembic ya fueron creadas y ejecutadas correctamente contra PostgreSQL/Supabase.

Quiero continuar ahora con:

CAPÍTULO 3 — Schemas Pydantic para Projects
CAPÍTULO 4 — Schemas Pydantic para Activities

IMPORTANTE:

No quiero que desarrolles ambos capítulos de una sola vez.

Primero debemos terminar completamente el CAPÍTULO 3 y verificar que funciona.

Después continuaremos con el CAPÍTULO 4.

==================================================
CAPÍTULO 3 — SCHEMAS PYDANTIC PARA PROJECTS
==================================================

Quiero implementar los schemas Pydantic necesarios para manejar Projects de forma profesional.

Necesito que determines cuáles schemas son realmente necesarios, por ejemplo:

- ProjectCreate
- ProjectUpdate
- ProjectResponse
- ProjectListResponse

Si consideras que alguno no es necesario, explícame por qué.

Los schemas deben estar alineados con el modelo SQLAlchemy existente.

El Project actualmente contiene:

- id UUID
- name
- description
- status
- created_at
- updated_at

El status utiliza los estados:

- PLANNING
- IN_PROGRESS
- COMPLETED
- CANCELLED

Quiero que los schemas:

- utilicen UUID correctamente
- validen los datos de entrada
- tengan tipos correctos
- manejen correctamente campos opcionales
- permitan respuestas desde objetos SQLAlchemy
- utilicen las características modernas de Pydantic
- sean compatibles con FastAPI
- tengan ejemplos o descripciones cuando aporten valor
- no dupliquen lógica de negocio

La lógica de negocio NO debe estar en los schemas.

Quiero que me expliques:

1. Qué es un schema Pydantic.
2. Diferencia entre Model SQLAlchemy y Schema Pydantic.
3. Por qué necesitamos schemas separados para Create, Update y Response.
4. Cómo se relacionan los schemas con FastAPI.
5. Qué validaciones debemos realizar.

Después quiero que trabajemos ARCHIVO POR ARCHIVO.

Para cada archivo:

1. Indícame exactamente dónde debe estar.
2. Dame el código completo.
3. Explícame cada parte importante.
4. Indícame si debemos modificar algún archivo existente.
5. No inventes archivos innecesarios.
6. No avances hasta que yo confirme que el archivo funciona.

Después de crear los schemas de Projects debemos hacer una prueba sencilla para comprobar que:

- ProjectCreate acepta datos válidos.
- ProjectCreate rechaza datos inválidos.
- ProjectUpdate permite actualizaciones parciales correctamente.
- ProjectResponse puede construirse desde un objeto SQLAlchemy.
- UUID funciona correctamente.
- ProjectStatus funciona correctamente.

Si es necesario, crea o modifica las pruebas correspondientes dentro de:

app/tests/

Utiliza pytest.

Al finalizar el capítulo 3 debemos ejecutar las pruebas y verificar que todo funciona.

Después de verificarlo, debemos hacer:

git status

git add .

git commit -m "Add project Pydantic schemas"

git push origin develop

Pero antes de hacer commit explícame qué archivos vamos a subir y por qué.

NO continúes todavía con Activities.

==================================================
CAPÍTULO 4 — SCHEMAS PYDANTIC PARA ACTIVITIES
==================================================

Una vez terminado y validado completamente el capítulo 3, continuaremos con Activities.

El modelo Activity contiene:

- id UUID
- project_id UUID
- name
- BAC
- planned_progress
- actual_progress
- actual_cost
- created_at
- updated_at

Necesito implementar los schemas Pydantic necesarios.

Determina cuáles necesitamos, por ejemplo:

- ActivityCreate
- ActivityUpdate
- ActivityResponse
- ActivityListResponse
- ActivityEVMResponse

Explícame si alguno debe existir o si podemos evitarlo.

Los schemas deben validar:

- name obligatorio
- project_id UUID válido
- BAC >= 0
- planned_progress entre 0 y 100
- actual_progress entre 0 y 100
- actual_cost >= 0

IMPORTANTE:

Los indicadores EVM NO deben calcularse dentro de los schemas.

Los cálculos deben pertenecer posteriormente a una capa de servicios independiente.

Por ahora los schemas solamente deben encargarse de:

- validación
- serialización
- deserialización
- estructura de requests
- estructura de responses

Necesito que me expliques claramente por qué esta separación es importante.

Posteriormente debemos preparar el schema de respuesta que permitirá devolver los indicadores EVM junto con la información de la actividad cuando implementemos el servicio EVM.

Los indicadores que posteriormente tendremos serán:

PV
EV
AC
CV
SV
CPI
SPI
EAC
VAC

Pero NO implementes todavía la lógica de cálculo EVM en este capítulo.

==================================================
REGLAS DE DESARROLLO
==================================================

Quiero que trabajemos como si fueras mi mentor técnico durante la prueba de Trycore.

No quiero recibir todo el código de una sola vez.

Debes avanzar de forma incremental.

En cada paso debes indicarme:

- qué vamos a hacer
- por qué lo hacemos
- archivo que vamos a crear/modificar
- ubicación exacta
- código completo
- comando que debo ejecutar
- resultado esperado
- cómo verificarlo

No avances al siguiente paso hasta que yo te confirme el resultado.

Si detectas que alguno de mis archivos actuales necesita modificarse, primero explícame por qué.

No cambies innecesariamente la arquitectura que ya tenemos.

Debemos mantener separación entre:

API / routers
Schemas
Repositories
Services
Models
Database
Tests
Configuration

Los endpoints no deben contener lógica de negocio.

Los schemas no deben contener lógica EVM.

La lógica EVM se implementará posteriormente en services.

También quiero mantener buenas prácticas de código:

- Type hints
- UUID
- Pydantic moderno
- FastAPI
- SQLAlchemy 2.x
- código limpio
- nombres descriptivos
- evitar duplicación
- evitar valores mágicos
- evitar código innecesario

Al finalizar cada capítulo:

1. Ejecutamos las pruebas.
2. Verificamos que no haya errores.
3. Ejecutamos git status.
4. Revisamos los archivos modificados.
5. Hacemos commit descriptivo en inglés.
6. Hacemos push a develop.
7. Solo después continuamos con el siguiente capítulo.

## Prompt 4

> Quiero continuar el desarrollo del backend de mi prueba técnica de Trycore.

Necesito implementar estos capítulos:

CAPÍTULO 5 — Schemas Pydantic para EVM
CAPÍTULO 6 — Servicio de cálculo EVM
CAPÍTULO 7 — Pruebas unitarias del EVM Service

Quiero que trabajemos paso a paso y archivo por archivo.

En cada capítulo:
1. Explícame brevemente qué vamos a hacer.
2. Indícame qué archivo crear o modificar.
3. Dame el código completo.
4. Explícame dónde colocarlo.
5. Indícame el comando exacto para probarlo.
6. Verifica casos normales y casos borde como AC=0, PV=0 y EV=0.
7. No avances al siguiente capítulo hasta comprobar que el anterior funciona.

Mantén la arquitectura limpia: los endpoints no deben contener lógica de negocio y toda la lógica EVM debe estar en `services`.

Las fórmulas son:

PV = planned_progress × BAC
EV = actual_progress × BAC
CV = EV − AC
SV = EV − PV
CPI = EV / AC
SPI = EV / PV
EAC = BAC / CPI
VAC = BAC − EAC

También necesitamos interpretar CPI y SPI.

Al finalizar estos tres capítulos, quiero tener los schemas EVM, el `EVMService` funcionando y pruebas unitarias con mínimo 80% de cobertura de esta lógica.

Primero empieza únicamente con el CAPÍTULO 5.

## Prompt 5

> Implementa en mi backend actual los siguientes capítulos, respetando estrictamente la arquitectura, estructura de carpetas, modelos, schemas, servicios y patrones existentes:

1. CAPÍTULO 9 — Project CRUD API:
   - Crear, listar, consultar por ID, actualizar y eliminar proyectos.
   - Validaciones y manejo correcto de errores HTTP.
   - Mantener la lógica de negocio fuera de los routers.

2. CAPÍTULO 10 — Activity Service:
   - Crear el servicio de actividades.
   - Implementar la lógica de negocio para crear, consultar, actualizar y eliminar actividades.
   - Mantener separación entre router, service, schemas y repositorio/ORM.

3. CAPÍTULO 11 — Activity CRUD API:
   - Crear, listar, consultar por ID, actualizar y eliminar actividades asociadas a un proyecto.
   - Validar que el proyecto exista.
   - Manejar correctamente errores 404, 400 y 422 según corresponda.

No cambies innecesariamente la arquitectura existente ni rompas funcionalidades actuales. Reutiliza los modelos y componentes existentes. Mantén código limpio, tipado, testeable y consistente con FastAPI + SQLAlchemy + PostgreSQL. Agrega o actualiza las pruebas necesarias y verifica que todos los endpoints funcionen correctamente.

## Prompt 6

> Implementa en mi backend actual los capítulos 12, 13 y 14, respetando estrictamente la arquitectura y código existente con FastAPI, SQLAlchemy y PostgreSQL.

12. EVM API: crea los endpoints para consultar los indicadores EVM por actividad y de forma consolidada por proyecto, incluyendo PV, EV, CV, SV, CPI, SPI, EAC y VAC, junto con su interpretación.

13. Pruebas de integración: agrega pruebas para los endpoints principales, validando respuestas, códigos HTTP, datos y escenarios exitosos y de error.

14. Manejo de errores y validaciones: implementa validaciones de entrada, recursos inexistentes, datos inválidos, divisiones por cero y respuestas HTTP consistentes.

No cambies innecesariamente la arquitectura existente, reutiliza los servicios, schemas y modelos actuales, mantén la lógica de negocio fuera de los routers y asegúrate de que todas las pruebas existentes sigan pasando.

## Prompt 7

> Haz una auditoría final de mi backend como si fueras un revisor técnico de Trycore. Revisa arquitectura, EVM, CRUD, validaciones, errores, tests, cobertura, Swagger, calidad, seguridad y code smells. Comprueba que cumple todos los requisitos de la prueba técnica. Corrige únicamente problemas reales, no refactorices innecesariamente. Ejecuta todas las pruebas al finalizar y dame un resumen de hallazgos y correcciones.

---

# 20. Declaración sobre el uso de IA

La Inteligencia Artificial fue utilizada como herramienta de apoyo durante el desarrollo de esta prueba.

Las decisiones finales de implementación, arquitectura, validación y aceptación de los resultados fueron responsabilidad mía.

Antes de incorporar recomendaciones relacionadas con la lógica de negocio, realicé las validaciones correspondientes para comprobar que fueran coherentes con los requisitos del ejercicio.

El objetivo fue utilizar la Inteligencia Artificial para aumentar mi capacidad de aprendizaje y desarrollo, manteniendo comprensión y responsabilidad sobre la solución final.