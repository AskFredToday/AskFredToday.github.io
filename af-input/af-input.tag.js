riot.tag2('af-input', '<input riot-value="{currentvalue}" onfocus="{onFocus}" onblur="{onBlur}" type="{opts.type}" onkeyup="{onEdit}"><label onclick="{focusInput}">{opts.label}</label><div class="after"></div>', '', '', function(opts) {
        var self = this;
        self.currentvalue = opts.initvalue;

        this.on('mount', function(){
            this.inputField = this.root.getElementsByTagName('input')[0];
            this.updateClassName();
        })

        this.onFocus = function(e) {
            self.inputField.className = 'isFocused isFilled'
        }.bind(this)

        this.onEdit = function(e) {
            self.currentvalue = e.target.value;
            self.opts.bus && self.opts.bus.trigger('newValue', self.opts.iid, e.target.value);
        }.bind(this)

        this.onBlur = function(e) {
            self.updateClassName();
            self.currentvalue = e.target.value;
            self.opts.bus && self.opts.bus.trigger('newValue', self.opts.iid, e.target.value);
        }.bind(this)

        this.focusInput = function() {
            self.inputField.focus();
        }.bind(this)

        this.updateClassName = function() {
            self.inputField.className = (self.inputField.value != '')?'isFilled':'';
        }.bind(this)

        self.opts.bus && self.opts.bus.on('setValue', function(newValue) {
            self.currentvalue = newValue;
            self.update();
        });
});
