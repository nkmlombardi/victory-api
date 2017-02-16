const bcrypt = require('bcryptjs')

module.exports = (Sequelize, DataTypes) =>
    Sequelize.define('User', {
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
            set(value) {
                this.setDataValue('email', value.toLowerCase())
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                console.time('ser hash')
                const salt = bcrypt.genSaltSync(10)
                const encrypted = bcrypt.hashSync(value, salt)

                this.setDataValue('password', encrypted)
                this.setDataValue('salt', salt)
                console.timeEnd('ser hash')
            }
        },
        salt: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
        instanceMethods: {
            verifyPassword(password, callback) {
                console.time('verify password')
                return bcrypt.compare(password, this.password, (err, res) => callback(err, res))
                console.timeEnd('verify password')
            },

            publicAttributes() {
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
