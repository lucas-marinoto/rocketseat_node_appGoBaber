import Sequelize, { Model } from 'sequelize';

class Appointment extends Model {
  static init(sequelize) {
    // chamando o método init da classe Model
    super.init(
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  // cria o relacionamento da tabela Users e File. Pega o ID do File para inserir dentro do avatar_id de User
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}

export default Appointment;
