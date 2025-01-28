const { DataTypes, Model } = require('sequelize');

const USER_TABLE = 'users';

const userSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
    },
};

class UserModel extends Model {
    static associate(models) {
        this.hasMany(models.BookingModel, {
            foreignKey: 'userId',
            as: 'availabilities',
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'user_model',
            timestamps: true,
        };
    }
}

module.exports = { USER_TABLE, userSchema, UserModel };