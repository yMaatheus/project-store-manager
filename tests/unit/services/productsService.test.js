const { expect } = require('chai');
const sinon = require('sinon');

const { productsService } = require('../../../services');
const { productsModel } = require('../../../models');

describe('services/productsService', () => {

  describe('A função getAll', () => {

    before(() => {
      const RESULT = [{ id: 1, name: "Martelo de Thor" }, { id: 2, name: "Traje de encolhimento" }];

      sinon.stub(productsModel, 'getAll').resolves(RESULT);
    });

    after(() => {
      productsModel.getAll.restore();
    });

    it('Retorna um array', async () => {
      const products = await productsService.getAll();

      expect(products).to.be.an('array');
    });

    it('Retorna produtos', async () => {
      const products = await productsService.getAll();

      expect(products).to.deep.equal([{ id: 1, name: "Martelo de Thor" }, { id: 2, name: "Traje de encolhimento" }]);
    });
  });

  describe('A função getById', () => {

    before(() => {
      const RESULT = [{ id: 1, name: "Martelo de Thor" }];

      sinon.stub(productsModel, 'getById').resolves(RESULT);
    });

    after(() => {
      productsModel.getById.restore();
    });

    it('Retorna um objeto', async () => {
      const product = await productsService.getById(1);

      expect(product).to.be.an('object');
    });

    it('Retona um produto com id pedido', async () => {
      const id = 1;
      const product = await productsService.getById(id);

      expect(product.id).to.equal(id);
    });

    it('Retorna null se o id não for válido', async () => {
      const product = await productsService.getById();

      expect(product).to.be.null;
    });
  });
});