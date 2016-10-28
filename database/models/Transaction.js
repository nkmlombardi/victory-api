var moment = require('moment');

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
        },
        category: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
        classMethods: {
            associate: function(models) {
                // models.PlaidTransaction.belongsTo(models.PlaidCategory, {
                //     foreignKey: 'category_id',
                //     targetKey: 'plaid_id',
                //     as: 'PlaidCategory'
                // });
                //
                // models.PlaidTransaction.belongsTo(models.PlaidAccount, {
                //     foreignKey: 'plaid_account_id',
                //     targetKey: 'plaid_id',
                //     as: 'account'
                // });
            },

            // Take object from Plaid and map it to our model format
            fromPlaidObject: function(transaction, user) {
                return {
                    user_id: user.id,
                    plaid_id: transaction._id,
                    name: transaction.name,
                    amount: (transaction.amount * -1),
                    date: moment().format(transaction.date),
                    pending: transaction.pending
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
