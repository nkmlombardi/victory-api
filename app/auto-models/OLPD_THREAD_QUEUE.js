/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OLPD_THREAD_QUEUE', {
    olpd_thread_queue_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tq_folder: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tq_langs: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tq_status: {
      type: DataTypes.ENUM('waiting','working','done','error'),
      allowNull: true,
      defaultValue: 'waiting'
    }
  }, {
    tableName: 'OLPD_THREAD_QUEUE'
  });
};
