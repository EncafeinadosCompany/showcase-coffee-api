const TestSequencer = require('@jest/test-sequencer').default;

class CustomSequencer extends TestSequencer {
    sort(tests) {
        const order = [
            '01.roles.test.js',
            '02.users.test.js',
            '03.providers.test.js',
            '04.stores.test.js',
            '05.employees.test.js',
            // '06.bankAccount.test.js',
            // '07.alliances.test.js',
            '08.brands.test.js',
            '09.products.test.js',
            '10.attributes.test.js',
            '11.attributesProducts.test.js',
            '12.variantProducts.test.js',
            '13.shopping.test.js',
            '14.shoppingVariant.test.js',
            '15.sales.test.js',
            '16.salesVariant.test.js',
            '17.liquidations.test.js',
            '18.liquidationdetails.test.js',
            '19.deposits.test.js',
        ];

        return tests.sort((a, b) => {
            const indexA = order.findIndex((file) => a.path.includes(file));
            const indexB = order.findIndex((file) => b.path.includes(file));
            return indexA - indexB;
        });
    }
}

module.exports = CustomSequencer;
