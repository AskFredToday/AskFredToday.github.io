riot.tag2('af-list', '<ul><li each="{item, i in items}" onclick="{clicker(i)}" class="{selected : (i == selected)}">{item._id || i}{(item._value)?⁗: ⁗:⁗⁗}{item._value}</li></ul>', '', '', function(opts) {
        var self = this;
        self.items = self.opts.items;
        self.clicker = function(i) {
            return function(e) {
                console.log("You clicked on " + i);
                self.selected = i;
                self.opts.bus && self.opts.bus.trigger('clicked', i);
                self.update();
            };
        }
        self.opts.bus && self.opts.bus.on('updateitems', function(items) {
            self.items = items;
            self.update();
        });

});