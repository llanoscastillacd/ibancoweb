# Configuracion del Proyecto IBAN-WEB

## Creacion del Proyecto en Angular con Angular Material
* Referecia: https://angular.io/cli


### Actualizar la version de nodejs
```zsh
brew install node@14
Agregar export PATH="/usr/local/opt/node@14/bin:$PATH" al .zshrc
```

###  Actualizar Angular a la version 11
```
npm install -g @angular/cli
ng --version
```

```
Angular CLI: 11.2.4
Node: 14.16.0
OS: darwin x64
```

### Crear el proyecto por soporte para Ruting y SCSS
```
ng new iban-web --routing --style=scss
```
```
Do you want to enforce stricter type checking: Yes

```

### Agregar Angular Material
* Referencia: https://material.angular.io/guide/getting-started
* https://material.angular.io/guide/typography
* https://angular.io/guide/animations
```
ng add @angular/material
```
```
? Choose a prebuilt theme name, or "custom" for a custom theme: Indigo/Pink        [ Preview: https://material.angular.io?
theme=indigo-pink ]
? Set up global Angular Material typography styles? Yes
? Set up browser animations for Angular Material? Yes

```