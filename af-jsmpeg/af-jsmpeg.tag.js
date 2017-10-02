riot.tag2('af-jsmpeg', '<canvas></canvas>', '', '', function(opts) {

         var self = this;
         this.render = function() {
            if(self.opts.channnel) {
                var element = self.root.getElementsByTagName('canvas')[0];
                var url = 'ws://' + self.opts.host + ':8082/' + self.opts.channel;
                self.player = new JSMpeg.Player(url, {canvas: element});
            }
         };
         this.on('mount', function() {
            self.render();
         });
         this.on('unmount', function() {
            self.player && self.player.destroy();
         });

});