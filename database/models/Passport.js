const crypto = require('crypto')
const moment = require('moment')

module.exports = (Sequelize, DataTypes) =>
    Sequelize.define('Passport', {
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
        deleted_at: {
            type: DataTypes.DATE
        },
        jwt_token: {
            type: DataTypes.TEXT
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
        classMethods: {
            associate: (models) => {
                models.Passport.belongsTo(models.User)
            }
        }
    })
