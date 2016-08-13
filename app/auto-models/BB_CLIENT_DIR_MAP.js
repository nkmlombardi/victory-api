/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_CLIENT_DIR_MAP', {
    client_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    client_dir: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'BB_CLIENT_DIR_MAP'
  });
};
