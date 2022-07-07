const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../database/connection');
const { salesModel } = require('../../../models');

describe('models/salesModel', () => {
  afterEach(sinon.restore);
  describe('create', () => {
    it('Retorna o id da venda', async () => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);

      const id = await salesModel.create();

      expect(id).to.equal(1);
    });
  });

  describe('addProductToSale', () => {
    it('Retorna um objeto com o produto e quantidade', async () => {
      sinon.stub(connection, 'execute').resolves();

      const saleId = 1;
      const productId = 2;
      const productQuantity = 3;

      const product = await salesModel.addProductToSale(saleId, productId, productQuantity);

      expect(product).to.deep.equal({ productId: 2, quantity: 3 });
    });
  });
});