riot.tag2('af-collapsible', '<ul><li each="{header, i in headers}" class="{is-active: header.isOpen}" onclick="{parent.toggleHeader}"><af-raw class="header" text="{header.title}"></af-raw><af-raw class="body" text="{header.body}"></af-raw></li></ul>', '', '', function(opts) {
  var self = this;
  self.headers = opts.headers;

  this.toggleHeader = function(e) {
    e.item.header.isOpen = !e.item.header.isOpen;
    self.opts.bus && self.opts.bus.trigger('headerchanged', e.item.header);
  }
});
