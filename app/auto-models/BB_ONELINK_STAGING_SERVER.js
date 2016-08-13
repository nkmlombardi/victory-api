/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_ONELINK_STAGING_SERVER', {
    internal_ip: {
      type: DataTypes.STRING,
      allowNull: false
    },
    staging_server: {
      type: DataTypes.STRING,
      allowNull: false
    },
    unix_hostname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    friendly_hostname: {
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
    }
  }, {
    tableName: 'BB_ONELINK_STAGING_SERVER'
  });
};
