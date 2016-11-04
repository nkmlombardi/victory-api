module.exports = function(Sequelize, DataTypes) {
    return Sequelize.define('PlaidToken', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        plaid_raw: {
            type: DataTypes.JSON,
            allowNull: true
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        access_token: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
        classMethods: {
            associate: function(models) {
                models.PlaidToken.belongsTo(models.User);
            }
        }
    });
};
