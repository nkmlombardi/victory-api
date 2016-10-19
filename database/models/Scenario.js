module.exports = function(Sequelize, DataTypes) {
    return Sequelize.define('Scenario', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        user: {
            type: DataTypes.UUID
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
        classMethods: {
            associate: function(models) {
                // models.Budget.belongsTo(models.PlaidCategory);
                // models.Budget.hasMany(models.Budget);
                // models.Budget.belongsTo(models.User);
            }
        }
    });
};
