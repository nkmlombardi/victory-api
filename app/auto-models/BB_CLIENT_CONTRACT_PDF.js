/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_CLIENT_CONTRACT_PDF', {
    client_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    contract_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    pdf_filename: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pdf_agreement_type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'BB_CLIENT_CONTRACT_PDF'
  });
};
