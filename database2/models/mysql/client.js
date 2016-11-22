var Client = function(sequelize, DataTypes) {
    return sequelize.define('client', {
        client_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        client_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        client_flag: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'GREEN'
        },
        is_hidden: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: '0'
        },
        is_inactive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: '0'
        },
        is_marketing_ok: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '1'
        },
        alexa_domain: {
            type: DataTypes.STRING,
            allowNull: true
        },
        alexa_rank_us: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        alexa_rank_world: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        client_comment: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        notification_level: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: '0'
        },
        monthly_fee_comment: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lcp_enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: '1'
        },
        lcp_threshold: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        created_dtm: {
            type: DataTypes.DATE,
            allowNull: true
        },
        created_user: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'setup'
        },
        lastmod_dtm: {
            type: DataTypes.DATE,
            allowNull: true
        },
        lastmod_user: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'setup'
        },
        monthly_fee_local: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            defaultValue: '0.00'
        },
        monthly_fee_currency_code: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'USD'
        },
        client_hash: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,

        // don't delete database entries but set the newly added attribute deletedAt
        // to the current date (when deletion was done). paranoid will only work if
        // timestamps are enabled
        paranoid: true,

        // don't use camelcase for automatically added attributes but underscore style
        // so updatedAt will be updated_at
        underscored: true,

        // disable the modification of table names; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,

        // define the table's name
        tableName: 'BB_CLIENT'
    });
};

module.exports = Client;
