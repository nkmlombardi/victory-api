/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_DTP_TARGET', {
    dtp_replace_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    segment_order_num: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    segment_utf8_raw: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    translation_fingerprint: {
      type: DataTypes.STRING,
      allowNull: false
    },
    segment_word_count: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    suspect_flag: {
      type: DataTypes.STRING,
      allowNull: false
    },
    translator_notes: {
      type: DataTypes.TEXT,
      allowNull: true
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
    }
  }, {
    tableName: 'BB_DTP_TARGET'
  });
};
