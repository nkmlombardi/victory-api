/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('LCP_CREDENTIALS', {
    user_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    must_reset_pwd: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    created_dtm: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_user: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'setup'
    }
  }, {
    tableName: 'LCP_CREDENTIALS'
  });
};
