riot.tag2('af-vlc', '<embed type="application/x-vlc-plugin" pluginspage="http://www.videolan.org" width="320" height="180">', '', '', function(opts) {


        this.on('mount', function() {
            window.increment = (window.increment)?(window.increment+1):1;
            this.localId = 'vlc' + window.increment;
            this.root.getElementsByTagName('embed')[0].id = this.localId;

            this.vlc = document.getElementById(this.localId);

            if(this.vlc.playlist)
            {
                var options = new Array(":aspect-ratio=16:9");
                var url = this.opts.url;
                if(url.split('udp://').length > 1) {
                    var ip = url.split('udp://')[1];
                    var first = parseInt(ip.split(".")[0], 10);
                    if(first > 223 && first < 240) {
                        url = 'udp://@' + ip;
                    }
                }
                var id = this.vlc.playlist.add(url, this.opts.title, options);
                this.vlc.playlist.playItem(id);
                this.vlc.audio.toggleMute();
            }
        });
});