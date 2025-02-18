class LiquidationService {

  constructor(liquidationRepository) {

    this.liquidationRepository = liquidationRepository
  }

  async getAllLiquidations() {
    return await this.liquidationRepository.getAllLiquidations();
  };

  async getLiquidationById(id) {
    if (!id || isNaN(id)) throw new Error('Invalid liquidation ID');
    const liquidation = await this.liquidationRepository.getLiquidationById(id);
    if (!liquidation) throw new Error('Liquidation not found');
    return liquidation;
  };

  async getLiquidationDetails(liquidationId) {
    if (!liquidationId || isNaN(liquidationId)) throw new Error('Invalid liquidation ID');
    return await this.liquidationRepository.getLiquidationDetails(liquidationId);
  };

  async createLiquidation(idProvider) {
    if (!idProvider) throw new Error('Provider ID is required', 400);

    const existingLiquidation = await this.liquidationRepository.getLiquidationByProvider(idProvider);
    if (existingLiquidation) return existingLiquidation;

    return await this.liquidationRepository.createLiquidation({ id_provider: idProvider, current_debt: 0 });
  };

  async calculateProviderDebt(providerId, startDate, endDate = new Date()) {
    try {
      const liquidation = await this.liquidationRepository.getLiquidationByProvider(providerId);
      if (!liquidation) throw new Error('Liquidation not found');

      const sales = await this.liquidationRepository.findProviderSalesPeriod(providerId, startDate, endDate);
      const { totalDebt, details } = this.processProviderSales(sales);

      if (details.length > 0) {
        await this.liquidationRepository.createLiquidationDetail(details.map(detail => ({
          ...detail,
          id_liquidation: liquidation.id
        })));

        const newDebt = liquidation.current_debt + totalDebt;
        
        await this.liquidationRepository.updateLiquidationAmount(liquidation.id, newDebt);

      }

      return { liquidationId: liquidation.id, totalCalculated: totalDebt, period: { startDate, endDate } };
    } catch (error) {

      throw error;
    }
  };

  private
  processProviderSales(sales) {
    let totalDebt = 0;
    const details = sales.map(sale => {
      if (!sale.shoppingVariant?.shopping_price || !sale.quantity) return null;

      const amount = sale.shoppingVariant.shopping_price * sale.quantity;
      totalDebt += amount;

      return { id_sales_variant: sale.id, amount };
    }).filter(Boolean);

    return { totalDebt, details };
  }

}

module.exports = LiquidationService;