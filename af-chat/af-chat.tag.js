riot.tag2('af-chat', '<div class="messages"><div class="messages-content"><div each="{message, index in messages}" class="{message : true, real: true, message-personal : message.from == \'me\'}"><figure class="avatar" if="{message.from != \'me\'}"><img riot-src="{message.avatar}"></figure> {message.text || JSON.stringify(message)} <div class="timestamp" if="{shouldDisplayTimestamp(index)}">{getTimestamp(message.date)}</div></div><div class="{message : true, loading  : true, new : true, message-personal : typing.from == \'me\'}" if="{typing}"><figure class="avatar" if="{typing.avatar}"><img riot-src="{typing.avatar}"></figure><span></span></div></div></div><div class="message-box"><textarea type="text" class="message-input" placeholder="Type message..." oninput="{useristyping}"></textarea><button type="submit" class="message-submit" onclick="{send}">Send</button></div>', '', '', function(opts) {

    function addAndSort2(arr, val) {
        arr.push(val);
        i = arr.length - 1;
        item = arr[i];
        while (i > 0 && item.date < arr[i-1].date) {
            arr[i] = arr[i-1];
            i -= 1;
        }
        arr[i] = item;
        return arr;
    }

    var self = this;
    self.messages = (self.opts.messages && self.opts.messages.slice()) || [];
    self.typing = self.opts.typing;

    self.getTimestamp = function(input) {
      var now = new Date();
      var d = (input)?(new Date(input)):now;
      var m = d.getMinutes();m = (m<10)?'0'+m:m;
      if(d.toDateString() != now.toDateString()) {
        return d.toDateString().slice(0,-5) + ' ' + d.getHours() + ':' + m;
      }
      else {
        return d.getHours() + ':' + m;
      }
    };

    self.updateScroll = function() {
        console.log("updateScroll");
        var elmt = self.root.getElementsByClassName('messages-content')[0];
        elmt.scrollTop = elmt.scrollHeight;
    };
    self.send = function() {
        var inputElmt = self.root.getElementsByClassName('message-input')[0];
        var msg = inputElmt.value.trim();
        if(msg.length > 0) {
            self.opts.bus && self.opts.bus.trigger('sendMessage', msg);
        }
        inputElmt.value = '';
    };
    self.useristyping = function() {
        self.opts.bus && self.opts.bus.trigger('user_typing');
    };
    self.on('updated', function() {
        setTimeout(self.updateScroll, 100);
    });
    self.on('mount', function() {
        setTimeout(self.updateScroll, 100)
    });

    self.opts.bus && self.opts.bus.on('newMessage', function(message, stoptyping) {
        addAndSort2(self.messages, message);
        if(stoptyping) {
            self.typing = null;
        }
        setTimeout(function() {
            var elmts = self.root.getElementsByClassName('real');
            var className = elmts[elmts.length - 1].className;
            if(className.split(' new').length == 1) elmts[elmts.length - 1].className += ' new';
        }, 100);
        self.update();
    });

    self.opts.bus && self.opts.bus.on('newTyping', function(message) {
        self.typing = message;
        self.update();
    });

    self.shouldDisplayTimestamp = function(index) {
        var date = self.messages[index].date;
        if(date) {
            return (index > 0 && Math.abs(self.messages[index - 1].date - date) > 60000) || (index == 0);
        }
        return false;
    };

});