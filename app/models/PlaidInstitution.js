module.exports = function(Sequelize, DataTypes) {
    return Sequelize.define('PlaidInstitution', {
        plaid_id: {
            type: DataTypes.STRING,
            allowNull: false,
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

        // Attributes
        name: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true
    });
};
