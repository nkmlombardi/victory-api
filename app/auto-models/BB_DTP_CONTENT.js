/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_DTP_CONTENT', {
    content_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    content_url_proto: {
      type: DataTypes.STRING,
      allowNull: true
    },
    content_url_prefix: {
      type: DataTypes.STRING,
      allowNull: true
    },
    content_url_path: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    content_md5: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    marked_translatable: {
      type: 'CHAR(1)',
      allowNull: false,
      defaultValue: '-'
    }
  }, {
    tableName: 'BB_DTP_CONTENT'
  });
};
