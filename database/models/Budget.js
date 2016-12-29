var moment = require('moment')

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

        // MILLISECONDS
        interval: {
            type: DataTypes.BIGINT,
            defaultValue: 2678400000
        },

        interval_text: {
            type: DataTypes.STRING,
            defaultValue: 'Monthly'
        },

        start: {
            type: DataTypes.DATE,
            defaultValue: moment().startOf('month').toDate()
        },

        end: {
            type: DataTypes.DATE,
            defaultValue: moment().startOf('month').add(1, 'year').toDate()
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
