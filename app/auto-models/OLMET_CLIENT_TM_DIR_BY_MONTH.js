/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OLMET_CLIENT_TM_DIR_BY_MONTH', {
    month_yyyy_mm: {
      type: 'CHAR(7)',
      allowNull: false
    },
    client_dir: {
      type: DataTypes.STRING,
      allowNull: false
    },
    client_tm_dir: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tm_files_new: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    words_new: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    words_translated: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    words_retranslated: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    average_wph: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    projecta_usd_billed: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: '0.00'
    },
    projecta_usd_paid: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: '0.00'
    }
  }, {
    tableName: 'OLMET_CLIENT_TM_DIR_BY_MONTH'
  });
};
