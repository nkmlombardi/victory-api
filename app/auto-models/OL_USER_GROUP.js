/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OL_USER_GROUP', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_group: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
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
    tableName: 'OL_USER_GROUP'
  });
};
