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
            importance: singleton.notification_level,
            created_at: moment(singleton.created_dtm).isValid() ? moment(singleton.created_dtm).format() : null,
            updated_at: moment(singleton.lastmod_dtm).isValid() ? moment(singleton.lastmod_dtm).format() : null
        }
    }


    /**
     * Method used to transform a fetched singleton
     * @param {Object} singleton information in api format
     * @returns {Object} The transformed singleton
     */
    static health (health) {
        return {
            origin_id: health.origin_id,
            created_at: moment(singleton.health_dtm).isValid() ? moment(singleton.health_dtm).format() : null
        }
    }


    /**
     * Method used to transform a fetched singleton
     * @param {Object} singleton information in api format
     * @returns {Object} The transformed singleton
     */
    static dispatch (dispatch) {
        return {
            origin_id: dispatch.noc_dispatch_object_id,
            created_at: moment(singleton.noc_dispatch_start_dtm).isValid()
                ? moment(singleton.noc_dispatch_start_dtm).format()
                : null,
            considered_at: moment(singleton.noc_dispatch_first_considered_dtm).isValid()
                ? moment(singleton.noc_dispatch_first_considered_dtm).format()
                : null,
            last_considered_at: moment(singleton.noc_dispatch_last_considered_dtm).isValid()
                ? moment(singleton.noc_dispatch_last_considered_dtm).format()
                : null,
            approved_at: moment(singleton.noc_dispatch_approved_dtm).isValid() 
                ? moment(singleton.noc_dispatch_approved_dtm).format()
                : null,
            rejected_at: moment(singleton.noc_dispatch_rejected_dtm).isValid()
                ? moment(singleton.noc_dispatch_rejected_dtm).format()
                : null,
            created_reason: singleton.noc_dispatch_reason,
            approved_reason: singleton.noc_pager_reason,
            approval_interval: singleton.noc_dispatch_seconds_to_approve
        }
    }

}

module.exports = OriginTransformer
