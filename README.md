# goBarber

**Extensão Sucrase**
Utilizado o Sucrase para usar a Importacao e Exportacao dos modulos no node com as
versões mais atuais do Java Script

- `yarn sucrase-node src/server.js`: Rodar app com o sucrase;

**Extensão Nodemon**
Utilizado o Nodemon para não precisar ficar parando e rodando o script novamente em caso
de alteração no código
É necessário incluir uma linha de código no package.json informando qual o script ira rodar

```json
"scripts": {
    "dev": "nodemon src/server.js"
  },
```

Após isto criar um arquivo na raiz do projeto chamado **nodemon.json** e incluir o código:

```json
{
  "execMap": {
    "js": "sucrase-node"
  }
}
```

Para executar agora o projeto:

- `yarn dev`

**Instalação Sequelize - Comandos.**

## Comandos Sequelize

**Instalação Sequelize - Comandos.**

- `yarn add sequelize`: Adicionar Dependência do Sequelize;
- `yarn add sequelize-cli -D`: Adicionar linha de comando do Sequelize;

1 - Criar a seguinte estrutura de pastas e arquivos:
  **src/app/controllers**
  **src/app/models**
  **src/config**
  **src/config/database.js**
  **src/database**
  **src/databas/migrations**

2 - Criar um arquivo na raiz do projeto chamada **.sequelizerc** com os códigos abaixo:

```javascript
const {resolve} = require('path');
//caminho dos arquivos de configuracoes do sequelize de acordo com as pastas acima
module.exports = {
  config: resolve(__dirname, 'src', 'config', 'database.js'),
  'models-path': resolve(__dirname, 'src', 'app', 'models'),
  'migrations-path': resolve(__dirname, 'src', 'database', 'migrations'),
  'seeders-path': resolve(__dirname, 'src', 'database', 'seeds'),
};
```
3 - adicionar as dependências abaixo para o Postgres
- `yarn add pg pg-hstore`

4 - Fazer uma alteração no arquivo **src/config/database.js**

```javascript
module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'admin',
  database: 'gobarber',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
```
5- Criar a primeira migration de usuários, onde name é o nome da migration:
- `yarn sequelize migration:create --name=create-users`

- Exemplo de migration de Users:
```javascript
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      provider: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('users');
  },
};
```

6 - Após criar a migration de usuários, usar o comando abaixo para criar de fato no banco a tabela:
- `yarn sequelize db:migrate`: cria a migration
- `yarn sequelize db:migrate:undo:all`: desfaz todas as migrations criadas localmente
- `yarn sequelize db:migrate:undo`: desfaz a última migration criada localmente

------------------------------

**Extensão BCriptyjs**
Utilizado para gerar o hash da senha. No exemplo será usado no Model de Usuário a dependência

- `yarn add bcryptjs`

------------------------------

**Extensão JWT**
Utilizado para gerar o tken JWT nas sessões

- `yarn add jsonwebtoken`

------------------------------

**Extensão YUP**
Utilizado para fazer validações de campo. Ex.: Se um email esta preenchido, se a senha tem 6 digitos, etc...

- `yarn add yup`

------------------------------

**Extensão Multer**
Utilizado para lidar com MultiPart Form Data, que é o formato que o Json aceita para envio da foto fisica

- `yarn add multer`
