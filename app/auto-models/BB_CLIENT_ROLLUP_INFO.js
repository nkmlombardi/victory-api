/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_CLIENT_ROLLUP_INFO', {
    client_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    jira_project_key1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    jira_project_key2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    production_center: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ae_username: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '0'
    },
    am_username: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '0'
    },
    ole_username: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '0'
    },
    pm_username: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '0'
    },
    se_username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    review_ole_username: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '0'
    },
    tm_dir: {
      type: DataTypes.STRING,
      allowNull: true
    },
    industry_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    current_word_count: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    original_word_count: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'BB_CLIENT_ROLLUP_INFO'
  });
};
