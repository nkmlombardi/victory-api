var bcrypt = require('bcryptjs');

module.exports = function(Sequelize, DataTypes) {
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
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set: function(value) {
                var that = this;
                return bcrypt.genSalt(10, function(err, salt) {
                    return bcrypt.hash(value, salt, function(error, encrypted) {
                        that.setDataValue('password', encrypted);
                        that.setDataValue('salt', salt);

                        console.log('Encypted: ', encrypted);
                        console.log('Salt: ', salt);
                    });
                });
            }
        },
        salt: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
        classMethods: {
            associate: function(models) {
                models.User.hasOne(models.PlaidToken);
                models.User.hasMany(models.PlaidAccount);
                models.User.hasMany(models.PlaidTransaction);
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
        },
        hooks: {
            beforeCreate: function(user, options, callback) {
                return bcrypt.genSalt(10, function(err, salt) {
                    return bcrypt.hash(password, salt, function(error, encrypted) {
                        user.password = encrypted;
                        user.salt = salt;

                        callback(null, options);
                    });
                });
            }
        }
    });
};
