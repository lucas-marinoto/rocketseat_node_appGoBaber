import Sequelize from 'sequelize';
import mongoose, { Mongoose } from 'mongoose';

import databaseConfig from '../config/database';
import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    // conexao usada como parametro no arquivo app/models/User.Js  static init(sequelize) do metodo init
    this.connection = new Sequelize(databaseConfig);
    // varre as conexões que temos do Array de models para conectar no banco
    models
      .map(model => model.init(this.connection))
      // verifica se tem o relacionamento , se tiver ai associa
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/gobarber',
      { useNewUrlParser: true, useFindAndModify: true }
    );
  }
}

export default new Database();
