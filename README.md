# 📱 Projeto

O projeto é uma API construida utilizando a arquitetura MSC (model-service-controller), a qual, consiste em um sistema de gerenciamento de vendas no formato dropshipping em que será possível criar, visualizar, deletar e atualizar produtos e vendas.

* [Documentação](https://store-manager.ymaatheus.me/api-docs)
* [Deploy](https://store-manager.ymaatheus.me/)

### 📋 Pré-requisitos

Para conseguir seguir este README e rodar o projeto você pode precisar dos seguintes itens:

- [Git](https://git-scm.com/doc)
- [Node](https://nodejs.org/en/)
- [Npm](https://docs.npmjs.com/getting-started)
- [MySQL](https://www.mysql.com/)

## 🚀 Começando

Para ter acesso aos arquivos do projeto você pode clonar usando o seguinte comando:

```
git clone git@github.com:yMaatheus/store-manager.git
```

### 🔧 Instalação

Agora que já tem a pasta do projeto na sua máquina, dentro dela instale as dependências:

```
npm install
```

Crie o arquivo `.env` e adicione as variaveis de ambiente, siga o exemplo abaixo:

```
MYSQL_HOST=localhost
MYSQL_DATABASE=StoreManager
MYSQL_USER=root
MYSQL_PASSWORD=password
```

Crie as tabelas e popule o banco de dados MySQL:

```
npm run migration
npm run seed
```

Então podemos rodar o projeto:

```
npm start
```

## 🛠️ Construído com

* [Npm](https://docs.npmjs.com/getting-started) - Gerente de dependências
* [Express](http://www.dropwizard.io/1.0.2/docs/) - O framework
* [Javscript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) - Linguagem de programação
* [Mysql2](https://www.npmjs.com/package/mysql2) - Biblioteca responsável por gerenciar a conexão com o banco de dados MySQL
* [Joi](https://www.npmjs.com/package/joi) - Biblioteca de validação
* [Mocha](https://www.npmjs.com/package/mocha) - Framework de testes
* [Chai](https://www.npmjs.com/package/chai) - Biblioteca de testes
* [Sinon](https://www.npmjs.com/package/sinon) - Biblioteca de testes para uso de spies, stubs e mocks
* [Swagger](https://www.npmjs.com/package/swagger-ui-express) - Ferramenta de documentação
