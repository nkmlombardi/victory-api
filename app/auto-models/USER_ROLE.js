/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('USER_ROLE', {
    user_role_code: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_role_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_role_widget_group: {
      type: DataTypes.ENUM('cust','ing','dev'),
      allowNull: true
    }
  }, {
    tableName: 'USER_ROLE'
  });
};
