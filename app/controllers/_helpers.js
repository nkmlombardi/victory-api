module.exports = {
    formatErrors: function(errorsIn) {
        var errors = {};
        var a, e;

        for (a = 0; a < errorsIn.length; a++) {
            e = errorsIn[a];

            errors[e.property] = errors[e.property] || [];
            errors[e.property].push(e.msg);
        }
        return errors;
    },

    search: function(query) {
        if (!query) return;

        return function(element) {
            for (var i in query) {
                if (query[i] != element[i]) {
                    return false;
                }
            }
            return true;
        }
    }
};
