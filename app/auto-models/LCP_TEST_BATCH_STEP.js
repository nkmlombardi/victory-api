/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('LCP_TEST_BATCH_STEP', {
    batch_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    step_num: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    step_command: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'LCP_TEST_BATCH_STEP'
  });
};
