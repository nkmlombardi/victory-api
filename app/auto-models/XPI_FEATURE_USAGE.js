/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('XPI_FEATURE_USAGE', {
    ldap_username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    feature_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    feature_count: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    last_used_dtm: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'XPI_FEATURE_USAGE'
  });
};
