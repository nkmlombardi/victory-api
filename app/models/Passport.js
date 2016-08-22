module.exports = function(Sequelize, DataTypes) {
    return Sequelize.define('Passport', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.UUIDV4,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        auth_key: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        strategy: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true
    }, {
        classMethods: {
            associate: function(models) {
                models.Passport.belongsTo(models.User);
            }
        }
    });
};
