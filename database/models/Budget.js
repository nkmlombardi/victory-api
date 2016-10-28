module.exports = function(Sequelize, DataTypes) {
    return Sequelize.define('Budget', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        category_id: {
            type: DataTypes.UUID,
            references: {
                model: 'PlaidCategories',
                key: 'id'
            }
        },
        scenario_id: {
            type: DataTypes.UUID,
            references: {
                model: 'Scenarios',
                key: 'id'
            }
        },
        allowance: {
            type: DataTypes.DOUBLE,
            defaultValue: 0
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
        classMethods: {
            associate: function(models) {
                models.Budget.belongsTo(models.PlaidCategory, {
                    foreignKey: 'category_id',
                    as: 'category'
                });

                models.Budget.belongsTo(models.Scenario, {
                    foreignKey: 'scenario_id',
                    targetKey: 'id'
                });
            }
        }
    });
};
