module.exports = {
    isNumber: function(value) {
        if (/^\+?(0|[1-9]\d*)$/.test(value)) {
            return true
        }

        return false
    }
}
