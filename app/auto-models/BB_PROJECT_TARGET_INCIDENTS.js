/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_PROJECT_TARGET_INCIDENTS', {
    client_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    incident_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dtm_incident_began: {
      type: DataTypes.DATE,
      allowNull: false
    },
    dtm_incident_ended: {
      type: DataTypes.DATE,
      allowNull: false
    },
    incident_duration_secs: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
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
    tableName: 'BB_PROJECT_TARGET_INCIDENTS'
  });
};
