const express = require('express');
require('express-async-errors');
const swaggerUi = require('swagger-ui-express');
const routes = require('./routes');
const errorMiddleware = require('./middlewares/errorMiddleware');
const doc = require('./swagger.json');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', routes.productsRouter);
app.use('/sales', routes.salesRouter);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(doc));

app.use(errorMiddleware);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;