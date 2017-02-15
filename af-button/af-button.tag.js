riot.tag2('af-button', '<div onclick="{onClick}" class="af-button">{buttontext}</div>', '', '', function(opts) {
    var self = this;
    self.buttontext = opts.buttontext;
    this.onClick = function() {
        self.opts.bus && self.opts.bus.trigger('click');
    };
    opts.bus && opts.bus.on('updatebuttontext', function(val) {
        self.buttontext = val;
        self.update();
    });
});