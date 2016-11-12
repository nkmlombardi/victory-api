module.exports = function(Sequelize, DataTypes) {
    return Sequelize.define('PlaidToken', {
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
        public_token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        access_token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_account_pull: {
            type: DataTypes.DATE
        },
        last_transaction_pull: {
            type: DataTypes.DATE
        },
        plaid_raw: {
            type: DataTypes.JSON,
            allowNull: true
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
        classMethods: {
            associate: function(models) {
                models.PlaidToken.belongsTo(models.User)
            }
        }
    })
}
