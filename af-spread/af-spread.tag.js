riot.tag2('af-spread', '<div></div>', '', '', function(opts) {
    var self = this;

    var source = new EventSource(opts.rootpath + '/sse' + opts.subpath);
    var isFirstLoad = true;
    source.onopen = function () {
        console.log('on open');
    };
    source.onerror = function () {
        console.log('on error');
    };
    source.onmessage = function (event) {
        var splitted = event.data.split('\n');
        var pathAsArray = splitted.shift().split('/');
        var from = splitted.shift();
        var lastUpdate = new Date(parseInt(splitted.shift(), 10));
        var payload = splitted.join('\n');

        opts.bus && opts.bus.trigger('spreadEvent', pathAsArray, payload);

        if (event.id == "CLOSE") {
            source.close();
        }
    };

    opts.bus && opts.bus.on('postToSpread', function (path, payload) {
        var req = new XMLHttpRequest();
        req.open('POST', self.opts.rootpath + '/raw' + path, true);
        req.onreadystatechange = function (aEvt) {
            if (req.readyState == 4) {
                if(req.status == 200) {
                    console.log(req.responseText);
                }
            }
        };
        req.setRequestHeader("Content-Type", "text/plain");
        req.setRequestHeader("Authorization", "Bearer FRED");
        req.send(payload);
    });

});