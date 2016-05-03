module.exports = function(sequelize, DataTypes) {
    return sequelize.define('origin', {
        origin_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        project_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        origin_flag: {
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
        is_white_label: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: '0'
        },
        source_lang_code: {
            type: 'CHAR(6)',
            allowNull: true
        },
        origin_live_domain: {
            type: DataTypes.STRING,
            allowNull: false
        },
        origin_live_cdn_domain: {
            type: DataTypes.STRING,
            allowNull: true
        },
        origin_live_cdn_vendor: {
            type: DataTypes.STRING,
            allowNull: true
        },
        origin_live_http: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '80'
        },
        origin_live_https: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        origin_private_domain: {
            type: DataTypes.STRING,
            allowNull: true
        },
        origin_private_http: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        origin_private_https: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        origin_https_only: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        origin_monitor_homepage: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: '1'
        },
        origin_monitoring_comment: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        origin_thumbnail: {
            type: DataTypes.STRING,
            allowNull: true
        },
        mobile_site_code: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
            DESKTOP: ''
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
        tableName: 'BB_PROJECT_ORIGIN'
    });
};
