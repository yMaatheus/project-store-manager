const express = require('express');
const rescue = require('express-rescue');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const routes = require('./routers');
const errorMiddleware = require('./middlewares/errorMiddleware');

app.use('/products', rescue(routes.productsRouter));
app.use(errorMiddleware);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;