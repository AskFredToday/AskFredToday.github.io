riot.tag2('af-rawhtml', '<div></div>', '', '', function(opts) {
        this.set = function() { this.root.innerHTML = opts.html };
        this.on('update', this.set);
        this.on('mount', this.set);
});