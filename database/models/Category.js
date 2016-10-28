module.exports = function(Sequelize, DataTypes) {
    return Sequelize.define('Category', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        plaid_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        hierarchy: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        type: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
        tableName: 'Categories',
        classMethods: {
            associate: function(models) {
                // models.PlaidCategory.hasMany(models.PlaidTransaction, {
                //     foreignKey: 'category_id',
                //     targetKey: 'plaid_id',
                //     as: 'transactions'
                // });
                //
                // models.PlaidCategory.hasMany(models.Budget, {
                //     foreignKey: 'category_id',
                //     as: 'budgets'
                // });
            },

            // Take object from Plaid and map it to our model format
            fromPlaidObject: function(category) {
                return {
                    plaid_id: category.id,
                    hierarchy: category.hierarchy,
                    type: category.type
                };
            },

            // Take array from Plaid and map it to our models format
            fromPlaidArray: function(categories) {
                return categories.map(function(category) {
                    return {
                        plaid_id: category.id,
                        hierarchy: category.hierarchy,
                        type: category.type
                    };
                });
            }
        }
    });
};
