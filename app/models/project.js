module.exports = function(sequelize, DataTypes) {
    return sequelize.define('project', {
        project_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        client_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'BB_CLIENT',
                key: 'client_id'
            }
        },
        project_name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'WEBSITE'
        },
        project_flag: {
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
        jira_project_key1: {
            type: DataTypes.STRING,
            allowNull: true
        },
        jira_project_key2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        production_center: {
            type: DataTypes.STRING,
            allowNull: true
        },
        jira_quote_key: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ae_username: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '0'
        },
        se_username: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '0'
        },
        am_username: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '0'
        },
        ole_username: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '0'
        },
        pm_username: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '0'
        },
        review_ole_username: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '0'
        },
        maintained_by: {
            type: DataTypes.STRING,
            allowNull: true
        },
        monthy_fee: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            defaultValue: '0.00'
        },
        currency_code: {
            type: 'CHAR(5)',
            allowNull: false,
            defaultValue: 'USD'
        },
        monthy_fee_usd: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            defaultValue: '0.00'
        },
        has_msa: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: '0'
        },
        has_msla: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: '0'
        },
        iko_dtm: {
            type: DataTypes.DATE,
            allowNull: true
        },
        xko_dtm: {
            type: DataTypes.DATE,
            allowNull: true
        },
        tm_dir: {
            type: DataTypes.STRING,
            allowNull: true
        },
        tms_db_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        tms_db_user: {
            type: DataTypes.STRING,
            allowNull: true
        },
        tms_db_pass: {
            type: DataTypes.STRING,
            allowNull: true
        },
        word_count: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        original_word_count: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        confluence_link: {
            type: DataTypes.STRING,
            allowNull: true
        },
        staging_server: {
            type: DataTypes.STRING,
            allowNull: false
        },
        industry_code: {
            type: DataTypes.STRING,
            allowNull: true
        },
        keywords: {
            type: DataTypes.STRING,
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
        tableName: 'BB_PROJECT'
    }, {
        classMethods: {
            associate: function(models) {
                console.log('Models: ', models);

                Project.hasOne(models.client, {
                    foreignKey: 'client_id'
                });
            }
        }
    });
};
