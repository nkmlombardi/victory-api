/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_ONELINK_SERVER_HEALTH_LOG', {
    internal_ip: {
      type: DataTypes.STRING,
      allowNull: false
    },
    statistic_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    statistic_alarm: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    statistic_severity: {
      type: DataTypes.INTEGER(1),
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
    tableName: 'BB_ONELINK_SERVER_HEALTH_LOG'
  });
};
