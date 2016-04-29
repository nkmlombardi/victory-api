/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_ONELINK_SERVER', {
    internal_ip: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cluster_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    unix_hostname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    friendly_hostname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    notification_level: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    data_center_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    physical_machine: {
      type: DataTypes.STRING,
      allowNull: true
    },
    virtual_slice: {
      type: DataTypes.STRING,
      allowNull: true
    },
    onelink_swrev: {
      type: DataTypes.STRING,
      allowNull: true
    },
    onelink_swdate: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lcp_swrev: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lcp_swdate: {
      type: DataTypes.STRING,
      allowNull: true
    },
    oltm_swrev: {
      type: DataTypes.STRING,
      allowNull: true
    },
    oltm_swdate: {
      type: DataTypes.STRING,
      allowNull: true
    },
    last_pull_dtm: {
      type: DataTypes.DATE,
      allowNull: true
    },
    apache_down_dtm: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_dtm: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_user: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'setup'
    },
    lastmod_dtm: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lastmod_user: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'setup'
    },
    health_code: {
      type: 'CHAR(1)',
      allowNull: false,
      defaultValue: 'G'
    },
    health_details: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    health_dtm: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'BB_ONELINK_SERVER'
  });
};
