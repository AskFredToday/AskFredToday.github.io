riot.tag2('af-assistant', '<af-message isright="true" bus="{messagebus}"></af-message><af-avatar avatarurl="https://askfred.today/img/fred.png"></af-avatar><af-message bus="{usermessagebus}"></af-message>', '', 'onclick="{onclick}"', function(opts) {
    var self = this;
    self.onclick = function() {
        opts.bus && opts.bus.trigger('listen');
    };
    self.messagebus = riot.observable();
    self.opts.bus && self.opts.bus.on('assistantsays', function(text) {
        self.messagebus.trigger('updatemessagetext', text);
    });

    self.usermessagebus = riot.observable();
    self.opts.bus && self.opts.bus.on('usersays', function(text) {
        self.usermessagebus.trigger('updatemessagetext', text);
    });

});