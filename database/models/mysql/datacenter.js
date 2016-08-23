module.exports = function(sequelize, DataTypes) {
    return sequelize.define('datacenter', {
        data_center_code: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        data_center_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        is_active: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: '1'
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
        tableName: 'BB_DATA_CENTER'
    });
};
