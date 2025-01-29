const { DataTypes, Model } = require('sequelize');

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
    id_role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "roles",
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

        this.hasMany(models.ShoppingsModel, {
            as: 'id_user',
            foreignKey: 'employees'
          });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'UserModel',
            timestamps: true,
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