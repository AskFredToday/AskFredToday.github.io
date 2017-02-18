riot.tag2('af-collapsible', '<ul><li each="{header, i in headers}" class="{is-active : header.isOpen && header.children}"><af-raw class="{header : true, is-focused : header.isFocused}" text="{header.title}" onclick="{parent.toggleHeader}"></af-raw><af-raw class="body" text="{header.body}" if="{header.body}"></af-raw><af-collapsible class="body" headers="{header.children}" if="{header.children}" bus="{parent.opts.bus}" multiple="{parent.opts.multiple}"></af-collapsible></li></ul>', '', '', function(opts) {
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
        self.current.isFocused = false;
      }
      self.current = e.item.header;
    }
    e.item.header.isOpen = !e.item.header.isOpen;
    e.item.header.isFocused = true;
    self.opts.bus && self.opts.bus.trigger('headerchanged', e.item.header);
  }

  opts.bus && opts.bus.on('headerchanged', function(newHeader) {
    var header;
    for(var i = 0, j =  self.headers.length; i < j; ++i) {
      header = self.headers[i]
      if(header.isFocused && header != newHeader) {
        self.headers[i].isFocused = false;
        self.update();
        break;
      }
    }

  });
});