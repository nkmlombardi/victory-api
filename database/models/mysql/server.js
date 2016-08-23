module.exports = function(sequelize, DataTypes) {
    return sequelize.define('server', {
        internal_ip: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cluster_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        unix_hostname: {
            type: DataTypes.STRING,
            allowNull: true
        },
        friendly_hostname: {
            type: DataTypes.STRING,
            allowNull: true,
            primaryKey: true
        },
        notification_level: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: '0'
        },
        data_center_code: {
            type: DataTypes.STRING,
            allowNull: true
        },
        physical_machine: {
            type: DataTypes.STRING,
            allowNull: true
        },
        virtual_slice: {
            type: DataTypes.STRING,
            allowNull: true
        },
        onelink_swrev: {
            type: DataTypes.STRING,
            allowNull: true
        },
        onelink_swdate: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lcp_swrev: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lcp_swdate: {
            type: DataTypes.STRING,
            allowNull: true
        },
        oltm_swrev: {
            type: DataTypes.STRING,
            allowNull: true
        },
        oltm_swdate: {
            type: DataTypes.STRING,
            allowNull: true
        },
        last_pull_dtm: {
            type: DataTypes.DATE,
            allowNull: true
        },
        apache_down_dtm: {
            type: DataTypes.DATE,
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
        health_code: {
            type: 'CHAR(1)',
            allowNull: false,
            defaultValue: 'G'
        },
        health_details: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        health_dtm: {
            type: DataTypes.DATE,
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
        tableName: 'BB_ONELINK_SERVER'
    });
};