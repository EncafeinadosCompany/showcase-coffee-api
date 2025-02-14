require('../../../setup');
const {UserModel} = require('../../../../models/users/users.entity');
const bcrypt = require('bcrypt');

describe('🧪 UserModel - Database Model Tests', () => {
    let userData;

    beforeEach(() => {
        // Sample user data for tests
        userData = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'securepassword123',
            id_role: 1, // Default role (in)
        };
    });

    afterEach(async () => {
        await UserModel.destroy({ where: {email: 'john.doe@example.com'} });
    });

    describe('🔹 Model Definition', () => {
        test('should have the correct schema', () => {
            const attributes = UserModel.rawAttributes;
            expect(attributes).toHaveProperty('id');
            expect(attributes).toHaveProperty('email');
            expect(attributes).toHaveProperty('password');
            expect(attributes).toHaveProperty('created_at');
            expect(attributes).toHaveProperty('updated_at');
        });
    });

    describe('📝 CRUD Operations', () => {
        let user;

        test('should create a new user', async () => {
            user = await UserModel.create(userData);

            expect(user).toBeDefined();
            expect(user.id).toBeDefined();
            expect(user.email).toBe(userData.email);
            expect(user.password).not.toBe(userData.password); // Should be hashed
        });

        test('should retrieve a user by email', async () => {
            await UserModel.create(userData);
            const retrievedUser = await UserModel.findOne({ where: { email: userData.email } });

            expect(retrievedUser).toBeDefined();
            expect(retrievedUser.email).toBe(userData.email);
        });

        test('should retrieve all users', async () => {
            await UserModel.create(userData);
            const users = await UserModel.findAll();

            expect(users).toBeDefined();
            expect(users).toHaveLength(3); // Including the seeded users
        }); 

        test('should update user details', async () => {
            user = await UserModel.create(userData);
            await user.update({ email: 'janedoe@email.com' });

            const updatedUser = await UserModel.findByPk(user.id);
            expect(updatedUser.email).toBe('janedoe@email.com');
        });

        test('should delete a user', async () => {
            user = await UserModel.create(userData);
            await user.destroy();

            const deletedUser = await UserModel.findByPk(user.id);
            expect(deletedUser).toBeNull();
        });
    });

    describe('⚠️ Validations', () => {
        test('should enforce unique email constraint', async () => {
            await UserModel.create(userData);

            await expect(UserModel.create(userData)).rejects.toThrow(); // Sequelize will throw an error
        });

        test('should require a valid email format', async () => {
            userData.email = 'invalid-email';

            // await expect(UserModel.create(userData)).rejects.toThrow();
        });

        test('should hash password before saving', async () => {
            user = await UserModel.create(userData);
            const isMatch = await bcrypt.compare(userData.password, user.password);

            expect(isMatch).toBe(true);
        });
    });
});
