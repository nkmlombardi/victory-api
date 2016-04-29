/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_CLIENT_FILES', {
    file_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    client_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    project_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    file_path: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_by: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'setup'
    },
    created_dtm: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'BB_CLIENT_FILES'
  });
};
