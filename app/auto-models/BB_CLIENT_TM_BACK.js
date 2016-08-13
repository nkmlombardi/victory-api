/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_CLIENT_TM_BACK', {
    tm_dir: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tm_lang_dir: {
      type: DataTypes.STRING,
      allowNull: false
    },
    port_number: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    who_first_commit: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dtm_first_commit: {
      type: DataTypes.DATE,
      allowNull: false
    },
    rev_first_commit: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    who_last_commit: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dtm_last_commit: {
      type: DataTypes.DATE,
      allowNull: false
    },
    rev_last_commit: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    num_commits: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    committer_count: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    committer_list: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'BB_CLIENT_TM_BACK'
  });
};
