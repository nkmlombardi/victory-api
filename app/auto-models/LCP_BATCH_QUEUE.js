/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('LCP_BATCH_QUEUE', {
    batch_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    internal_ip: {
      type: DataTypes.STRING,
      allowNull: false
    },
    node_status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    node_message: {
      type: DataTypes.STRING,
      allowNull: true
    },
    server_online: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'LCP_BATCH_QUEUE'
  });
};
