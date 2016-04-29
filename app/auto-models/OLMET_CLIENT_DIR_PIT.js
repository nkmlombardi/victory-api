/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OLMET_CLIENT_DIR_PIT', {
    pit_yyyy_mm_dd: {
      type: 'CHAR(10)',
      allowNull: true
    },
    month_yyyy_mm: {
      type: 'CHAR(7)',
      allowNull: false
    },
    client_dir: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_poc: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    num_profiles: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    num_dtp_files: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    num_other_files: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    num_tm_files: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    num_tm_dirs: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    file_system_mb: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'OLMET_CLIENT_DIR_PIT'
  });
};
