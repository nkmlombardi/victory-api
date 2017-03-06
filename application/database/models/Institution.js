module.exports = function(Sequelize, DataTypes) {
    return Sequelize.define('Institution', {
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
            type: DataTypes.STRING
        },

        source: {
            type: DataTypes.ENUM(
                'plaid',
                'salt_edge'
            ),
            allowNull: false
        },

        source_raw: {
            type: DataTypes.JSON,
            allowNull: false
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true
    })
}
