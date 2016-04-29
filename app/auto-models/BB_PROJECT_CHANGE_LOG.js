/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_PROJECT_CHANGE_LOG', {
    project_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    role_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ldap_username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_dtm: {
      type: DataTypes.DATE,
      allowNull: false
    },
    created_user: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'setup'
    }
  }, {
    tableName: 'BB_PROJECT_CHANGE_LOG'
  });
};
