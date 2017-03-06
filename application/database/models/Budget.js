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
        },
        getterMethods: {
            period: function() {
                if (this.interval_text === 'Monthly') {
                    return {
                        start: moment().startOf('month').format(),
                        end: moment().endOf('month').format()
                    }
                }

                if (this.interval_text === 'Weekly') {
                    return {
                        start: moment().startOf('week').format(),
                        end: moment().endOf('week').format()
                    }
                }

                var range = {
                    now: moment(),
                    start: moment(this.start),
                    end: moment(this.start).add(this.interval, 'milliseconds')
                }

                while (range.end < range.now) {
                    // Make sure we set some hard limit
                    if (range.start > this.end) {
                        break;
                    }

                    range.start.add(this.interval)
                    range.end.add(this.interval)
                }

                return {
                    start: range.start.format(),
                    end: range.end.format()
                }
            }
        },

        scopes: {
            public: {
                attributes: {
                    exclude: ['plaid_raw']
                }
            }
        }
    })
}
