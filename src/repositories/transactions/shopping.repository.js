const { ShoppingVariantModel } = require('../../models/transactions/shoppingVariant.entity');
const { ShoppingModel } = require('../../models/transactions/shopping.entity');
const { EmployeeModel } = require('../../models/users/employees.entity');

class ShoppingRepository {
    
    constructor() { }

    async getAll() {
        return await ShoppingModel.findAll();
    };

    async getById(id) {
        return await ShoppingModel.findByPk(id);
    };

    async create(shoppingData) {
        return await ShoppingModel.create(shoppingData);
    };


    async findShoppingByVariant(idVariant) {
        const shoppingDetail = await ShoppingVariantModel.findOne({
            where: { id_variant_products: idVariant },
            include: [
                {
                    model: ShoppingModel,
                    as: 'shopping',
                    attributes: ['id', 'id_employee'],
                    include: [
                        {
                            model: EmployeeModel,
                            as: 'employee',
                            attributes: ['id_provider']
                        }
                    ]
                }
            ],
        });
    
        return Number(shoppingDetail.shopping.employee.id_provider);
    }  
}

module.exports = ShoppingRepository;