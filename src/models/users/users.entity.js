const { DataTypes, Model, Sequelize } = require("sequelize");;
const { ROLE_TABLE } = require('./roles.entity');
const bcrypt = require('bcrypt');

const USER_TABLE = 'users';

const userSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    id_role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ROLE_TABLE,
            key: "id",
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
};

class UserModel extends Model {
    static associate(models) {

        this.belongsTo(models.RoleModel, {
            foreignKey: 'id_role',
            as: 'role',
        });

        this.hasMany(models.EmployeeModel, {
            as: 'employees',
            foreignKey: 'id_user'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'UserModel',
            timestamps: false,
            underscored: true,
            hooks: {
                beforeCreate: async (user) => {
                    if (user.password) {
                        user.password = await bcrypt.hash(user.password, 10);
                    }
                },
                beforeUpdate: async (user) => {
                    if (user.changed('password')) {
                        user.password = await bcrypt.hash(user.password, 10);
                    }
                }
            }
        };
    }
}

module.exports = { USER_TABLE, userSchema, UserModel };