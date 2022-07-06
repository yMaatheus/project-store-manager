const { expect } = require('chai');
const sinon = require('sinon');

const { productsService } = require('../../../services');
const { productsModel } = require('../../../models');

const data = [{ id: 1, name: "Martelo de Thor" }, { id: 2, name: "Traje de encolhimento" }];

describe('services/productsService', () => {
  afterEach(sinon.restore);
  describe('A função getAll', () => {

    it('Retorna uma lista', async () => {
      sinon.stub(productsModel, 'getAll').resolves(data);

      const products = await productsService.getAll();

      expect(products).to.be.an('array');
    });

    it('Retorna uma lista de produtos', async () => {
      sinon.stub(productsModel, 'getAll').resolves(data);

      const products = await productsService.getAll();

      expect(products).to.deep.equal(data);
    });

    it('Se a lista de produtos estiver vazia retorna null', async () => {
      sinon.stub(productsModel, 'getAll').resolves([]);

      const products = await productsService.getAll();

      expect(products).to.equal(null);
    });
  });

  describe('A função getById', () => {

    beforeEach(() => {
      sinon.stub(productsModel, 'getById').resolves([data[0]]);
    });

    it('Retorna um objeto', async () => {
      const product = await productsService.getById(1);

      expect(product).to.be.an('object');
    });

    it('Retona o id pedido', async () => {
      const product = await productsService.getById(1);

      expect(product.id).to.equal(1);
    });

    it('Se o id não for válido retorna null ', async () => {
      const product = await productsService.getById();

      expect(product).to.be.null;
    });
  });
});