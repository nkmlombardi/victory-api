/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_SNF_REVERSE_TM_QUERY', {
    remote_host: {
      type: DataTypes.STRING,
      allowNull: false
    },
    raw_text_utf8: {
      type: DataTypes.STRING,
      allowNull: true
    },
    source_lang_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    target_lang_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    usage_count: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    status_code: {
      type: DataTypes.STRING,
      allowNull: false
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
    tableName: 'BB_SNF_REVERSE_TM_QUERY'
  });
};
