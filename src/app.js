//este tipo de importacao funciona apenas pois foi adicionado o modulo sucrase
// senao teria que ser assim:
//const express = require("express");

import express from "express";
import routes from "./routes";

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

//este tipo de exportação funciona apenas pois foi adicionado o modulo sucrase
// senao teria que ser assim:
//module.exports = new App().server;
export default new App().server;
