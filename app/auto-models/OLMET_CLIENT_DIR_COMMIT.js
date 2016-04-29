/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OLMET_CLIENT_DIR_COMMIT', {
    month_yyyy_mm: {
      type: 'CHAR(7)',
      allowNull: false
    },
    client_dir: {
      type: DataTypes.STRING,
      allowNull: false
    },
    file_path: {
      type: DataTypes.STRING,
      allowNull: false
    },
    file_extension: {
      type: 'CHAR(5)',
      allowNull: true
    },
    commit_revision: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    commit_user: {
      type: DataTypes.STRING,
      allowNull: false
    },
    commit_dtm: {
      type: DataTypes.DATE,
      allowNull: false
    },
    commit_comment: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'OLMET_CLIENT_DIR_COMMIT'
  });
};
