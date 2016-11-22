var crypto = require('crypto')

module.exports = function(Sequelize, DataTypes) {
    return Sequelize.define('Passport', {
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
                return crypto.randomBytes(32).toString('hex')
            }
        },
        strategy: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
        classMethods: {
            associate: function(models) {
                models.Passport.belongsTo(models.User)
            }
        }
    })
}
