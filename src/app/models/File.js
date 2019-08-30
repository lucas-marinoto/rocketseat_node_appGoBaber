import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    // chamando o método init da classe Model
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default File;
