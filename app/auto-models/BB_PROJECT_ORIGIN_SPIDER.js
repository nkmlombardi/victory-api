/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_PROJECT_ORIGIN_SPIDER', {
    origin_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    spider_mode: {
      type: DataTypes.ENUM('disabled','continuous','recurring','once'),
      allowNull: false,
      defaultValue: 'disabled'
    },
    spider_freq: {
      type: DataTypes.ENUM('daily','weekly','monthly'),
      allowNull: false,
      defaultValue: 'weekly'
    },
    spider_day: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1'
    },
    spider_time: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1445356800'
    },
    top_level_urls: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    list_file_urls: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    manual_list_urls: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    tm_urls: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    site_map_urls: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    google_urls: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    send_delta_email: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    delta_threshold: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '5000'
    },
    email_im: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    email_pm: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    email_ole: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    email_others: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    include_nw_report: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    include_nw_segments: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    limit_email_freq: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    email_frequency: {
      type: DataTypes.ENUM('hour','day','week','month'),
      allowNull: false,
      defaultValue: 'day'
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
    spider_timezone: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'America/New_York'
    },
    spider_weekdays: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '1000000'
    },
    use_origin_private_domain: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    create_static_cache: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'BB_PROJECT_ORIGIN_SPIDER'
  });
};
