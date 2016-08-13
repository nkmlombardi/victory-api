/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SPOTCHECK_TARGET', {
    target_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    origin_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    target_protocol: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    target_live_domain: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    target_uri: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    search_string: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cookies: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    target_lang_folder: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    spikes_other: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    spikes_parse_trans: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    spikes_ole: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    spikes_down: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    target_enabled: {
      type: DataTypes.ENUM('YES','NO'),
      allowNull: true,
      defaultValue: 'YES'
    }
  }, {
    tableName: 'SPOTCHECK_TARGET'
  });
};
