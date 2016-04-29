/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_EXTERNAL_IP', {
    ip_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    unix_hostnames: {
      type: DataTypes.STRING,
      allowNull: true
    },
    friendly_hostnames: {
      type: DataTypes.STRING,
      allowNull: false
    },
    data_center_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    data_center: {
      type: DataTypes.STRING,
      allowNull: false
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
    tableName: 'BB_EXTERNAL_IP'
  });
};
