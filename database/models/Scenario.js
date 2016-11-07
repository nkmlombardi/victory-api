module.exports = function(Sequelize, DataTypes) {
    return Sequelize.define('Scenario', {
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
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
        classMethods: {
            associate: function(models) {
                models.Scenario.hasMany(models.Budget, {
                    as: 'budgets'
                })
            }
        }
    })
}
