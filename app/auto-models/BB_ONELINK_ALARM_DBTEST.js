/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_ONELINK_ALARM_DBTEST', {
    a: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'BB_ONELINK_ALARM_DBTEST'
  });
};
