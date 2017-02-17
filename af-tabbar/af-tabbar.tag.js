riot.tag2('af-tabbar', '<ul><li each="{tab, i in tabs}" class="{is-active: parent.isActiveTab(tab.id)}" onclick="{parent.toggleTab}">{tab.title}</li></ul><div class="after"></div>', '', '', function(opts) {
  var self = this;
  self.tabs = opts.tabs;
  self.activeTab = opts.active || opts.tabs && opts.tabs[0];

  this.isActiveTab = function(id) {
    return this.activeTab.id === id;
  };
  this.toggleTab = function(e) {
    var clicked = self.root.getElementsByClassName('after')[0];
    clicked.style.left = e.target.offsetLeft + 'px';
    clicked.style.width = e.target.offsetWidth + 'px';
    self.activeTab = e.item.tab;

    self.opts.bus && self.opts.bus.trigger('tabchanged', e.item.tab);
  }
  this.on('mount', function() {
    setTimeout(function() {
      self.toggleTab({
        'target' : self.root.getElementsByClassName('is-active')[0],
        'item' : {'tab' : self.activeTab}
      });
    }, 1);
  });
});
