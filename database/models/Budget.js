module.exports = function(Sequelize, DataTypes) {
    return Sequelize.define('Budget', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.UUID
        },
        category_id: {
            type: DataTypes.INTEGER
            // references: {
            //     model: 'PlaidCategories',
            //     key: 'plaid_id'
            // }
        },
        scenario_id: {
            type: DataTypes.UUID
        },
        allowance: {
            type: DataTypes.DOUBLE,
            defaultValue: 0
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
        classMethods: {
            associate: function(models) {
                models.Budget.hasOne(models.PlaidCategory, {
                    foreignKey: 'category_id',
                    targetKey: 'id'
                });

                models.Budget.belongsTo(models.Scenario, {
                    foreignKey: 'scenario_id',
                    targetKey: 'id'
                });
            }
        }
    });
};
