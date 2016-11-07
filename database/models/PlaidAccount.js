module.exports = function(Sequelize, DataTypes) {
    return Sequelize.define('PlaidAccount', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        plaid_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        plaid_item: {
            type: DataTypes.STRING,
            allowNull: false
        },
        plaid_user: {
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

        // Attributes
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        balance_available: {
            type: DataTypes.DOUBLE
        },
        balance_current: {
            type: DataTypes.DOUBLE
        },
        institution_type: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.ENUM(
                "credit",
                "depository",
                "loan",
                "mortgage",
                "brokerage",
                "other"
            )
        },
        subtype: {
            type: DataTypes.ENUM(
                "auto",
                "brokerage",
                "cash management",
                "cd",
                "certificate of deposit",
                "checking",
                "credit card",
                "credit",
                "home",
                "installment",
                "ira",
                "line of credit",
                "loan",
                "mortgage",
                "mutual_fund",
                "prepaid",
                "savings"
            )
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
        classMethods: {
            associate: function(models) {

            },

            // Take object from Plaid and map it to our model format
            fromPlaidObject: function(account, user) {
                return {
                    plaid_id: account._id,
                    plaid_item: account._item,
                    plaid_user: account._user,
                    user_id: user.id,
                    name: account.meta.name,
                    balance_available: account.balance.available,
                    balance_current: account.balance.current,
                    institution_type: account.institution_type,
                    type: account.type,
                    subtype: account.subtype
                }
            },

            // Take array from Plaid and map it to our models format
            fromPlaidArray: function(accounts, user) {
                return accounts.map(function(account) {
                    return this.fromPlaidObject(account, user)
                }, this)
            },

            upsertWithReturn: function(options) {
                return this.findOrCreate(options).spread(function(row, created) {
                    if (created) {
                        return row
                    } else {
                        return row.updateAttributes(options.defaults).then(function(updated) {
                            return updated
                        })
                    }
                })
            }
        }
    })
}
