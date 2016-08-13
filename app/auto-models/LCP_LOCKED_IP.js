/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('LCP_LOCKED_IP', {
    ip_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    locked_dtm: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'LCP_LOCKED_IP'
  });
};
