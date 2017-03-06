module.exports = function(Sequelize, DataTypes) {
    return Sequelize.define('Token', {
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

        public_token: {
            type: DataTypes.STRING,
            allowNull: false
        },

        access_token: {
            type: DataTypes.STRING,
            allowNull: false
        },

        last_account_pull: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NULL
        },

        last_transaction_pull: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NULL
        },

        source: {
            type: DataTypes.ENUM(
                'plaid',
                'salt_edge'
            ),
            allowNull: false
        },

        source_raw: {
            type: DataTypes.JSON
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
        classMethods: {
            associate: function(models) {
                models.Token.belongsTo(models.User)
            }
        }
    })
}
