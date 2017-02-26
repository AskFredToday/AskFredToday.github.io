riot.tag2('af-modal', '<div class="modal {show: dialogShowing}"><div id="modalcontent"></div></div><div class="overlay" onclick="{closeDialog}"></div>', '', '', function(opts) {
  var self = this;
  self.dialogShowing = false;
  this.closeDialog = function() {
    self.dialogShowing = false;
  };

  opts.bus && opts.bus.on('dialogshow', function() {
    self.dialogShowing = true;
    self.update();
  });

  opts.bus && opts.bus.on('dialoghide', function() {
    self.dialogShowing = false;
    self.update();
  });

});