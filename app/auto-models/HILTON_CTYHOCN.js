/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('HILTON_CTYHOCN', {
    traffic_dtm: {
      type: DataTypes.DATE,
      allowNull: false
    },
    target_live_domain: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ctyhocn: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'HILTON_CTYHOCN'
  });
};
