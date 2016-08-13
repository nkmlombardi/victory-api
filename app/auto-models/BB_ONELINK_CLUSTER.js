/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_ONELINK_CLUSTER', {
    cluster_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    data_center: {
      type: DataTypes.STRING,
      allowNull: true
    },
    display_order: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    apache_conf: {
      type: DataTypes.STRING,
      allowNull: true
    },
    num_servers: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    num_clients: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    num_targets: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    is_locked: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    locked_by: {
      type: DataTypes.STRING,
      allowNull: true
    },
    locked_ip: {
      type: DataTypes.STRING,
      allowNull: true
    },
    locked_dtm: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lcp_down_email_list: {
      type: DataTypes.TEXT,
      allowNull: true
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
    tableName: 'BB_ONELINK_CLUSTER'
  });
};
