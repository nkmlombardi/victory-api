/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OCP_USER_DIALOG', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'OCP_USER_DIALOG'
  });
};
