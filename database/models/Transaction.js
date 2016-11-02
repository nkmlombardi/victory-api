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
        plaid_id: {
            type: DataTypes.UUID,
            allowNull: false,
            unique: true,
            references: {
                model: 'PlaidAccounts',
                key: 'id'
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
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
        classMethods: {
            associate: function(models) { },

            // Take object from Plaid and map it to our model format
            fromPlaidObject: async function(transaction, models, instances) {
                var account = await models.account.findOne({
                    where: {
                        plaid_id: transaction._account,
                        user_id: instances.user.id
                    },
                    attributes: ['id']
                });

                var category = await models.category.findOne({
                    where: { plaid_id: transaction.category_id },
                    attributes: ['id']
                });

                console.log('Account & Category: ', account, category);

                return {
                    user_id: await instances.user.id,
                    account_id: account.id,
                    category_id: category.id,
                    plaid_id: transaction._id,
                    name: transaction.name,
                    amount: (transaction.amount * -1),
                    date: moment().format(transaction.date),
                    pending: transaction.pending
                };
            },

            // Take array from Plaid and map it to our models format
            fromPlaidArray: function(transactions, models, instances) {
                return transactions.map(function(transaction) {
                    return this.fromPlaidObject(transaction, models, instances);
                }, this);
            },
        }
    });
};
