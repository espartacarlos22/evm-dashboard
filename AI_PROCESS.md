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

> [Colocar aquí el prompt utilizado realmente]

## Prompt 2

> [Colocar aquí el prompt utilizado realmente]

## Prompt 3

> [Colocar aquí el prompt utilizado realmente]

## Prompt 4

> [Colocar aquí el prompt utilizado realmente]

## Prompt 5

> [Colocar aquí el prompt utilizado realmente]

## Prompt 6

> [Colocar aquí el prompt utilizado realmente]

## Prompt 7

> [Colocar aquí el prompt utilizado realmente]

---

# 20. Declaración sobre el uso de IA

La Inteligencia Artificial fue utilizada como herramienta de apoyo durante el desarrollo de esta prueba.

Las decisiones finales de implementación, arquitectura, validación y aceptación de los resultados fueron responsabilidad mía.

Antes de incorporar recomendaciones relacionadas con la lógica de negocio, realicé las validaciones correspondientes para comprobar que fueran coherentes con los requisitos del ejercicio.

El objetivo fue utilizar la Inteligencia Artificial para aumentar mi capacidad de aprendizaje y desarrollo, manteniendo comprensión y responsabilidad sobre la solución final.