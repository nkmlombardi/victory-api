var settings = require('../config')().settings

/**
 * Fetches all of Plaid's categories that are attached to transactions that they
 * provide us.
 * @param  {[type]} models          Database models to make requests with
 * @param  {[type]} plaid           Plaid client to make requests with
 * @param  {[type]} user_id         User that the token should be assigned to
 * @return {[type]}                 Categories injected into database
 */
var getCategories = async function(models, plaid, user_id) {
    var categoriesResponse = await plaid.getCategoriesAsync(settings.plaid.environment)
    var categories = await req.models.PlaidCategory.bulkCreate(
        await req.models.PlaidCategory.fromPlaidObject(categoriesResponse)
    )

    return {
        status: 'success',
        data: categories
    }
}

module.exports = getCategories
