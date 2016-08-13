module.exports = function(sequelize, DataTypes) {
    return sequelize.define('cluster', {
        cluster_name: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        data_center: {
            type: DataTypes.STRING,
            allowNull: true
        },
        display_order: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        apache_conf: {
            type: DataTypes.STRING,
            allowNull: true
        },
        num_servers: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        num_clients: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        num_targets: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        is_locked: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        locked_by: {
            type: DataTypes.STRING,
            allowNull: true
        },
        locked_ip: {
            type: DataTypes.STRING,
            allowNull: true
        },
        locked_dtm: {
            type: DataTypes.DATE,
            allowNull: true
        },
        lcp_down_email_list: {
            type: DataTypes.TEXT,
            allowNull: true
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
        tableName: 'BB_ONELINK_CLUSTER'
    });
};
