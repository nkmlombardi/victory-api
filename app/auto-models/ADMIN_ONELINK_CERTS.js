/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ADMIN_ONELINK_CERTS', {
    virtual_host: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false
    },
    algorithm: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'sha1'
    }
  }, {
    tableName: 'ADMIN_ONELINK_CERTS'
  });
};
