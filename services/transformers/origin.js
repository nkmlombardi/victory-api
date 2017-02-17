var Transformer = require('./transformer')
var moment = require('moment')

class OriginTransformer extends Transformer {

    /**
     * Method used to transform a fetched singleton
     * @param {Object} singleton information in api format
     * @returns {Object} The transformed singleton
     */
    static singleton (singleton) {
        return {
            id: singleton.origin_id,
            domain: singleton.origin_live_domain || null,
            locale: singleton.source_lang_code || null,
            importance: Math.ceil((singleton.notification_level + 1) / 2) || null,
            created_at: moment(singleton.created_dtm).isValid() ? moment(singleton.created_dtm).format() : null,
            updated_at: moment(singleton.lastmod_dtm).isValid() ? moment(singleton.lastmod_dtm).format() : null
        }
    }
}

module.exports = OriginTransformer
