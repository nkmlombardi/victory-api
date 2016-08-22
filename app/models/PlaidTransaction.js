module.exports = function(Sequelize, DataTypes) {
    return Sequelize.define('PlaidTransaction', {
        plaid_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.UUIDV4,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        plaid_account_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'PlaidAccount',
                key: 'plaid_id'
            }
        },

        // Attributes
        name: {
            type: DataTypes.STRING
        },
        pending: {
            type: DataTypes.BOOLEAN
        },
        category: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'PlaidCategory',
                key: 'plaid_id'
            }
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true
    }, {
        classMethods: {
            associate: function(models) {
                models.PlaidTransaction.belongsTo(models.User);
                models.PlaidTransaction.belongsTo(models.PlaidCategory);
            }
        }
    });
};
