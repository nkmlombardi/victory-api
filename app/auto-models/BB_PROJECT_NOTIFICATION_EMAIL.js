/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_PROJECT_NOTIFICATION_EMAIL', {
    project_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    email_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    comment: {
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
    tableName: 'BB_PROJECT_NOTIFICATION_EMAIL'
  });
};
