module.exports = {
    // Used for client_id
    isNumber: function(value) {
        // A regex checking if the value is a number.  format is /pattern/, "\" escapes special chars.
        //      "^" checks beginning of input for the next character.
        //      "?" matches the previous character only 0 or 1 times;
        //      "^\+?"" matches a single plus sign at the beginning of input,
        //          but not multiple
        //      "(0|[1-9]\d*)" matches either 0, or 1 through 9, then [0-9] 0 or
        //          more times
        //      "$" makes the previous part of the pattern match at end of input
        return /(0|[1-9]\d*)$/.test(value)
    },

    // Used for cluster_name
    isAlphaNumericSpecial: function(value) {
        return /^[A-Za-z]*[0-9]*\/*\-*\+*$/.test(value)
    }
}
