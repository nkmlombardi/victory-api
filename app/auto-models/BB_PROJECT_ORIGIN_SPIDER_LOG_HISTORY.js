/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_PROJECT_ORIGIN_SPIDER_LOG_HISTORY', {
    origin_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    origin_site_domain: {
      type: DataTypes.STRING,
      allowNull: false
    },
    started_dtm: {
      type: DataTypes.DATE,
      allowNull: false
    },
    started_ip: {
      type: DataTypes.STRING,
      allowNull: false
    },
    started_user: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'system'
    },
    finished_dtm: {
      type: DataTypes.DATE,
      allowNull: false
    },
    finished_status_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    kill_request_user: {
      type: DataTypes.STRING,
      allowNull: true
    },
    duration_seconds: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    num_urls: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    num_segments: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    total_words: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    unique_words: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'BB_PROJECT_ORIGIN_SPIDER_LOG_HISTORY'
  });
};
