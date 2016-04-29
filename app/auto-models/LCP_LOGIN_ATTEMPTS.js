/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('LCP_LOGIN_ATTEMPTS', {
    attempt_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ip_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    attempt_dtm: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'LCP_LOGIN_ATTEMPTS'
  });
};
