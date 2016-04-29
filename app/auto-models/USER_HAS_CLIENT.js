/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('USER_HAS_CLIENT', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    client_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'USER_HAS_CLIENT'
  });
};
