(function(){
    var ViewParameterError = (function(err){
        var Error = function(message, type, data){
            this.name = 'ViewParameterError';
            this.message = message || 'A technical error has occurred.';
            this.type = type || 'generic';
            this.data = data || {};
        };

        Error.prototype = Object.create(err.prototype);
        Error.prototype.constructor = Error;
        Error.prototype.toString = function() {
            return sprintf(
                "%s: (%s) %s",
                this.name,
                this.type,
                this.message
            );
        };

        return Error;
    })(window.Error);

    can.Control.extend('App.Abstract.Controllers.Core', {

    }, {
        /**
         * Produce a DocumentFragment to be appended to the DOM.
         *
         * @function view
         *
         * @param {String} path - Relative path
         * @param {Object} data - Data that informs view
         * @param {Object.<String, functions>+} helper functions
         * @param {function} callback - For when loading is complete
         *
         * @codestart
         *    this.view(
         *        './users.ejs',
         *        {
         *            'users': [
         *                Object<User>,
         *                Object<User>
         *            ]
         *        },
         *        {
         *            full_name: function(user){
         *                return sprintf('${first_name} ${last_name}', user);
         *            }
         *        }
         *    );
         * @codeEnd
         *
         * @throws {ViewParameterError} If path is null
         * @throws {ViewParameterError} If value provided for path is not a string
         *
         * @return {documentFragment} DOM Subtree
         */
        view: function(path, data, helpers, callbacks) {
            if (!path) {
                throw new ViewParameterError('Path expected but not found.', 'missing-param');
            } else if (typeof path !== 'string') {
                throw new ViewParameterError(
                    sprintf(
                        'Path expected as String but found %s',
                        typeof path
                    ),
                    'invalid-param',
                    path
                );
            }

            if (!this.viewHelpers) {
                this.viewHelpers = {};
            }

            jQuery.extend(true, this.viewHelpers, helpers);

            jQuery.extend(true, data, {app: this});

            return can.view(path, data, this.viewHelpers, callbacks);
        }
    });
})();
