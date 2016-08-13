/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_CURRENCY', {
    currency_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    currency_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    one_usd_equals: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    tableName: 'BB_CURRENCY'
  });
};
