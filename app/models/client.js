module.exports = function(sequelize, DataTypes) {

    var Client = sequelize.define('client', {
        client_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        client_name: DataTypes.STRING,
        client_flag: DataTypes.STRING,

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
    }, {
        classMethods: {
            associate: function(models) {

                Client.belongsTo(models.project, {
                    through: 'ProjectClient',
                    foreignKey: 'client_id',
                    otherKey: 'project_id'
                });
            }
        }
    });

    return Client;
};
