/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_CLIENT_EMAIL_NOTIFICATION', {
    client_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    email_address: {
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
    tableName: 'BB_CLIENT_EMAIL_NOTIFICATION'
  });
};
