/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_PROJECT_ORIGIN_SPIDER_URLS', {
    origin_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    url_type: {
      type: DataTypes.ENUM('top level','manual list','site map'),
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'BB_PROJECT_ORIGIN_SPIDER_URLS'
  });
};
