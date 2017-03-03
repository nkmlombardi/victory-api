module.exports = (Sequelize, DataTypes) =>
    Sequelize.define('Account', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        // Intentionally not setting this to unique in the
        // case of shared accounts
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
                'credit',
                'depository',
                'loan',
                'mortgage',
                'brokerage',
                'other'
            )
        },
        subtype: {
            type: DataTypes.ENUM(
                'auto',
                'brokerage',
                'cash management',
                'cd',
                'certificate of deposit',
                'checking',
                'credit card',
                'credit',
                'home',
                'installment',
                'ira',
                'line of credit',
                'loan',
                'mortgage',
                'mutual_fund',
                'prepaid',
                'savings'
            )
        },
        plaid_raw: {
            type: DataTypes.JSON
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
        classMethods: {
            associate(models) {
                models.Account.hasMany(models.Transaction, {
                    as: 'transactions'
                })
            },

            // Take object from Plaid and map it to our model format
            fromPlaidObject(account, user_id) {
                return {
                    user_id: user_id,
                    plaid_id: account._id,
                    name: account.meta.name,
                    balance_available: account.balance.available,
                    balance_current: account.balance.current,
                    institution_type: account.institution_type,
                    type: account.type,
                    subtype: account.subtype,
                    plaid_raw: account
                }
            },

            // Take array from Plaid and map it to our models format
            fromPlaidArray(accounts, user_id) {
                return accounts.map(function(account) {
                    return this.fromPlaidObject(account, user_id)
                }, this)
            },

            createPlaidMap(accounts) {
                return accounts.reduce(function(map, account) {
                    map[account.plaid_id] = account.id
                    return map
                }, {})
            },

            upsertObject(options) {
                return this.findOrCreate(options).spread(async function(row, created) {
                    if (created) {
                        return row
                    } else {
                        return row.updateAttributes(options.defaults).then(function(updated) {
                            return updated
                        })
                    }
                })
            },

            async upsertArray(accounts, options) {
                return await accounts.map(async function(account) {
                    return await this.upsertObject({
                        where: {
                            [options.where]: account[options.where]
                        },
                        defaults: account
                    })
                }, this)
            }
        }
    })
