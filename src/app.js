// este tipo de importacao funciona apenas pois foi adicionado o modulo sucrase
// senao teria que ser assim:
// const express = require("express");

import express from 'express';
import path from 'path';
import routes from './routes';
import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());

    // informa ao express que a rota files são de arquivos estáticos
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

// este tipo de exportação funciona apenas pois foi adicionado o modulo sucrase
// senao teria que ser assim:
// module.exports = new App().server;
export default new App().server;
