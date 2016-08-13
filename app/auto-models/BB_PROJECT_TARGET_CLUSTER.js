/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_PROJECT_TARGET_CLUSTER', {
    target_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    cluster_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'BB_PROJECT_TARGET_CLUSTER'
  });
};
