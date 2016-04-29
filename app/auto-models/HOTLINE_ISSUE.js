/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('HOTLINE_ISSUE', {
    issue_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    jira_project_key: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contact_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    issue_comment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    jira_ticket: {
      type: DataTypes.STRING,
      allowNull: true
    },
    created_by: {
      type: DataTypes.STRING,
      allowNull: true
    },
    created_dtm: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'HOTLINE_ISSUE'
  });
};
