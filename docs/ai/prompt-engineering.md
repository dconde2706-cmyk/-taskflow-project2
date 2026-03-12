Prompt Engineering aplicado al desarrollo

En este documento se recopilan distintos prompts utilizados para trabajar con asistentes de inteligencia artificial durante el desarrollo del proyecto.

Se analizan técnicas como:
- Definición de roles
- Few-shot prompting
- Razonamiento paso a paso
- Restricciones en la respuesta

También se explica por qué cada prompt produce mejores resultados.

Ingeniería de Prompts en TaskFlow.

En este documento se recogen diferentes experimentos utilizando técnicas de *prompt engineering* para mejorar la interacción con asistentes de inteligencia artificial durante el desarrollo del proyecto TaskFlow.

El objetivo es comprobar cómo diferentes formas de formular un prompt influyen en la calidad del código generado, las explicaciones y las propuestas de mejora.


Registro de Prompts

1. Definir un rol

Prompt
Actúa como un desarrollador senior de JavaScript con experiencia en aplicaciones frontend. Analiza la siguiente función y propón una versión más limpia y mantenible.

Por qué funciona bien
Poruque al asignar un rol específico hace que la IA adapte el nivel técnico de la respuesta y proporcione soluciones más profesionales.


2. Solicitar refactorización

Prompt
Refactoriza esta función JavaScript para que sea más legible. Evita repetir código y utiliza nombres de variables más claros.

Por qué funciona bien
El prompt da instrucciones claras sobre el objetivo de la mejora.



3. Generar código desde una descripción

Prompt
Crea una función en JavaScript que filtre una lista de tareas y devuelva solo las que estén completadas.

Por qué funciona bien
Porque es un prompt directo que describe claramente la funcionalidad deseada.


4. Few-shot prompting (con ejemplos)

Prompt
Ejemplo 1  
Input: [1,2,3]  
Output: 6

Ejemplo 2  
Input: [4,5]  
Output: 9

Ahora crea una función en JavaScript que sume todos los números de un array.

Por qué funciona bien
Poruque al dar ejemplos ayuda al modelo a entender exactamente el comportamiento esperado.


5. Pedir razonamiento paso a paso

Prompt
Analiza paso a paso qué hace esta función y explica si contiene algún bug.

Por qué funciona bien
Obliga a la IA a razonar antes de responder, lo que reduce errores.


6. Añadir restricciones

Prompt
Escribe una función JavaScript que ordene tareas por fecha.  
Restricciones:
- No usar librerías externas
- Debe funcionar con arrays grandes
- Usa funciones modernas de JavaScript

Por qué funciona bien
Grcias a las restricciones que ayudan a controlar el tipo de solución generada.


7. Generar documentación

Prompt
Genera comentarios JSDoc para la siguiente función JavaScript.

Por qué funciona bien
Porque permite documentar el código de forma rápida y consistente.


8. Detectar errores

Prompt
Encuentra posibles errores en este código y explica por qué ocurren.

Por qué funciona bien
La IA analiza el código y explica problemas de lógica.


9. Mejorar nombres de variables

Prompt
Sugiere nombres de variables más claros para este código.

Por qué funciona bien
Porque ayuda a mejorar la legibilidad del proyecto.


10. Generar tests

Prompt
Escribe tests simples en JavaScript para comprobar que esta función funciona correctamente.

Por qué funciona bien
Porque permite añadir pruebas básicas rápidamente.
