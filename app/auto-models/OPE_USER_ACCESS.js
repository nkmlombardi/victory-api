/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OPE_USER_ACCESS', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    project_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    lang_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_user: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'setup'
    },
    created_dtm: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'OPE_USER_ACCESS'
  });
};
