/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OL_PROJECT_TARGET', {
    project_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    target_lang_code: {
      type: 'CHAR(6)',
      allowNull: true
    },
    status_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    staging_virtual_host: {
      type: DataTypes.STRING,
      allowNull: true
    },
    live_virtual_host: {
      type: DataTypes.STRING,
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
    tableName: 'OL_PROJECT_TARGET'
  });
};
