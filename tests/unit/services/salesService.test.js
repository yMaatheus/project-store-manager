const { expect } = require('chai');
const sinon = require('sinon');

const { salesService } = require('../../../services');
const { salesModel } = require('../../../models');

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

  describe('getAll', () => {
    it('Se o sale for invalido retorna null', async () => {
      sinon.stub(salesModel, 'getAll').resolves([]);

      const sales = await salesService.getAll();

      expect(sales).to.be.null;
    });

    it('Retorna a lista de vendas', async () => {
      const data = [
        {
          saleId: 1,
          date: "2022-07-07T07:38:08.000Z",
          productId: 1,
          quantity: 5
        },
        {
          saleId: 2,
          date: "2022-07-07T07:38:08.000Z",
          productId: 3,
          quantity: 15
        }
      ]

      sinon.stub(salesModel, 'getAll').resolves(data);

      const sales = await salesService.getAll();

      expect(sales).to.deep.equal(data);
    });
  })

  describe('getById', () => {
    it('Se o id for invalido retorna null', async () => {
      const sales = await salesService.getById();

      expect(sales).to.be.null;
    });

    it('Se o sale for invalido retorna null', async () => {
      sinon.stub(salesModel, 'getById').resolves([]);

      const sales = await salesService.getById(1);

      expect(sales).to.be.null;
    });

    it('Retorna a lista de produtos', async () => {
      const data = [
        {
          saleId: 1,
          date: "2022-07-07T07:38:08.000Z",
          productId: 1,
          quantity: 5
        },
        {
          saleId: 2,
          date: "2022-07-07T07:38:08.000Z",
          productId: 3,
          quantity: 15
        }
      ]

      sinon.stub(salesModel, 'getById').resolves(data);

      const sales = await salesService.getById(1);

      expect(sales).to.deep.equal(data);
    });
  })
});