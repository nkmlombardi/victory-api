/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('LCP_BATCH_QUEUE_PROCESS', {
    batch_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    internal_ip: {
      type: DataTypes.STRING,
      allowNull: false
    },
    step_num: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    step_status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    step_message: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'LCP_BATCH_QUEUE_PROCESS'
  });
};
