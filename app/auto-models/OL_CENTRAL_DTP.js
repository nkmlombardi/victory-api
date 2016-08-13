/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OL_CENTRAL_DTP', {
    content_md5: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image_width: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    image_height: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    content_url_ext: {
      type: DataTypes.STRING,
      allowNull: false
    },
    marked_translatable: {
      type: 'CHAR(1)',
      allowNull: false,
      defaultValue: '-'
    },
    created_ip: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_user: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_dtm: {
      type: DataTypes.DATE,
      allowNull: false
    },
    modified_ip: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastmod_user: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastmod_dtm: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'OL_CENTRAL_DTP'
  });
};
