const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../database/connection');
const { productsModel } = require('../../../models');

describe('models/productsModel', () => {
  describe('A função getAll', () => {

    before(async () => {
      const RESULT = [{ id: 1, name: "Martelo de Thor" }, { id: 2, name: "Traje de encolhimento" }];
      sinon.stub(connection, 'execute').resolves([RESULT]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Retorna uma lista', async () => {
      const products = await productsModel.getAll();
      expect(products).to.be.an('array');
    });

    it('Retorna uma lista de produtos', async () => {
      const products = await productsModel.getAll();
      expect(products).to.deep.equal([{ id: 1, name: "Martelo de Thor" }, { id: 2, name: "Traje de encolhimento" }]);
    });

  });

  describe('A função getById', () => {

    before(async () => {
      const RESULT = { id: 1, name: "Martelo de Thor" };
      sinon.stub(connection, 'execute').resolves([RESULT]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Retorna um produto específico', async () => {
      const product = await productsModel.getById(1);
      expect(product).to.deep.equal({ id: 1, name: "Martelo de Thor" });
    });
  });
});