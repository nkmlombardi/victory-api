/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_PROJECT_ORIGIN_MONITOR', {
    origin_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    project_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    origin_domain: {
      type: DataTypes.STRING,
      allowNull: false
    },
    monitor_uri: {
      type: DataTypes.STRING,
      allowNull: true
    },
    monitor_comment: {
      type: DataTypes.STRING,
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
    tableName: 'BB_PROJECT_ORIGIN_MONITOR'
  });
};
