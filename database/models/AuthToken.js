var crypto = require('crypto');

module.exports = function(Sequelize, DataTypes) {
    return Sequelize.define('AuthToken', {
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
        auth_token: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: function() {
                return crypto.randomBytes(32).toString('hex');
            }
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true
    }, {
        classMethods: {
            associate: function(models) {
                models.AuthToken.belongsTo(models.User);
            }
        },
        instanceMethods: {
            getPublicAttributes: function() {
                return {
                    id: this.id,
                    user_id: this.user_id,
                    auth_token: this.auth_token
                }
            }
        }
    });
};
