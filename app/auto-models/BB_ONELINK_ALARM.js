/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_ONELINK_ALARM', {
    alarm_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    internal_ip: {
      type: DataTypes.STRING,
      allowNull: true
    },
    target_live_domain: {
      type: DataTypes.STRING,
      allowNull: true
    },
    synopsis: {
      type: DataTypes.STRING,
      allowNull: false
    },
    notification_level: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    clients: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    resolved_dtm: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dispatched_dtm: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lastseen_dtm: {
      type: DataTypes.DATE,
      allowNull: true
    },
    triggered_count: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    alarm_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    stat_list: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created_dtm: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'BB_ONELINK_ALARM'
  });
};
