/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_PROJECT_ORIGIN_HEALTH', {
    origin_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    monitored_url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    monitored_url_md5: {
      type: 'CHAR(32)',
      allowNull: false
    },
    response_code: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '200'
    },
    response_msecs: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    response_text: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    grep_string: {
      type: DataTypes.STRING,
      allowNull: true
    },
    grep_error: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    health_source: {
      type: DataTypes.STRING,
      allowNull: false
    },
    health_region: {
      type: DataTypes.STRING,
      allowNull: false
    },
    health_dtm: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'BB_PROJECT_ORIGIN_HEALTH'
  });
};
