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
                model: 'Categories',
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
        type: {
            type: DataTypes.ENUM(
                'income',
                'expense'
            ),
            defaultValue: 'expense'
        },
        allowance: {
            type: DataTypes.DOUBLE,
            defaultValue: 0
        },
        color: {
            type: DataTypes.STRING,
            defaultValue: '#46c35f'
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
        classMethods: {
            associate: function(models) {
                models.Budget.belongsTo(models.Category, {
                    as: 'category'
                })

                models.Budget.belongsTo(models.Scenario, {
                    as: 'scenario'
                })

                models.Budget.hasMany(models.Transaction, {
                    foriegnKey: 'category_id',
                    targetKey: 'category_id',
                    as: 'transactions'
                })
            }
        }
    })
}
