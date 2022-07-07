const { expect } = require('chai');
const sinon = require('sinon');

const { salesController } = require('../../../controllers');
const { salesService } = require('../../../services');

describe('controllers/salesController', () => {
  afterEach(sinon.restore);

  describe('create', () => {
    it('Se um produto não existir retorna codigo 404 e a mensagem "Product not found"', async () => {
      sinon.stub(salesService, 'create').resolves(null);
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      }

      await salesController.create({}, res);

      expect(res.status.calledWith(404)).to.true;
      expect(res.json.calledWith({ message: 'Product not found' })).to.true;
    });

    it('Se a venda foi feita retorna codigo 201 e um objeto com id da venda e os produtos', async () => {
      const resolves = {
        id: 5,
        itemsSold: [
          { productId: 1, quantity: 1 },
          { productId: 2, quantity: 5 }
        ]
      };

      sinon.stub(salesService, 'create').resolves(resolves);

      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      }

      await salesController.create({}, res);

      expect(res.status.calledWith(201)).to.true;
      expect(res.json.calledWith(resolves)).to.true;
    });
  })
});