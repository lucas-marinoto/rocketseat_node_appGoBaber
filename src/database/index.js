import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/User';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // conexao usada como parametro no arquivo app/models/User.Js  static init(sequelize) do metodo init
    this.connection = new Sequelize(databaseConfig);
    // varre as conexões que temos do Array de models para conectar no banco
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
