/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OL_LOV', {
    lov_list: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lov_group: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lov_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    display_order: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    display_img: {
      type: DataTypes.STRING,
      allowNull: true
    },
    display_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    display_style: {
      type: DataTypes.STRING,
      allowNull: true
    },
    hover_text: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    lov_flags: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    gp_lov_code: {
      type: DataTypes.STRING,
      allowNull: true
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
    tableName: 'OL_LOV'
  });
};
