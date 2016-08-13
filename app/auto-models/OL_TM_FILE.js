/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OL_TM_FILE', {
    tm_dir: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lang_dir: {
      type: DataTypes.STRING,
      allowNull: false
    },
    file_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    segment_count: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    total_word_count: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    untranslated_word_count: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    translated_percent: {
      type: DataTypes.DECIMAL,
      allowNull: false
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
    lastmod_revision: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'OL_TM_FILE'
  });
};
