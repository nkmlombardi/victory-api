/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_DTP_REPLACE', {
    dtp_replace_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    dtp_object_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    project_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    is_translated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    source_url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    target_language_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    context_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dtp_state_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    svn_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    svn_rev: {
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
    tableName: 'BB_DTP_REPLACE'
  });
};
