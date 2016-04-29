/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('LCP_SECURITY', {
    client_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    user_name: {
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
    }
  }, {
    tableName: 'LCP_SECURITY'
  });
};
