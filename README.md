# Como iniciar la aplicación
1.	Descargar el repositorio o clonarlo
2.	Se recomienda abrir la carpeta del proyecto con Visual Studio Code (VSC)
3.	Tener instalado JSON-SERVER 

## Si no lo tiene JSON-SERVER previamente puede ejecutar el siguiente comando en la terminal.
    npm install -g json-server

# En la terminal de comandos de VSC ejecutar los siguientes comandos
    npm install
Con esto iniciara la descarga de todas las dependencias necesarias para ejecutar la aplicación.

    json-server --watch db.json
Esto iniciara el servidor del Backend.

    ng serve -o   
Este comando permitirá compilar la aplicación una vez termine se abrirá automáticamente en el navegador por defecto.