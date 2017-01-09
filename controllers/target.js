module.exports = {
    getTargets: async function(req, res, next) {
        return res.json({
            status: req.status.success,
            data: await req.connection.query(`SELECT * FROM BB_PROJECT_TARGET`)
        })
    },

    getTarget: async function(req, res, next) {
        return res.json({
            status: req.status.success,
            data: await req.connection.query(`SELECT * FROM BB_PROJECT_TARGET WHERE target_id = ${req.params.id}`)
        })
    }
}
