import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    // chamando o método init da classe Model
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }
}

export default User;
