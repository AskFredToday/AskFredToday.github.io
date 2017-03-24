riot.tag2('af-input', '<input riot-value="{currentvalue}" onfocus="{onFocus}" onblur="{onBlur}" type="{opts.type}" oninput="{onEdit}"><label onclick="{focusInput}">{opts.label}</label><div class="after"></div>', '', '', function(opts) {
        var self = this;
        self.currentvalue = opts.initvalue;

        self.on('mount', function(){
            self.inputField = self.root.getElementsByTagName('input')[0];
            self.updateClassName();
        })

        self.onFocus = function(e) {
            self.inputField.className = 'isFocused isFilled'
        }

        self.onEdit = function(e) {
            self.currentvalue = e.target.value;
            self.opts.bus && self.opts.bus.trigger('newValue', self.opts.iid, e.target.value);
        }

        self.onBlur = function(e) {
            self.updateClassName();
            self.currentvalue = e.target.value;
            self.opts.bus && self.opts.bus.trigger('newValue', self.opts.iid, e.target.value);
        }

        self.focusInput = function() {
            self.inputField.focus();
        }

        self.updateClassName = function() {
            self.inputField.className = (self.inputField.value != '')?'isFilled':'';
        }

        self.opts.bus && self.opts.bus.on('setValue', function(newValue) {
            self.currentvalue = newValue;
            self.update();
        });

        self.opts.bus && self.opts.bus.on('setFocus', function() {
            self.focusInput();
        });

});
