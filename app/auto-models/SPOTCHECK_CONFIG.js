/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SPOTCHECK_CONFIG', {
    config_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    project_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    project_enabled: {
      type: DataTypes.ENUM('YES','NO'),
      allowNull: false
    },
    project_emails_to: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'SPOTCHECK_CONFIG'
  });
};
