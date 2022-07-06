const { expect } = require('chai');
const sinon = require('sinon');

const { productsController } = require('../../../controllers');
const { productsService } = require('../../../services');

const data = [{ id: 1, name: "Martelo de Thor" }, { id: 2, name: "Traje de encolhimento" }];

describe('controllers/productsController', () => {
  afterEach(sinon.restore);
  describe('Ao chamar getAll', () => {

    it('Se não houver produtos retorna 404 e uma mensagem de produtos não encontrados', async () => {
      sinon.stub(productsService, 'getAll').resolves(null);
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      }

      await productsController.getAll({}, res);

      expect(res.status.calledWith(404)).to.true;
      expect(res.json.calledWith({ message: 'Products not found' })).to.true;
    });

    it('Se houver produtos retorna codigo 200 e a lista de produtos', async () => {
      sinon.stub(productsService, 'getAll').resolves(data);
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      }

      await productsController.getAll({}, res);

      expect(res.status.calledWith(200)).to.true;
      expect(res.json.calledWith(data)).to.true;
    });
  });

  describe('Ao chamar getById', () => {
    it('Se o produto não for encontrado retorna o codigo 404 e uma mensagem produto não encontrado', async () => {
      sinon.stub(productsService, 'getById').resolves(null);
      const req = { params: { id: '1' } };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      }

      await productsController.getById(req, res);

      expect(res.status.calledWith(404)).to.true;
      expect(res.json.calledWith({ message: 'Product not found' })).to.true;
    });

    it('Se o produto for encontrado retorna o codigo 200 e o produto', async () => {
      sinon.stub(productsService, 'getById').resolves(data[0]);
      const req = { params: { id: '1' } };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      }

      await productsController.getById(req, res);

      expect(res.status.calledWith(200)).to.true;
      expect(res.json.calledWith(data[0])).to.true;
    });

  });
});