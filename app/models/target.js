module.exports = function(sequelize, DataTypes) {
    return sequelize.define('target', {
        target_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        origin_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        target_flag: {
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
        target_flag_comment: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        target_lang_code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        target_staging_domain: {
            type: DataTypes.STRING,
            allowNull: false
        },
        target_live_domain: {
            type: DataTypes.STRING,
            allowNull: true
        },
        target_live_link: {
            type: DataTypes.STRING,
            allowNull: true
        },
        target_live_subdir: {
            type: DataTypes.STRING,
            allowNull: true
        },
        target_live_cname: {
            type: DataTypes.STRING,
            allowNull: true
        },
        target_live_cname_auth: {
            type: DataTypes.STRING,
            allowNull: true
        },
        target_live_cdn_origin: {
            type: DataTypes.STRING,
            allowNull: true
        },
        target_live_cdn_vendor: {
            type: DataTypes.STRING,
            allowNull: true
        },
        target_comment: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        data_center: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cluster_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        piwik_site_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        test_plan: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        test_pre_build: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: '0'
        },
        target_thumbnail: {
            type: DataTypes.STRING,
            allowNull: true
        },
        is_monitoring_enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: '0'
        },
        initial_live_date: {
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
        search_fee: {
            type: DataTypes.INTEGER(10),
            allowNull: true
        },
        monthly_fee: {
            type: DataTypes.INTEGER(10),
            allowNull: true
        },
        is_live: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: '0'
        },
        is_onelink_checkable: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: '1'
        },
        client_hosted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: '0'
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
        tableName: 'BB_PROJECT_TARGET'
    });
};
