module.exports = function(Sequelize, DataTypes) {
    return Sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        access_token: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
        freezeTableName: true
    }, {
        classMethods: {
            associate: function(models) {
                models.user.hasOne(models.plaidToken);
            }
        }
    });
};
