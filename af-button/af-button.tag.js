riot.tag2('af-button', '<div onclick="{onClick}" class="{disabled : isdisabled}">{buttontext}</div>', '', '', function(opts) {
    var self = this;
    self.buttontext = opts.buttontext;
    self.isdisabled = opts.isdisabled || false;

    this.onClick = function() {
        !self.isdisabled && self.opts.bus && self.opts.bus.trigger('click', self);
    };
    opts.bus && opts.bus.on('updatebuttontext', function(val) {
        self.buttontext = val;
        self.update();
    });
    opts.bus && opts.bus.on('enable', function(val) {
        self.isdisabled = false;
        self.update();
    });
    opts.bus && opts.bus.on('disable', function(val) {
        self.isdisabled = true;
        self.update();
    });
});