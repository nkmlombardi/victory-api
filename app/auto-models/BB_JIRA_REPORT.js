/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_JIRA_REPORT', {
    report_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    report_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    report_data: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'BB_JIRA_REPORT'
  });
};
