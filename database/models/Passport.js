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
        auth_token: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: () => crypto.randomBytes(32).toString('hex')
        },
        strategy: {
            type: DataTypes.STRING
        },
        updated_at: {
            type: DataTypes.STRING,
            defaultValue: () => moment().format()
        },
        created_at: {
            type: DataTypes.STRING,
            defaultValue: moment().format()
        }
    }, {
        timestamps: false,
        paranoid: true,
        underscored: true,
        classMethods: {
            associate: (models) => {
                models.Passport.belongsTo(models.User)
            }
        }
    })
