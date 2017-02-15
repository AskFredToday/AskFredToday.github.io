riot.tag2('af-timeline', '<div class="menu"><af-timepicker label="Start" min="{min}" max="{max}" initvalue="{max}" bus="{timeBus}"></af-timepicker><input type="image" onclick="{zoomIn}" title="Zoom In" src="img/zin.png"><input type="image" onclick="{zoomOut}" title="Zoom Out" src="img/zout.png"><input type="image" onclick="{moveLeft}" title="Move Left" src="img/fr.png"><input type="image" onclick="{moveRight}" title="Move Right" src="img/ff.png"></div><div></div>', '', '', function(opts) {
    var self = this;

    this.timeBus = riot.observable();
    this.timeBus.on('value', function(newDate) {
        var range = self.timeline.getWindow();
        var interval = range.end - range.start;

        var newWindow = {
            start: newDate,
            end:   new Date(newDate.valueOf() + interval)
        };

        self.timeline.setWindow(newWindow);

        setTimeout(function() {
            self.opts.bus && self.opts.bus.trigger('newRange', newWindow);
        }, 200);
    });

    this.max = new Date();
    this.min = new Date(this.max - 7 * 24 * 3600 * 1000);

    this.setTimelineWindow = function(newWindow) {
        self.timeBus.trigger('newValue', newWindow.start);
        self.timeline.setWindow(newWindow);
    }

    this.moveLeft = function() {
        move(0.9);
    }.bind(this)

    this.moveRight = function() {
        move(-0.9);
    }.bind(this)

    this.zoomIn = function() {
        zoom(-0.3);
    }.bind(this)

    this.zoomOut = function() {
        zoom(0.5);
    }.bind(this)

    function zoom (percentage) {
        var range = self.timeline.getWindow();
        var interval = range.end - range.start;

        var newWindow = {
            start: new Date(range.start.valueOf() - interval * percentage),
            end:   new Date(range.end.valueOf()   + interval * percentage)
        };

        self.setTimelineWindow(newWindow);

        setTimeout(function() {
            self.opts.bus && self.opts.bus.trigger('newRange', newWindow);
        }, 200);

    }
    function move (percentage) {
        var range = self.timeline.getWindow();
        var interval = range.end - range.start;

        var newWindow = {
            start: new Date(range.start.valueOf() - interval * percentage),
            end:   new Date(range.end.valueOf()   - interval * percentage)
        };

        self.setTimelineWindow(newWindow);

        setTimeout(function() {
            self.opts.bus && self.opts.bus.trigger('newRange', newWindow);
        }, 200);
    }
    this.items = new vis.DataSet();

    this.on('mount', function() {
        window.increment = (window.increment)?(window.increment+1):1;
        this.localId = 'timeline' + window.increment;
        this.root.children[1].id = this.localId;

        var startTime = new Date();

        var timelineElmt = this.root.firstChild;

        var generate = function(item) {
            if(item.img)
            {
                return '<div title="' + item.title + '"><img src="' + item.img + '"></div>';
            }
            else
            {
                return '<div>' + item.title + '</div>';
            }
        };

        var options = {
            template: generate,
            orientation: "top",
            start: this.opts.starttime || startTime,
            end: this.opts.endtime || startTime .valueOf() + 600000,
            editable: {
                add: true,
                updateTime: true,
                updateGroup: false,
                remove: true
            },
            maxHeight: "400px",
            onAdd: function(item, callback) {
                if(item.group == 1)
                {
                    item.title = 'Ad';
                    item.end = item.start.valueOf() + 30000;
                    callback(item);
                    opts.bus && opts.bus.trigger('select', item);
                }
            },
            onMove: function(item, callback) {
                item.sequence.forceddate = Math.round(item.start.valueOf() / 1000);
                item.sequence.forcedduration = Math.round((item.end.valueOf() - item.start.valueOf())/ 1000);
                callback(item);
            },
            onRemove: function(item, callback) {
                item.sequence.deleted = true;
                callback(item);
            }
        };
        var groups = new vis.DataSet([]);

        this.timeline = new vis.Timeline(timelineElmt);
        this.timeline.setOptions(options);
        this.timeline.setGroups(groups);
        this.timeline.setItems(this.items);

        this.timeline.on('rangechanged', function (properties) {
            if(properties.byUser)
            {
                var newWindow = self.timeline.getWindow();
                opts.bus && opts.bus.trigger('newRange', newWindow);
                self.timeBus.trigger('newValue', newWindow.start);
            }
        });

        this.timeline.on('select', function (properties) {
            opts.bus && opts.bus.trigger('select', self.items.get(properties.items[0]));
        });
    });
    this.on('unmount', function() {
        this.timeline = null;
    });

    opts.bus && opts.bus.on('newStartDate', function(newDate) {
        if(self.timeline) {
            moveTo(newDate.start, newDate.end);
        }
    });

    opts.bus && opts.bus.on('newItems', function(items) {
        if(self.timeline) {
            self.items = items;
            self.timeline.setItems(self.items);
        }
    });

    opts.bus && opts.bus.on('updateItem', function(item) {
        if(self.timeline) {
            self.items.update(item);
        }
    });

    opts.bus && opts.bus.on('clearItems', function() {
        self.items.clear();
    });

    function moveTo(startDate, endDate) {
        var range = self.timeline.getWindow();

        self.setTimelineWindow({
            start: startDate,
            end:   endDate
        });
    }
});
