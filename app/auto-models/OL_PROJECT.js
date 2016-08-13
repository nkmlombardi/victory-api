/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OL_PROJECT', {
    is_account_active: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1'
    },
    account_status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'ACTIVE'
    },
    project_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    production_center: {
      type: DataTypes.STRING,
      allowNull: true
    },
    quote_link: {
      type: DataTypes.STRING,
      allowNull: true
    },
    onelink_engineer: {
      type: DataTypes.STRING,
      allowNull: true
    },
    am_person: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ae_person: {
      type: DataTypes.STRING,
      allowNull: true
    },
    client_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    monthy_fee: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: '0.00'
    },
    currency_code: {
      type: 'CHAR(5)',
      allowNull: false,
      defaultValue: 'USD'
    },
    monthy_fee_usd: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: '0.00'
    },
    account_executive: {
      type: DataTypes.STRING,
      allowNull: true
    },
    staging_origin_host: {
      type: DataTypes.STRING,
      allowNull: true
    },
    live_origin_host: {
      type: DataTypes.STRING,
      allowNull: true
    },
    source_lang_code: {
      type: 'CHAR(6)',
      allowNull: true
    },
    initial_live_date: {
      type: DataTypes.STRING,
      allowNull: true
    },
    word_count: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    quote_request: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tm_dir: {
      type: DataTypes.STRING,
      allowNull: true
    },
    keywords: {
      type: DataTypes.STRING,
      allowNull: true
    },
    upgrade_status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '0:UNKNOWN'
    },
    upgrade_message: {
      type: DataTypes.STRING,
      allowNull: true
    },
    push_live_default: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'jkuefler'
    },
    qa_panel: {
      type: DataTypes.STRING,
      allowNull: true
    },
    has_msa: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    has_msla: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    contract_dtm: {
      type: DataTypes.DATE,
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
    tableName: 'OL_PROJECT'
  });
};
