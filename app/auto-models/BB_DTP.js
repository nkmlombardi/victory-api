/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_DTP', {
    dtp_object_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    source_language_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_transcribed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    object_md5_ext: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_dtm: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_user: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'setup'
    },
    lastmod_dtm: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lastmod_user: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'setup'
    }
  }, {
    tableName: 'BB_DTP'
  });
};
