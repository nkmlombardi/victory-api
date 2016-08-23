var bcrypt = require('bcryptjs');

module.exports = function(Sequelize, DataTypes) {
    return Sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        email: {
            type: DataTypes.UUIDV4,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true
    }, {
        classMethods: {
            associate: function(models) {
                models.User.hasOne(models.AuthToken);
            }
        },
        instanceMethods: {
            setPassword: function(password) {
                return bcrypt.genSalt(10, function(err, salt) {
                    return bcrypt.hash(password, salt, function(error, encrypted) {
                        this.password = encrypted;
                        this.salt = salt;
                    });
                });
            },
            verifyPassword: function(password, callback) {
                return bcrypt.compare(password, this.password, function(err, res) {
                    return callback(err, res);
                });
            }
        }
    });
};
