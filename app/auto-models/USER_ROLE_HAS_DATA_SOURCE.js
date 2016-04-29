/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('USER_ROLE_HAS_DATA_SOURCE', {
    user_role_code: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'USER_ROLE',
        key: 'user_role_code'
      }
    },
    data_source_code: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'data_source',
        key: 'data_source_code'
      }
    }
  }, {
    tableName: 'USER_ROLE_HAS_DATA_SOURCE'
  });
};
