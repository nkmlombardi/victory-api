module.exports = {
    /**
     * A regex checking if the value is a number.  format is /pattern/, "\" escapes special chars.
     * "^" checks beginning of input for the next character.
     * "?" matches the previous character only 0 or 1 times;
     * "^\+?"" matches a single plus sign at the beginning of input,
     * but not multiple
     * "(0|[1-9]\d*)" matches either 0, or 1 through 9, then [0-9] 0 or
     * more times
     * "$" makes the previous part of the pattern match at end of input
     *
     * Checks if the value is a valid number(ie. a solo 0, or starts with 1 through 9
     * and only contains digits)
     * Used for Client and Origin controllers
     * @param  {string}  value [an identifier]
     * @return {Boolean}       [description]
     */
    isNumber: function (value) {
        return /(0|[1-9]\d*)$/.test(value)
    },

    /**
     * Regex checking if the value starts with an alphabet character, then contains
     * any number of upper/lower case letters, numbers, -, /, or + characters.
     * Returns false if any other special chars(ie. !@#$%...) are in the string.
     * Used for Cluster controller
     * @param  {string}  value [an identifier]
     * @return {Boolean}       [description]
     */
    isAlphaNumericDashSlashPlus: function (value) {
        return /^[A-Za-z0-9\/\-\+]*$/.test(value)
    },

    /**
     * Regex checking if the value is all uppercase letters, dashes(-), or colons(:).
     * Returns false otherwise.
     * Used for Datacenter controller.
     * @param  {string}  value [an identifier]
     * @return {Boolean}       [description]
     */
    isUppercaseDashColon: function (value) {
        return /^[A-Z\-\:]*$/.test(value)
        // /^[A-Za-z]*[0-9]*\-*\:*$/.test(request.params.id))
    }
}
