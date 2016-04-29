/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BB_CLIENT_CONTRACT_LANG', {
    language_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    contract_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    lang_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    services_fee: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    monthly_fee: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    search_fee: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    other_fees: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    is_dead: {
      type: DataTypes.BOOLEAN,
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
    tableName: 'BB_CLIENT_CONTRACT_LANG'
  });
};
