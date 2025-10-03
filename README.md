## Participantes del proyecto
   - Julian Dentezano
-  Franco Panzone
-  Jeremias Atala
-  Manuel Axel Rozas Soria
## tema: Sistema web de gestion de destinos turisticos

## Descripción del Proyecto: 

Este proyecto tiene como objetivo desarrollar una página web turística dedicada a promover las actividades turísticas en Argentina. La plataforma permitirá a los usuarios explorar experiencias y atractivos en todo el país, con la posibilidad de filtrar por provincia, localidad y tipo de actividad. Además, podrán ordenar los resultados según criterios como precio, descuentos y otras combinaciones personalizadas. La página será visualmente atractiva, intuitiva y compatible con todo tipo de dispositivos, promoviendo el turismo local y sostenible en diversas regiones argentinas.

## Tecnologías y Arquitectura del Proyecto:

- Lenguaje principal: TypeScript (TS)
- Base de datos: PostgreSQL
- Arquitectura: Modelo Vista Controlador (MVC) con una capa adicional de servicios para separar la lógica de negocio
- Servidor de imágenes: Cloudinary (para almacenamiento y gestión de imágenes en la nube)
- Testing:
1) Pruebas unitarias de las funciones principales
2) Cobertura de pruebas para operaciones CRUD
3) Al menos 3 a 4 tests por cada función clave del sistema

Esta estructura busca asegurar un desarrollo limpio, escalable y mantenible, con énfasis en la calidad del código y la correcta separación de responsabilidades.

## patrones de diseño utilizados

Para garantizar un diseño de software robusto, escalable y mantenible, se implementarán diversos patrones de diseño que permiten separar responsabilidades, facilitar la reutilización de código y mejorar la testeabilidad del sistema. A continuación, se detallan los principales patrones que se aplicarán:

- Builder Pattern

Aplicación: Creación de actividades turísticas
Este patrón es ideal para la creación de objetos complejos paso a paso, como las actividades turísticas, que pueden tener múltiples propiedades opcionales (descripción, ubicación, imágenes, precio, descuentos, etc.). 

Permite construir instancias de manera flexible y clara, evitando constructores con demasiados parámetros.

- Singleton Pattern

Aplicación: Conexión a la base de datos PostgreSQL

Se utilizará este patrón para garantizar que exista una única instancia de la conexión a la base de datos durante toda la ejecución del servidor. 

Esto mejora el rendimiento, evita múltiples conexiones innecesarias y asegura consistencia en las operaciones de acceso a datos.

- Observer Pattern
 
se usaria devido a que:
si hay alguna modificación (ej : descuento), todos los clientes suscritos a esa actividad se le mandarian la notificacion correspondiente.

Tabla suscripción => 
	Id_cliente
	Id_actividad (Publisher retiene la información de quien esta suscripto)

Este sería innecesario
Aplicación: Comentarios y reseñas en tiempo real (WebSockets con Socket.IO)

Cuando un usuario publica una nueva reseña o comentario sobre una actividad, otros usuarios que estén visualizando esa sección deben recibir esta actualización sin necesidad de recargar la página. 

El patrón Observer se adapta perfectamente a este escenario, ya que permite que los "observadores" (clientes) se suscriban a eventos y sean notificados automáticamente de los cambios.

Tecnología utilizada: Socket.IO en Node.js para implementar comunicación bidireccional y eventos en tiempo real de forma eficiente.

- Strategy Pattern

Aplicación: Ordenamiento flexible de actividades

El sistema permitirá a los usuarios ordenar actividades según diferentes criterios:
1) Por popularidad (mas suscriptores? O podemos seguir teniendo la calificación en el comentario)
2) Por precio (ascendente/descendente)
3) Por puntuación
4) Por cercanía geográfica

Implementar estas variantes como estrategias intercambiables permite cambiar el criterio de ordenamiento dinámicamente sin modificar el código base del motor de búsqueda.

Beneficio: Mejora la extensibilidad, ya que se pueden agregar nuevos criterios de orden en el futuro sin alterar la lógica existente.




