var moment = require('moment');
var Promise = require('bluebird');

module.exports = function(Sequelize, DataTypes) {
    return Sequelize.define('Transaction', {
        // ID, Keys, Foreign Keys
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
        account_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Accounts',
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

        // Intentionally not setting this to unique in the
        // case of shared accounts
        plaid_id: {
            type: DataTypes.STRING,
            allowNull: false
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
        plaid_raw: {
            type: DataTypes.JSON
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
        classMethods: {
            associate: function(models) {
                models.Transaction.belongsTo(models.Account, {
                    as: 'account'
                });

                models.Transaction.belongsTo(models.Category, {
                    as: 'category'
                });

                models.Transaction.belongsTo(models.User, {
                    as: 'user'
                });
            },

            // Take object from Plaid and map it to our model format
            fromPlaidObject: function(transaction, user_id, accounts, categories) {
                return {
                    user_id: user_id,
                    account_id: accounts[transaction._account],
                    category_id: categories[transaction.category_id],
                    plaid_id: transaction._id,
                    name: transaction.name,
                    amount: (transaction.amount * -1),
                    date: moment(transaction.date).format(),
                    pending: transaction.pending,
                    plaid_raw: transaction
                };
            },

            // Take array from Plaid and map it to our models format
            fromPlaidArray: function(transactions, user_id, accounts, categories) {
                return transactions.map(function(transaction) {
                    return this.fromPlaidObject(transaction, user_id, accounts, categories);
                }, this);
            }
        }
    });
};
