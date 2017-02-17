var Transformer = require('./transformer')
var moment = require('moment')

class TargetTransformer extends Transformer {

    /**
     * Method used to transform a fetched singleton
     * @param {Object} singleton information in api format
     * @returns {Object} The transformed singleton
     */
    static singleton (singleton) {
        return {
            id: singleton.target_id,
            domain: singleton.target_live_domain || singleton.target_live_link || singleton.target_staging_domain,
            locale: singleton.target_lang_code || null,
            created_at: moment(singleton.created_dtm).isValid() ? moment(singleton.created_dtm).format() : null,
            updated_at: moment(singleton.lastmod_dtm).isValid() ? moment(singleton.lastmod_dtm).format() : null
        }
    }
}

module.exports = TargetTransformer
