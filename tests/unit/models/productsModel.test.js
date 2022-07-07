const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../database/connection');
const { productsModel } = require('../../../models');

const data = [{ id: 1, name: "Martelo de Thor" }, { id: 2, name: "Traje de encolhimento" }];

describe('models/productsModel', () => {
  afterEach(sinon.restore);
  describe('getAll', () => {

    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves([data]);
    });

    it('Retorna uma lista', async () => {
      const products = await productsModel.getAll();

      expect(products).to.be.an('array');
    });

    it('Retorna uma lista de produtos', async () => {
      const products = await productsModel.getAll();

      expect(products).to.deep.equal(data);
    });

  });

  describe('getById', () => {
    it('Retorna o produto pedido', async () => {
      sinon.stub(connection, 'execute').resolves([data[0]]);

      const product = await productsModel.getById(1);

      expect(product).to.deep.equal(data[0]);
    });
  });

  describe('create', () => {
    it('Retorna o insertId', async () => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);

      const insertId = await productsModel.create();

      expect(insertId).to.equal(1);
    });
  });
});