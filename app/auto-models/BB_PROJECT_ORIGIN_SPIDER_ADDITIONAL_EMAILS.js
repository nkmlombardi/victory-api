/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_PROJECT_ORIGIN_SPIDER_ADDITIONAL_EMAILS', {
    origin_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    email_address: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'BB_PROJECT_ORIGIN_SPIDER_ADDITIONAL_EMAILS'
  });
};
