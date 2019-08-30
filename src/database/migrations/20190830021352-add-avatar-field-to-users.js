module.exports = {
  up: (queryInterface, Sequelize) => {
    // adicionando coluna em uma tabela do banco ja criada
    return queryInterface.addColumn(
      // nome da tabela
      'users',
      // nome da coluna
      'avatar_id',
      {
        type: Sequelize.INTEGER,
        // cria o relacionamento entre a tabela users com a tabela files com a PK sendo o id da files
        references: { model: 'files', key: 'id' },
        // se houver uma alteração em usuário, altera tambem na files o arquivo
        onUpdate: 'CASCADE',
        // se por algum motivo for apagado a imagem no banco, seta nulo o avatar na Users
        onDelete: 'SET NULL',
        allowNull: true,
      }
    );
  },

  down: queryInterface => {
    return queryInterface.removeCollumn('users', 'avatar_id');
  },
};
