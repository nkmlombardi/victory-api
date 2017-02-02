const bcrypt = require('bcryptjs')

module.exports = function (Sequelize, DataTypes) {
    return Sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            },
            set: function (value) {
                this.setDataValue('email', value.toLowerCase())
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set: function (value) {
                const salt = bcrypt.genSaltSync(10)
                const encrypted = bcrypt.hashSync(value, salt)

                this.setDataValue('password', encrypted)
                this.setDataValue('salt', salt)
            }
        },
        salt: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
        // classMethods: {
        //     associate: (models) => {
        //         // Associations
        //     }
        // },
        instanceMethods: {
            verifyPassword: (password, callback) => {
                return bcrypt.compare(password, this.password, (err, res) => callback(err, res))
            },
            publicAttributes: function () {
                return {
                    id: this.id,
                    email: this.email
                }
            }
        },
        scopes: {
            public: {
                attributes: {
                    exclude: ['password', 'salt']
                }
            }
        }
    })
}
