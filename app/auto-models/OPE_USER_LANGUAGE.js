/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OPE_USER_LANGUAGE', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    client_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    lang_code: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'OPE_USER_LANGUAGE'
  });
};
