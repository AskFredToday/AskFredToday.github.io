riot.tag2('af-raw', '<div></div>', '', '', function(opts) {
        window.sanitize = window.sanitize || function (text) {
            var sanitized;
            sanitized = text.replace(/</g, '&lt;')
            sanitized = sanitized.replace(/>/g, '&gt;')
            sanitized = sanitized.replace(/\n/g, '<br>')
            return sanitized;
        }

        var self = this;
        this.on('mount', function() {
            self.root.firstChild.innerHTML = sanitize(opts.text);
        })
});
