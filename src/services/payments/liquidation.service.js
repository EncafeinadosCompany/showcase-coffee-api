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

  async createLiquidation(idProvider) {
    if (!idProvider) throw new Error('Provider ID is required', 400);

    const existingLiquidation = await this.liquidationRepository.getLiquidationByProvider(idProvider);
    if (existingLiquidation) return existingLiquidation;

    return await this.liquidationRepository.createLiquidation({ id_provider: idProvider, current_debt: 0 });
  };

  async calculateProviderDebt(providerId, dateRange) {
    try {
      const liquidation = await this.liquidationRepository.getLiquidationByProvider(providerId);
      if (!liquidation) throw new Error('Liquidation not found');

      const { startDate, endDate } = this.validateDateRange(dateRange, liquidation);
      const sales = await this.liquidationRepository.findProviderSalesPeriod(providerId, startDate, endDate);
      const { totalDebt, details } = this.processProviderSales(sales);

      if (details.length > 0) {
        await this.liquidationRepository.createLiquidationDetail(details.map(detail => ({
          ...detail,
          id_liquidation: liquidation.id
        })));

        await this.liquidationRepository.updateLiquidationAmount(liquidation.id, totalDebt );
      }
      
      return { liquidationId: liquidation.id, totalCalculated: totalDebt, period: { startDate, endDate } };
    } catch (error) {
      
      throw error;
    }
  };

  private

  validateDateRange(dateRange, liquidation) {
    const startDate = dateRange?.startDate || liquidation.updated_at;
    const endDate = dateRange?.endDate || new Date();
    if (new Date(startDate) >= new Date(endDate)) throw new Error('Invalid date range');
    return { startDate, endDate };
  }

  processProviderSales(sales) {
    let totalDebt = 0;
    const details = sales.map(sale => {
      if (!sale.shoppingVariant?.shopping_price || !sale.quantity) return null;
      const amount = sale.quantity * sale.shoppingVariant.shopping_price;
      totalDebt += amount;
      return { id_sales_variant: sale.id, amount };
    }).filter(Boolean);
    return { totalDebt, details };
  }

}

module.exports = LiquidationService;