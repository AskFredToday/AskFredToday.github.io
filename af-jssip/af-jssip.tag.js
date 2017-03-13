riot.tag2('af-jssip', '<audio id="remoteAudio"></audio><af-input id="jssip" label="Number" bus="{bus}" initvalue="{opts.number}"></af-input><af-button buttontext="Dial" bus="{bus}"></af-button>', '', '', function(opts) {
      var self = this;
      self.bus = riot.observable();
      self.number = self.opts.number;

      self.bus.on('click', function() {
        self.opts.bus.trigger('dial', self.number);
      });

      self.bus.on('newValue', function(id, val) {
        self.number = val;
      });

      function on_jssip_loaded() {

          var socket = new JsSIP.WebSocketInterface(opts.wsurl);
          var configuration = {
            sockets  : [ socket ],
            uri      : opts.uri,
            password : opts.password,

            session_timers: false
          };

          self.ua = new JsSIP.UA(configuration);

          self.ua.start();

          self.eventHandlers = {
            'progress': function(e) {
              console.log('call is in progress');
            },
            'failed': function(e) {
              console.log('call failed with cause: '+ e.cause);
            },
            'ended': function(e) {
              console.log('call ended with cause: '+ e.cause);
            },
            'confirmed': function(e) {
              console.log('call confirmed');

              var localStream = self.session.connection.getLocalStreams()[0];
              dtmfSender = self.session.connection.createDTMFSender(localStream.getAudioTracks()[0]);
            },
            'accepted': function(e) {

              var remoteAudio = document.getElementById('remoteAudio');
              remoteAudio.src = window.URL.createObjectURL(self.session.connection.getRemoteStreams()[0]);
              remoteAudio.play();
            }
          };

          self.options = {
            'eventHandlers'    : self.eventHandlers,
            'mediaConstraints' : { 'audio': true, 'video': false }
          };

          self.ua.on("registered", function() {
            console.log("Registered");
          });

          self.ua.on("newRTCSession", function(data){
            console.log(data);
          });
        }

        opts.bus && opts.bus.on('dial', function(destination) {
            self.session = self.ua.call(destination, self.options);
        });

        if(!window.hasOwnProperty('JsSIP')) {
            var script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jssip/3.0.3/jssip.min.js';
            script.onload = function () {

                on_jssip_loaded();
            };
            document.head.appendChild(script);
        }
        else {
            on_jssip_loaded();
        }
});