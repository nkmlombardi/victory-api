/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_SPOTCHECK', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    invocation_id: {
      type: 'CHAR(50)',
      allowNull: false
    },
    vhost_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vhost: {
      type: 'CHAR(50)',
      allowNull: false
    },
    vhost_profile_lines: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    vhost_profile_cksum: {
      type: 'CHAR(50)',
      allowNull: false
    },
    translated_page_bytes: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    average_parse_msecs: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    average_translate_msecs: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    onelink_swrev: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    onelink_swdate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    hostname: {
      type: 'CHAR(50)',
      allowNull: false
    },
    ip_address: {
      type: 'CHAR(50)',
      allowNull: false
    },
    tm_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cpu_num_cores: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    cpu_model_name: {
      type: 'CHAR(50)',
      allowNull: false
    },
    cpu_clockspeed_mhz: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    cpu_cache_kb: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    ram_gigs: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    disk_speed_mbs: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    machine_load: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    created_utc: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'BB_SPOTCHECK'
  });
};
