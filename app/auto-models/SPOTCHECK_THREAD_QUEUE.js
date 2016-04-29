/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SPOTCHECK_THREAD_QUEUE', {
    tc_thread_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tc_thread_name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    tc_thread_project: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    tc_thread_started_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    tc_thread_target: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'SPOTCHECK_THREAD_QUEUE'
  });
};
