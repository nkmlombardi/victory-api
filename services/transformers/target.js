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


    /**
     * Method used to transform a fetched singleton
     * @param {Object} singleton information in api format
     * @returns {Object} The transformed singleton
     */
    static health (health) {
        return {
            origin_id: health.origin_id,
            score: health.statistic_health_score,
            created_at: moment(health.health_dtm).isValid() ? moment(health.health_dtm).format() : null
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
            created_at: moment(dispatch.noc_dispatch_start_dtm).isValid()
                ? moment(dispatch.noc_dispatch_start_dtm).format()
                : null,
            considered_at: moment(dispatch.noc_dispatch_first_considered_dtm).isValid()
                ? moment(dispatch.noc_dispatch_first_considered_dtm).format()
                : null,
            last_considered_at: moment(dispatch.noc_dispatch_last_considered_dtm).isValid()
                ? moment(dispatch.noc_dispatch_last_considered_dtm).format()
                : null,
            approved_at: moment(dispatch.noc_dispatch_approved_dtm).isValid()
                ? moment(dispatch.noc_dispatch_approved_dtm).format()
                : null,
            rejected_at: moment(dispatch.noc_dispatch_rejected_dtm).isValid()
                ? moment(dispatch.noc_dispatch_rejected_dtm).format()
                : null,
            created_reason: dispatch.noc_dispatch_reason,
            approved_reason: dispatch.noc_pager_reason,
            approval_interval: dispatch.noc_dispatch_seconds_to_approve
        }
    }
}

module.exports = TargetTransformer
