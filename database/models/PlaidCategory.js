module.exports = function(Sequelize, DataTypes) {
    return Sequelize.define('PlaidCategory', {
        plaid_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        hierarchy: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
        tableName: 'PlaidCategories'
    }, {
        classMethods: {
            associate: function(models) {
                models.plaidToken.belongsTo(models.user);
            }
        }
    });
};
