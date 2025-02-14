class LiquidationService {

  constructor(liquidationRepository, depositRepository) {
    this.liquidationRepository = liquidationRepository;
    this.depositRepository = depositRepository;
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

      return this.prepareLiquidationDetails(liquidation, sales, deposits);

    } catch (error) {
      throw new Error(`Error fetching liquidation details: ${error.message}`);
    }
  };

  async createLiquidation(idProvider) {
    if (!idProvider) throw new Error('Provider ID is required', 400);

    const existingLiquidation = await this.liquidationRepository.getLiquidationByProvider(idProvider);
    if (existingLiquidation) return existingLiquidation;

    return await this.liquidationRepository.createLiquidation({ id_provider: idProvider, current_debt: 0 });
  }

  async updateLiquidationCalculation(idProvider, dateRange = {}) {
    try {
      if (!idProvider) throw new Error('Provider ID is required', 400);

      let liquidation = await this.liquidationRepository.getLiquidationByProvider(idProvider);
      if (!liquidation) throw new Error('Liquidation not found', 404);

      const calculationPeriod = {
        startDate: dateRange.startDate || liquidation.updated_at,
        endDate: dateRange.endDate || new Date()
      };

      const sales = await this.liquidationRepository.findProviderSales(
        idProvider,
        calculationPeriod.startDate,
        calculationPeriod.endDate
      );

      const newDebt = this.calculateProviderDebt(sales);

      if (newDebt > 0) {
        await this.liquidationRepository.updateLiquidationDebt(liquidation.id, newDebt);
      }

      return { 
        liquidationId: liquidation.id, 
        newDebt, 
        calculationPeriod,
        salesCount: sales.length 
      };

    } catch (error) {
      console.error('Error updating liquidation calculation:', error);
      throw error;
    }
  }

  calculateProviderDebt(sales) {
    return sales.reduce((total, sale) => {

      if (!sale.shoppingVariant || !sale.shoppingVariant.shopping_price) {
        return total;
      }

      const providerAmount = sale.quantity * sale.shoppingVariant.shopping_price;
      return total + (providerAmount > 0 ? providerAmount : 0);
    }, 0);
  }

  async getLiquidationDetails(liquidationId) {
    try {
      if (!liquidationId) throw new Error('Liquidation ID is required', 400);

      const liquidation = await this.liquidationRepository.getLiquidationById(liquidationId);
      if (!liquidation) throw new Error('Liquidation not found', 404);

      const sales = await this.liquidationRepository.getLiquidationSales(liquidationId);
      const deposits = await this.depositRepository.getDepositsByLiquidation(liquidationId);

      return this.prepareLiquidationDetails(liquidation, sales, deposits);
    } catch (error) {
      throw new Error(`Error fetching liquidation details: ${error.message}`);
    }
  }

  prepareLiquidationDetails(liquidation, sales, deposits) {
    const totalPaid = deposits.reduce((total, deposit) =>
      total + Number(deposit.amount || 0), 0);

    const validSales = sales.filter(sale => 
      sale.variantProduct?.shoppingVariants?.some(sv => 
        sv.shopping?.employee?.id_provider === liquidation.id_provider
      )
    );

    return {
      liquidation: {
        id: liquidation.id,
        idProvider: liquidation.id_provider,
        totalDebt: Number(liquidation.current_debt || 0),
        status: liquidation.status,
        createdAt: liquidation.created_at,
        updatedAt: liquidation.updated_at
      },
      sales: validSales.map(sale => ({
        id: sale.id,
        quantity: sale.quantity,
        costPrice: Number(sale.get('shopping_price') || 0),
        providerAmount: sale.quantity * Number(sale.get('shopping_price') || 0),
        saleDate: sale.created_at,
        product: sale.variantProduct ? {
          id: sale.variantProduct.id,
          name: sale.variantProduct.product?.name,
          variant: sale.variantProduct.grammage
        } : null
      })),
      deposits,
      summary: {
        totalDebt: Number(liquidation.current_debt || 0),
        totalPaid,
        lastCalculation: liquidation.updated_at
      }
    };
  }
}

module.exports = LiquidationService;