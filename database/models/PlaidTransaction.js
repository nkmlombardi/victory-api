var moment = require('moment');

module.exports = function(Sequelize, DataTypes) {
    return Sequelize.define('PlaidTransaction', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        plaid_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        plaid_account_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'PlaidAccounts',
                key: 'plaid_id'
            }
        },

        // Attributes
        name: {
            type: DataTypes.STRING
        },
        amount: {
            type: DataTypes.DOUBLE
        },
        date: {
            type: DataTypes.DATEONLY
        },
        pending: {
            type: DataTypes.BOOLEAN
        },
        category: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'PlaidCategories',
                key: 'plaid_id'
            }
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
        classMethods: {
            associate: function(models) {
                models.PlaidTransaction.belongsTo(models.PlaidCategory, {
                    foreignKey: 'category_id',
                    targetKey: 'plaid_id',
                    as: 'PlaidCategory'
                });

                models.PlaidTransaction.belongsTo(models.PlaidAccount, {
                    foreignKey: 'plaid_account_id',
                    targetKey: 'plaid_id',
                    as: 'account'
                });

                models.PlaidTransaction.belongsTo(models.PlaidCategory, {
                        foreignKey: 'category_id',
                        targetKey: 'plaid_id',
                        as: 'PlaidCategory'
                    });
                },

            // Take object from Plaid and map it to our model format
            fromPlaidObject: function(transaction, user) {
                return {
                    plaid_id: transaction._id,
                    plaid_account_id: transaction._account,
                    user_id: user.id,
                    name: transaction.name,
                    amount: (transaction.amount * -1),
                    date: moment().format(transaction.date),
                    pending: transaction.pending,
                    category: transaction.category,
                    category_id: transaction.category_id
                };
            },

            // Take array from Plaid and map it to our models format
            fromPlaidArray: function(transactions, user) {
                return transactions.map(function(transaction) {
                    return this.fromPlaidObject(transaction, user);
                }, this);
            },
        }
    });
};
