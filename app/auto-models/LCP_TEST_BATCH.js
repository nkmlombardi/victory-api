/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('LCP_TEST_BATCH', {
    batch_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    batch_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    batch_message: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'LCP_TEST_BATCH'
  });
};
