module.exports = function(Sequelize, DataTypes) {
    return Sequelize.define('PlaidCategory', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        plaid_id: {
            type: DataTypes.STRING,
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
        tableName: 'PlaidCategories',
        classMethods: {
            associate: function(models) {
                // models.plaidToken.belongsTo(models.user);
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
