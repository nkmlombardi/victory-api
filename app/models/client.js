module.exports = function (Sequelize, db) {

    var Client = db.define('client', {
        client_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        client_name: Sequelize.STRING,
        client_flag: Sequelize.STRING
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

    console.log("I'm being loaded!");
};
