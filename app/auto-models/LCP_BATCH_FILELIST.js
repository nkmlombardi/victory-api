/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('LCP_BATCH_FILELIST', {
    batch_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    file_list: {
      type: DataTypes.TEXT,
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
    }
  }, {
    tableName: 'LCP_BATCH_FILELIST'
  });
};
