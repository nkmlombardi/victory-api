/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OL_VHOST_DNS', {
    virtual_host: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ip_address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    canonical_name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'OL_VHOST_DNS'
  });
};
