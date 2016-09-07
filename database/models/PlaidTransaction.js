module.exports = function(Sequelize, DataTypes) {
    return Sequelize.define('PlaidTransaction', {
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
            type: DataTypes.INTEGER
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
            // references: {
            //     model: 'PlaidCategories',
            //     key: 'plaid_id'
            // }
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
        classMethods: {
            associate: function(models) {
                // models.PlaidTransaction.belongsTo(models.User);
                // models.PlaidTransaction.belongsTo(models.PlaidCategory);
                models.PlaidTransaction.belongsTo(models.PlaidAccount, {
                    foreignKey: 'plaid_account_id',
                    targetKey: 'plaid_id'
                });
            }
        }
    });
};
