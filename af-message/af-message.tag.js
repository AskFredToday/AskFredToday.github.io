riot.tag2('af-message', '<textarea rows="1" if="{!isright}" riot-value="{message}" oninput="{onEdit}"></textarea><div if="{isright}">{message}</div>', '', 'class="{hidden : shallhide, right : isright}"', function(opts) {
    var self = this;
    self.message = opts.messagetext;
    self.shallhide = (self.message == null);
    self.isright = self.opts.isright;

    self.opts.bus && self.opts.bus.on('updatemessagetext', function(newtext) {
        self.message = newtext;
        self.shallhide = (self.message == null);
        if(!self.isright) {
            setTimeout(function() {
                self.root.getElementsByTagName('textarea')[0].focus();
            }, 1);
        }
        self.update();
    });

    self.onEdit = function(e) {
        var element = self.root.getElementsByTagName('textarea')[0];
        element.style.height = "5px";
        element.style.height = (element.scrollHeight)+"px";

        self.message = e.target.value;
        self.opts.bus && self.opts.bus.trigger('newmessagevalue', e.target.value);
    };

});