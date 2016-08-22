module.exports = function(Sequelize, DataTypes) {
    return Sequelize.define('PlaidAccount', {
        plaid_id: {
            type: DataTypes.STRING,
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

        // Attributes
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        balance_available: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        balance_current: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        institution_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM(
                "credit",
                "depository",
                "loan",
                "mortgage",
                "brokerage",
                "other"
            ),
            allowNull: false
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
            ),
            allowNull: false
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true
    }, {
        classMethods: {
            associate: function(models) {
                models.PlaidAccount.belongsTo(models.User);
                models.PlaidAccount.hasMany(models.PlaidTransaction);
            }
        }
    });
};
