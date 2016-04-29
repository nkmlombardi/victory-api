/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SPOTCHECK_REPORT', {
    report_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    target_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    http_status: {
      type: DataTypes.INTEGER(5),
      allowNull: false
    },
    vhost_profile_lines: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    search_string_found: {
      type: DataTypes.ENUM('YES','NO','NULL'),
      allowNull: false,
      defaultValue: 'NO'
    },
    average_load_msecs: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    average_other_msecs: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    average_parse_trans_msecs: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    average_ole_msecs: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    old_average_other_msecs: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    old_average_parse_trans_msecs: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    old_average_ole_msecs: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    translated_page_bytes: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    hostname: {
      type: 'CHAR(50)',
      allowNull: false,
      defaultValue: ''
    },
    ip_address: {
      type: 'CHAR(50)',
      allowNull: false,
      defaultValue: ''
    },
    tm_type: {
      type: 'CHAR(10)',
      allowNull: false,
      defaultValue: ''
    },
    machine_load: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    created_utc: {
      type: DataTypes.DATE,
      allowNull: false
    },
    onelink_swrev: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    onelink_swdate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'SPOTCHECK_REPORT'
  });
};
