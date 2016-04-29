/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OL_VHOST_TO_DATACENTER', {
    virtual_host: {
      type: DataTypes.STRING,
      allowNull: false
    },
    data_center: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'OL_VHOST_TO_DATACENTER'
  });
};
