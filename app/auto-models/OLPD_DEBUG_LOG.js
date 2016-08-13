/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OLPD_DEBUG_LOG', {
    olpd_debug_log_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    dl_pid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    dl_script: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dl_created: {
      type: DataTypes.DATE,
      allowNull: true
    },
    tl_msg_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dl_msg_text: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'OLPD_DEBUG_LOG'
  });
};
