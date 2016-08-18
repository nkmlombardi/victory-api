module.exports = function(Sequelize, DataTypes) {
    return Sequelize.define('plaid_token', {
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        access_token: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
        freezeTableName: true
    }, {
        classMethods: {
            associate: function(models) {
                models.plaidToken.belongsTo(models.user);
            }
        }
    });
};
