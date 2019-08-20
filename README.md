# goBarber

**Módulo Sucrase**
Utilizado o Sucrase para usar a Importacao e Exportacao dos modulos no node com as
versões mais atuais do Java Script

- `yarn sucrase-node src/server.js`: Rodar app com o sucrase;

**Módulo Nodemon**
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

**Instação Sequelize - Comandos.**

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
  config: resolve(__dirname,'src','config','database.js'),
  'models_path': resolve(__dirname,'src','app','models'),
  'migrations_path': resolve(__dirname,'src','database','migrations'),
  'seeders_path': resolve(__dirname,'src','database','seeds'),
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

- `npx sequelize init`: Criação da estrutura do Sequelize na estrutura do projeto;

4 - Pegar a pasta **Config** que ele criou e arrastar para dentro da pasta **Src**;

2- Dentro da pasta **Src** criar uma pasta chamada **Database** e arrastar as pastas **Migrations** e **Seeders**;

3- Arrastar a pasta **Models** para dentro da pasta **Src/App**;

4- Alterar o nome do arquivo **src/config/config.json** para **src/config/database.js**;



6- Testar se esta funcionando o código acima criando uma migration com o seguinte código: `npx sequelize migration:create --name=create-users` .
Deverá ser criado uma migration no caminho: **src/database/migrations**;

7- Fazer uma alteração no arquivo **src/config/database.js**

```javascript
module.exports = {
  dialect: "postgress",
  host: "127.0.0,1",
  username: "docker",
  password: "docker",
  database: "gonodemodulo2",
  operatorAliases: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};
```

7- Rodar o comando : `yarn add pf`. Este é para usar o dialeto Postgress;

8- Abrir o arquivo **src/app/models/index.js** e alterar a linha 7 para o sequinte código:

```javascript
const config = require("../../config/database");
```

9- Alterar da linha 10 até a 15 para o sequinte código:

```javascript
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
```
