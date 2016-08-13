/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OLPD_THREAD_CONTROL', {
    olpd_thread_control_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tc_thread_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tc_thread_running: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    tc_thread_started_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'OLPD_THREAD_CONTROL'
  });
};
