/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('LCP_BATCH', {
    batch_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    request_id: {
      type: DataTypes.INTEGER(11),
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
    cluster_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    when_to_run: {
      type: DataTypes.DATE,
      allowNull: false
    },
    batch_status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    batch_message: {
      type: DataTypes.STRING,
      allowNull: true
    },
    started_dtm: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lastmod_dtm: {
      type: DataTypes.DATE,
      allowNull: true
    },
    restarted_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    created_ip: {
      type: DataTypes.STRING,
      allowNull: true
    },
    failed_status: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    is_staging_req: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'LCP_BATCH'
  });
};
