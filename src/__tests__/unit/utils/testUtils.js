const { UserModel } = require('../../../../models/users/users.entity');
const { StoreModel } = require('../../../../models/companies/store.entity');
const { ProviderModel } = require('../../../../models/companies/provider.entity');

async function createTestUser() {
    return UserModel.create({
        id: 1,
        email: 'john.doe@example.com',
        password: 'securepassword123',
        id_role: 1
    });
}

async function createTestStore() {
    return StoreModel.create({
        id: 1,
        name: 'Store 1',
        email: 'store1@example.com',
        phone: '123-456-7890',
        address: '123 Main St',
        status: true
    });
}

async function createTestProvider() {
    return ProviderModel.create({
        id: 1,
        name: 'Provider 1',
        nit: '123456789',
        email: 'provider1@example.com',
        phone: '123-456-7890',
        address: '123 Provider St',
        status: true
    });
}

async function cleanupTestData() {
    await UserModel.destroy({ where: { email: 'john.doe@example.com' } });
    await StoreModel.destroy({ where: { name: 'Store 1' } });
    await ProviderModel.destroy({ where: { name: 'Provider 1' } });
}

module.exports = {
    createTestUser,
    createTestStore,
    createTestProvider,
    cleanupTestData
};
