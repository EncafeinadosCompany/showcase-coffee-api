require('../../../setup');
const {UserModel} = require('../../../../models/users/users.entity');

test("Debe encontrar al usuario admin", async () => {
    const user = await UserModel.findOne({ where: { email: "admintienda@gmail.com" } });
    expect(user).not.toBeNull();
});
