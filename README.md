# COURSITE

Coursite es una aplicación web de aprendizaje en línea en donde los alumnos pueden encontrar distintos cursos que los profesores publican, la aplicación fue desarrollada como proyecto escolar con el propósito de comprender la adminsitración de sistemas de información.

Para el desarrollo de esta aplicación se nos planteó el realizar entrevistas con un "cliente" para determinar sus necesidades y en base a estas comenzar a análizar, planear, diseñar el producto y finalmente desarrollarlo.

![image](https://user-images.githubusercontent.com/84252964/169588180-0712bb69-3b3b-41c8-bacd-4fe8be95f1c1.png)


# Descripción general


## Acciones de los usuarios
La aplicación consta de cuatro tipos de usuarios, sin sesión, estudiante, profesor y administrador. Estos usuarios pueden realizar distintas acciones.
- Usuario sin sesión
  - Registrarse como profesor o alumno
  - Ver los cursos disponibles y sus detalles.
- Estudiante
  - Iniciar sesión.
  - Editar la información de su perfil.
  - Ver los cursos disponibles y sus detalles.
  - Comprar cursos.
  - Acceder a la información de su curso comprado.
  - Ver el progreso de sus cursos.
  - Obtener el certificado de sus cursos terminados.
  - Ver sus notificaciones.
  - Calificar un curso.
- Profesor
  - Iniciar sesión.
  - Editar la información de su perfil.
  - Subir un curso.
  - Editar un curso.
  - Eliminar un curso.
  - Ver sus cursos solicitados.
  - Ver sus notificaciones.
  - Subir sus documentos.
- Administrador
  - Iniciar sesión
  - Aprobar o rechazar solicitudes de registro de profesores.
  - Aprobar o rechazar solicitudes de publicación de curso.
  - Ver todos los cursos.
  - Ver los documentos de los profesores.
  - Agregar categorías


## Funcionamiento

### Frontend
El Frontend esta hecho con React JS, Redux, Sweet Alert 2 y SCSS.
Su funcionamiento se basa en un filtro de vistas basado en el rol del usuario, por ejemplo. Si se detecta una sesión, se obtendrá el rol y si el rol es de alumno, solo permitirá acceder a las vistas del alumno.
Desde aquí se hacen peticiones a una API REST desplegada en Heroku y a servicios de Firebase como su base de datos llamada Firestore y a su servicio de Storage para almacenar archivos.

Para el manejo del storage se usó Redux, basando su funcionamiento en los roles de los usuarios, por ejemplo las acciones del alumno, contiene solo las peticiones a la api que solo el usuario de tipo alumno puede realizar.

El uso de Sweet Alert 2 fue implementado solamente para mostrar avisos y confirmaciones de acciones delicadas.

Los estilos fueron realizados con SCSS, esto con el propósito de tener los estilos lo más organizados posibles, basandose en los componentes y vistas de React.

### Backend
El Backend fue realizado con Spring Boot, Spring Security y Java-JWT.
Esta API realiza una conexión a una base de datos de MySQL, creando las tablas si es que no existen, esto con ayuda de JPA, Hibernate y las entidades definidas en las clases el paquete "entity". 
Los endpoints de la API están protegidos por una autenticación basada en tokens (JWT). Esta autenticación tiene además una autorización basada en los roles de los usuarios. Además al cambiar el status de los profesores la API envía un correo al profesor para avisarle de la situación de su solicitud.

### Base de datos
Se diseñó la siguiente base de datos en base a las reglas de negocio del cliente, nos quedaron las siguientes relaciones, donde el usuario en base a su rol tendrá distintas relaciones, por ejemplo.
El curso se relacionará a un usuario que tenga el rol de tipo profesor, pues este estaría creando el curso, por otra parte las relaciones de las tablas "course_user" y "course_lesson_user" se formarán cuando el rol del usuario sea de estudiante, pues estaría comprando un curso. Por otra part, sólo el administrador podría cambiar el status de los usuarios de tipo profesor y además agregar más categorías a la plataforma.

![image](https://user-images.githubusercontent.com/84252964/169596430-80a986a2-cdb0-40f7-a8a7-68b64a939495.png)


# Manual de Estudiante

## Registro
Hacer click en el botón "Registrarse"
![image](https://user-images.githubusercontent.com/84252964/169598499-d220528b-a6a6-44b2-846c-a73ceefcd9a7.png)

Se mostrará la siguiente vista:
![image](https://user-images.githubusercontent.com/84252964/169598608-c692e36e-add5-447d-bccb-9e977baa47a6.png)

Llenar el formulario y hacer click en "Registrarse", una vez hecho esto se mostrará la siguiente vista:
![image](https://user-images.githubusercontent.com/84252964/169598768-c687801b-1e5a-4125-8322-eca3b00cc7ad.png)

## Ver detalles
Hacer click en el botón "Detalles", se mostrará una vista como la siguiente pero con la información del curso seleccionado:
![image](https://user-images.githubusercontent.com/84252964/169599113-d2520a7c-3f5b-4cf7-8c55-ef56e2a2d06e.png)

## Inscribirse
Estar en la vista "Detalles" o en la vista "Cursos" y hacer click en el botón "Inscribirse", se mostrará la siguiente vista:
![image](https://user-images.githubusercontent.com/84252964/169599215-a6a80461-e719-495e-837b-1e46a28ce43d.png)

Llenar el formulario y hacer click en "Realizar pago", si la compra es exitosa mostrará la siguiente vista:
![image](https://user-images.githubusercontent.com/84252964/169599347-ffd0238d-980c-4473-8e6c-1cada64fd6ab.png)

## Ver curso comprado
Estar en la vista "Mi aprendizaje" o "Cursos" y hacer click en el botón "Ir al curso" del curso de interés.
![image](https://user-images.githubusercontent.com/84252964/169599998-eb2063c5-f84a-49f9-99ae-24a2f2221717.png)

Estando en esta vista, podrá calificar el curso, haciendo click en "Calificar":
![image](https://user-images.githubusercontent.com/84252964/169600054-bbca57d6-ee86-4271-9239-1358b3d9d3c5.png)

Ver la información de contacto con el profesor, haciendo click en "Contacto":
![image](https://user-images.githubusercontent.com/84252964/169600113-02b6846a-12d9-4021-965e-8f9a38e0c0c6.png)

## Modificar perfil del usuario
### Cambiar foto
Hacer click en el botón de la foto de perfil:
![image](https://user-images.githubusercontent.com/84252964/169600259-a07dc967-be62-46ad-8c80-4a61b3017f7a.png)
Se mostrará la siguiente ventana:
![image](https://user-images.githubusercontent.com/84252964/169600302-35323864-7204-44b2-84eb-f8b4e722ef90.png)
Se selecciona la imágen:
![image](https://user-images.githubusercontent.com/84252964/169600340-7a447884-69c1-4db2-b4d6-418fdf7c8d5c.png)
Se da click en "subir":
![image](https://user-images.githubusercontent.com/84252964/169600395-29a081b2-c39e-494d-b139-ea90252a3b79.png)
Una vez cambiada la imágen se mostrará el siguiente aviso:
![image](https://user-images.githubusercontent.com/84252964/169604272-2f89e943-6cf5-4a35-a8ee-f54fed663823.png)

### Cambiar datos
Hacer click en el botón "Editar" del campo a modificar:
![image](https://user-images.githubusercontent.com/84252964/169607248-5d04cf11-7715-4b83-a575-d56ac8dd0da0.png)
Modificar el dato o los datos:
![image](https://user-images.githubusercontent.com/84252964/169607291-f9cba239-92cc-4e9b-a97c-47b6d6708e1c.png)
Hacer click en "Actualizar datos" y se mostrará lo siguiente:
![image](https://user-images.githubusercontent.com/84252964/169607690-7f1518ec-b0a0-4513-8c83-40e90456b02f.png)
Si se cambia el correo, mostrará el siguiente aviso:
![image](https://user-images.githubusercontent.com/84252964/169607769-f9fa96ad-c54d-4193-9225-88c91b9e1b0b.png)
Y se cerrará la sesión.

### Cambiar contraseña
Hacer click en el botón "Actualizar contraseña":
![image](https://user-images.githubusercontent.com/84252964/169607972-cf7b5815-fc44-4859-8c00-1d0d437191e3.png)
Ingresar la contraseña actual, la nueva contraseña y hacer click en el botón "Guardar":
![image](https://user-images.githubusercontent.com/84252964/169608054-df218e98-23dd-468c-b5f7-077326043f27.png)

### Eliminar cuenta
Hacer click en el botón "Eliminar cuenta":
![image](https://user-images.githubusercontent.com/84252964/169608214-64e942c1-8b62-4216-8f0e-b40e67f08196.png)
Hacer click en el botón "Eliminar cuenta" x2, se cerrará la sesión y la cuenta quedará eliminada.

## Obtener certificado
Deben haberse visto todas las lecciones del curso, se mostraría algo así:
![image](https://user-images.githubusercontent.com/84252964/169608593-46bff9a1-76c6-49f5-8058-4589d47482cf.png)
Despues deberá ir a la vista "Mi aprendizaje" en la sección de "Certificados":
![image](https://user-images.githubusercontent.com/84252964/169608699-4ed67922-deeb-43e2-b5a3-ea7c96a3c2c5.png)
Una vez aquí se puede descargar directamente o verlo en web haciendo click en "Certificado"
![image](https://user-images.githubusercontent.com/84252964/169608786-9f44d723-7938-4eec-ad57-00199dccb655.png)


# Manual de Profesor

## Registro
Hacer click en el link "¿Quieres enseñar?"
![image](https://user-images.githubusercontent.com/84252964/169608921-7cd4aef1-a5a0-47d3-8949-9ab39498e9a4.png)

Se mostrará la siguiente vista:
![image](https://user-images.githubusercontent.com/84252964/169608937-471a9eca-7af4-4311-8018-5fcbc9c826b5.png)

Llenar el formulario y hacer click en "Registrarse", una vez hecho esto se mostrará la siguiente vista:
![image](https://user-images.githubusercontent.com/84252964/169608990-269cf57c-100d-44b1-83fa-6abbc003cde6.png)

En esta parte el profesor deberá subir documentos que acrediten que es capaz de impartir algún curso.
![image](https://user-images.githubusercontent.com/84252964/169609139-c0eb7611-8d26-4793-8218-bf05b6c8659a.png)

Después se dará click en "Subir" y al subirse el archivo se mostrará la siguiente vista, debe esperara a que un administrador apruebe su solicitud.
![image](https://user-images.githubusercontent.com/84252964/169609192-212fb14f-6472-4b79-a6ae-d6c2c0a785b5.png)

Una vez aprobada o rechazada, recibirá un correo electrónico como el siguiente:
![image](https://user-images.githubusercontent.com/84252964/169609574-84cd3169-008d-4047-b1ca-cf162ed5517a.png)

## Solicitar curso
Estar en la vista "Mis Cursos" y hacer click en el botón "Nuevo Curso":
![image](https://user-images.githubusercontent.com/84252964/169610263-a9d32033-5383-48d0-b290-e510f3720576.png)

Llenar el siguiente formulario:
![image](https://user-images.githubusercontent.com/84252964/169610297-be067fe7-ce0b-4fb6-a0ac-99a53e59a5fe.png)
![image](https://user-images.githubusercontent.com/84252964/169610401-79af9b57-09a6-465c-a7ad-f73cc0ee7c7f.png)
Una vez llenado el formulario, antes de hacer click en "Guardar" se deben agregar unidades y lecciones.
Al hacer click en "Agregar unidad" se mostrará lo siguiente:
![image](https://user-images.githubusercontent.com/84252964/169610473-1c8c954b-b90e-4530-8017-bde421dc1bce.png)
Se llena el formulario:
![image](https://user-images.githubusercontent.com/84252964/169610550-1823a6ad-504e-4084-8d28-43a8b3616052.png)
Se da click en "Agregar unidad" y se mostrará lo siguiente:
![image](https://user-images.githubusercontent.com/84252964/169610609-0adb2cf2-812d-4100-ba1a-f235be920b80.png)
Todas las unidades deben tener al menos una lección, por lo tanto se hará click en el botón verde de agregar:
![image](https://user-images.githubusercontent.com/84252964/169610664-6a1e5924-6966-415c-b745-e974f749c4e3.png)
Se llena el formulario:
![image](https://user-images.githubusercontent.com/84252964/169610738-82ff5b12-4ef3-46f2-ac8a-3985a09338c9.png)
Y se da click en "Agregar lección":
![image](https://user-images.githubusercontent.com/84252964/169610780-e0106932-e167-49ac-aab8-55a07a42a491.png)
Después se da click en "Guardar" y se mostrará el siguiente aviso:
![image](https://user-images.githubusercontent.com/84252964/169615685-2e310f89-1000-4bec-a412-eef8aef589b0.png)
Y en la lista de cursos se mostrará el curso agregado:
![image](https://user-images.githubusercontent.com/84252964/169615715-10c5cf58-28ae-4764-b9a6-71db568c7e86.png)
