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
                var salt = bcrypt.genSaltSync(10);
                var encrypted = bcrypt.hashSync(value, salt);

                this.setDataValue('password', encrypted);
                this.setDataValue('salt', salt);
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
            verifyPassword: function(password, callback) {
                return bcrypt.compare(password, this.password, function(err, res) {
                    return callback(err, res);
                });
            }
        }
    });
};
