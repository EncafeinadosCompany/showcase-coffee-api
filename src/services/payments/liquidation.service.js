class LiquidationService {

  constructor(liquidationRepository, depositRepository) {
    this.liquidationRepository = liquidationRepository;
    this.depositRepository = depositRepository
  }

  async getAllLiquidations() {
    return await this.liquidationRepository.getAllLiquidations();
  }

  async getLiquidationById(id) {
    if (!id || isNaN(id)) throw new Error('Invalid liquidation ID', 400);

    const liquidation = await this.liquidationRepository.getLiquidationById(id);
    if (!liquidation) throw new Error('Liquidation not found', 404);

    return liquidation;
  }

  async getLiquidationDetails(liquidationId) {
    try {
      if (!liquidationId) throw new Error('Liquidation ID is required', 400);

      const liquidation = await this.liquidationRepository.getLiquidationById(liquidationId);
      if (!liquidation) throw new Error('Liquidation not found', 404);

      const sales = await this.liquidationRepository.getLiquidationSales(liquidationId);

      const deposits = await this.depositRepository.getDepositsByLiquidation(liquidationId);

      return this._prepareLiquidationDetails(liquidation, sales, deposits);

    } catch (error) {
      throw new Error( `Error fetching liquidation details: ${error.message}`);
    }
  };

  async createLiquidation(idProvider) {
    if (!idProvider) throw new Error('Provider ID is required', 400);

    const existingLiquidation = await this.liquidationRepository.getLiquidationByProvider(idProvider);
    if (existingLiquidation) return existingLiquidation;

    return await this.liquidationRepository.createLiquidation({ id_provider: idProvider, current_debt: 0 });
  }

  async updateLiquidationCalculation(idProvider, dateRange = {}) {

    const transaction = await this.liquidationRepository.sequelize.transaction();

    try {
      if (!idProvider) throw new Error('Provider ID is required', 400);

      const liquidation = await this.createLiquidation(idProvider);

      // Define calculation period
      const calculationPeriod = {
        startDate: dateRange.startDate || liquidation.updated_at,
        endDate: dateRange.endDate || new Date()
      };

      // Get sales for the period
      const sales = await this.liquidationRepository.findProviderSales(
        idProvider,
        calculationPeriod.startDate,
        calculationPeriod.endDate,
        transaction
      );

      const newDebt = this._calculateTotalDebt(sales);

      if (newDebt > 0) {
        await this.liquidationRepository.updateLiquidationDebt( liquidation.id, newDebt, transaction );
      }

      await transaction.commit();
      return {
        liquidationId: liquidation.id,
        newDebt,
        calculationPeriod
      };
      // return this.getLiquidationById(liquidation.id);

    } catch (error) {
      await transaction.rollback();
      console.error('Error updating liquidation calculation:', error);
      throw error;
    }
  }

  _calculateTotalDebt(sales) {
    return sales.reduce((total, sale) => {
      const providerAmount = Number(sale.get('provider_amount') || 0);
      return total + providerAmount;
    }, 0);
  }

  _prepareLiquidationDetails(liquidation, sales, deposits) {
    const totalPaid = deposits.reduce((total, deposit) =>
      total + Number(deposit.amount || 0), 0);

    const remainingDebt = Number(liquidation.current_debt || 0) - totalPaid;

    return {
      liquidation: {
        id: liquidation.id,
        idProvider: liquidation.id_provider,
        totalDebt: Number(liquidation.current_debt || 0),
        status: liquidation.status,
        createdAt: liquidation.created_at,
        updatedAt: liquidation.updated_at
      },
      sales: sales.map(sale => ({
        id: sale.id,
        quantity: sale.quantity,
        costPrice: Number(sale.get('cost_price') || 0),
        providerAmount: Number(sale.get('provider_amount') || 0),
        saleDate: sale.created_at,
        product: sale.variantProduct ? {
          id: sale.variantProduct.id,
          name: sale.variantProduct.product?.name,
          variant: sale.variantProduct.grammage,
          sku: sale.variantProduct.sku
        } : null
      })),
      deposits: deposits.map(deposit => ({
        id: deposit.id,
        date: deposit.date,
        amount: Number(deposit.amount || 0),
        type: deposit.type_payment,
        reference: deposit.reference,
        status: deposit.status
      })),
      summary: {
        totalDebt: Number(liquidation.current_debt || 0),
        totalPaid,
        remainingDebt,
        lastCalculation: liquidation.updated_at
      }
    };
  };

}

module.exports = LiquidationService;
