/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_OLPD_PARAM_CLIENT_INSTANCE', {
    bb_olpd_param_client_instance_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    client_param_value: {
      type: DataTypes.STRING,
      allowNull: true
    },
    client_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    bb_olpd_param_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'BB_OLPD_PARAM_CLIENT_INSTANCE'
  });
};
