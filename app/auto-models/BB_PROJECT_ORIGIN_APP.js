/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_PROJECT_ORIGIN_APP', {
    origin_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    tracker_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    origin_uri: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'BB_PROJECT_ORIGIN_APP'
  });
};
