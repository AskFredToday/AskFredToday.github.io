riot.tag2('af-flextab', '<div class="flexbox"><af-rawhtml each="{tab in tabs}" class="{is-active: parent.isActiveTab(tab.id), one : true}" onclick="{parent.toggleTab}" html="{tab.title}"></af-rawhtml></div><div class="after"></div>', '', '', function(opts) {
  var self = this;
  self.tabs = opts.tabs;
  self.activeTab = opts.active || opts.tabs && opts.tabs[0];

  this.isActiveTab = function(id) {
    return this.activeTab.id === id;
  };
  this.toggleTab = function(e) {
    var after = self.root.getElementsByClassName('after')[0];
    self.after = after;
    self.currentTarget = e.target;
    console.log(self.currentTarget);
    while(self.currentTarget.tagName != 'AF-RAWHTML') self.currentTarget = self.currentTarget.parentNode;
    self.afterleft = self.currentTarget.offsetLeft;
    after.style.left = (self.afterleft - self.currentTarget.parentNode.scrollLeft) + 'px';
    after.style.width = self.currentTarget.offsetWidth + 'px';
    self.activeTab = e.item.tab;

    self.opts.bus && self.opts.bus.trigger('tabchanged', e.item.tab);
    self.update();
  };
  this.on('mount', function() {
    var callback = function() {
      self.toggleTab({
        'target' : self.root.getElementsByClassName('is-active')[0] || self.root.getElementsByTagName('af-rawhtml')[0],
        'item' : {'tab' : self.activeTab}
      });
      window.addEventListener("resize", function() {
        self.after.style.left = (self.currentTarget.offsetLeft - self.currentTarget.parentNode.scrollLeft) + 'px';
        self.after.style.width = self.currentTarget.offsetWidth + 'px';
      });
    };
    setTimeout(callback, 1);
    setTimeout(callback, 310);
  });
  this.root
});
