/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_CURRENCY_CODE', {
    lov_list: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lov_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lov_comment: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'BB_CURRENCY_CODE'
  });
};
