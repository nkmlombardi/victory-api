/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ONELINK_KLOG', {
    internal_ip: {
      type: DataTypes.STRING,
      allowNull: false
    },
    klog_level: {
      type: DataTypes.STRING,
      allowNull: false
    },
    application_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    application_pid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    fcgi_request_num: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    klog_utc_dtm: {
      type: DataTypes.DATE,
      allowNull: false
    },
    klog_local_dtm: {
      type: DataTypes.DATE,
      allowNull: false
    },
    klog_message: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'ONELINK_KLOG'
  });
};
