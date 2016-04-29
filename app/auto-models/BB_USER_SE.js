/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_USER_SE', {
    ldap_username: {
      type: DataTypes.STRING,
      allowNull: true
    },
    role_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    location_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    uber_user: {
      type: DataTypes.STRING,
      allowNull: true
    },
    is_superuser: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    is_allowed_lcp: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tpt_email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tpt_phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tpt_phone_ext: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gmail: {
      type: DataTypes.STRING,
      allowNull: true
    },
    skype: {
      type: DataTypes.STRING,
      allowNull: true
    },
    created_dtm: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_user: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastmod_dtm: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lastmod_user: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'BB_USER_SE'
  });
};
