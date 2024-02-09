# EMI-UI
_Equated Monthly Installment calculator Frontend_

## Description
API that takes a request with loan value, interest rate and loan term and calculates the equated monthly installment

This application is designed to run with EMI-API, you can run it locally by following the steps in [Run](#run)

---

# Local Development


## Technology Stack
- [Angular CLI v17.1.2](https://github.com/angular/angular-cli)
- [Node: 21.6.1](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [npm 10.2.4](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)


## Build
To build the project. 
```shell
$ ng build
```
The build artifacts will be stored in the `dist/` directory.

## Test
To execute the unit tests via [Karma](https://karma-runner.github.io).
```shell
$ ng test
```

## Run
Run a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
```shell
$ ng serve
```

## Deploy
You can build a docker image and run it locally by using the following
```shell
# builds the image
$ docker build -t emi-ui .

# runs it locally in port 4200
$ docker run -d -p 4200:80 emi-ui:latest
```

---

# Authors
- [Gerardo Cortes](mailto:mail@gerardocortes.com?subject=You%20are%20hired)
