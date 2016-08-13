/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_TM_DIR_COUNT_RESULTS', {
    tm_dir: {
      type: DataTypes.STRING,
      allowNull: false
    },
    language_dir: {
      type: DataTypes.STRING,
      allowNull: false
    },
    trans_percent: {
      type: DataTypes.STRING,
      allowNull: false
    },
    words: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    segments: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'BB_TM_DIR_COUNT_RESULTS'
  });
};
