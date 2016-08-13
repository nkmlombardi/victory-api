/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OLMET_SCHEMA_VERSION', {
    schema_version: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'OLMET_SCHEMA_VERSION'
  });
};
