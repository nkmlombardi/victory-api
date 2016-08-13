/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_PROJECT_ORIGIN_SPIDER_LOG', {
    origin_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    started_dtm: {
      type: DataTypes.DATE,
      allowNull: false
    },
    started_ip: {
      type: DataTypes.STRING,
      allowNull: false
    },
    started_pid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    finished_dtm: {
      type: DataTypes.DATE,
      allowNull: true
    },
    duration_seconds: {
      type: DataTypes.INTEGER(11),
      allowNull: true
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
    },
    kill_request: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    kill_request_dtm: {
      type: DataTypes.DATE,
      allowNull: true
    },
    kill_request_user: {
      type: DataTypes.STRING,
      allowNull: true
    },
    finished_status_code: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'BB_PROJECT_ORIGIN_SPIDER_LOG'
  });
};
