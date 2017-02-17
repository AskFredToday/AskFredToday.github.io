riot.tag2('af-collapsible', '<ul><li each="{header, i in headers}" class="{is-active: header.isOpen}"><af-raw class="header" text="{header.title}" onclick="{parent.toggleHeader}"></af-raw><af-raw class="body" text="{header.body}" if="{header.body}"></af-raw><af-collapsible class="body" headers="{header.children}" if="{header.children}"></af-collapsible></li></ul>', '', '', function(opts) {
  var self = this;
  self.headers = opts.headers;
  if(!self.opts.multiple) {
    for(var i = 0, j = self.headers.length; i < j; ++i)
    {
      if(self.headers[i].isOpen) {
        self.current = self.headers[i];
        break;
      }
    }
  }

  this.toggleHeader = function(e) {
    if(!self.opts.multiple) {
      if(self.current && self.current !== e.item.header) {
        self.current.isOpen = false;
      }
      self.current = e.item.header;
    }
    e.item.header.isOpen = !e.item.header.isOpen;
    self.opts.bus && self.opts.bus.trigger('headerchanged', e.item.header);
  }
});
