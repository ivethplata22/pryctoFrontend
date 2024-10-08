# FRONTEND ANGULAR

## Versión de Node

    v20.12.0

## Versión NPM

    10.5.0

## Versión Angular CLI

    17.3.2

## Notas de instalación

La carpeta node_modules se puede borrar y para volver a instalar las dependencias usar el siguiente comando en la raíz del proyecto:

    npm install

## Iniciar Frontend

Posicionarse en la raiz del proyecto y ejecutar:

    npm start

## Distribución de carpetas

### .angular

Ayuda a Angular a ejecutar rápidamente y detectar cuando hay un cambio al desarrollar.

### .vscode

Documento que guarda configuraciones del editor de código para sugerir extensiones a otros programadores que les puedan ayudar en el proyecto.

### node_modules

Configuraciones y módulos de las dependencias del proyecto.

### src

Raíz del inicio del proyecto.

    1. app - Modulos, componentes y enrutamientos.
    2. assets - Recursos estáticos.
    3. environments - Variables de entorno.
    4. favicon.cion - Icono de la aplicación.
    5. index.html - Archivo html donde inicia la aplicación.
    6. main.ts - Ejecución inicial de la aplicación.
    7. style.css - Estilos generales de la aplicación.

## Archivos

Configuración por defecto del editor de código.

    .editorconfig

Archivos ignorados para almacenar en repositorio.

    .gitignore

Configuraciones de Angular para la ejecución de la aplicación.

    angular.json

Packages donde se almacenan las dependencias y sus versiones en el proyecto.

    package-lock.json
    package.json

Archivos con configuraciones generales para Typescript

    tsconfig.app.json
    tsconfig.json
    tsconfig.spec.json