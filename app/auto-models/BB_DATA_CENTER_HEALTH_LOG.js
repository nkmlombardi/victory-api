/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_DATA_CENTER_HEALTH_LOG', {
    data_center_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    num_clients: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    num_clusters: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    num_servers: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    health_source: {
      type: DataTypes.STRING,
      allowNull: false
    },
    health_dtm: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'BB_DATA_CENTER_HEALTH_LOG'
  });
};
