var Transformer = require('./transformer')
var moment = require('moment')

class ClientTransformer extends Transformer {

    /**
     * Method used to transform a fetched singleton
     * @param {Object} singleton information in api format
     * @returns {Object} The transformed singleton
     */
    static singleton (singleton) {
        return {
            id: singleton.client_id,
            name: singleton.client_name,
            hash: singleton.client_hash,
            importance: singleton.notification_level,
            created_at: moment(singleton.created_dtm).isValid() ? moment(singleton.created_dtm).format() : null,
            updated_at: moment(singleton.lastmod_dtm).isValid() ? moment(singleton.lastmod_dtm).format() : null
        }
    }
}

module.exports = ClientTransformer