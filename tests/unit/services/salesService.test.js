const { expect } = require('chai');
const sinon = require('sinon');

const { salesService } = require('../../../services');
const { salesModel, productsModel } = require('../../../models');

describe('services/salesService', () => {
  afterEach(sinon.restore);

  describe('create', () => {
    it('Se não passar nenhum produto retorna null', async () => {
      const sale = await salesService.create();

      expect(sale).to.deep.equal(null);
    });

    it('Se um produto não existir retorna null', async () => {
      sinon.stub(Promise, 'all').resolves([[]]);
      const products = [
        { productId: 1, quantity: 1 },
        { productId: 50, quantity: 5 }
      ]
      const sale = await salesService.create(products);

      expect(sale).to.deep.equal(null);
    });

    it('Se produtos estiver correto retorna o id da venda e uam lista de itens vendidos', async () => {
      sinon.stub(salesModel, 'create').resolves(1);
      sinon.stub(Promise, 'all').resolves([{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }]);

      const products = [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 5 }
      ]
      const sale = await salesService.create(products);

      expect(sale).to.deep.equal({ id: 1, itemsSold: [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }] });
    });
  });
});