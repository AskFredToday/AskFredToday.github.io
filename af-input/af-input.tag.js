riot.tag2('af-input', '<input riot-value="{opts.initvalue}" onfocus="{onFocus}" onblur="{onBlur}" type="{opts.type}"><label onclick="{focusInput}">{opts.label}</label><div class="after"></div>', '', '', function(opts) {
        var self = this;
        this.on('mount', function(){
            this.inputField = this.root.getElementsByTagName('input')[0];
            this.updateClassName();
        })

        this.onFocus = function(e) {
            this.inputField.className = 'isFocused isFilled'
        }.bind(this)

        this.onBlur = function(e) {
            this.updateClassName();
            opts.bus && opts.bus.trigger('newValue', this.opts.iid, e.target.value);
        }.bind(this)

        this.focusInput = function() {
            this.inputField.focus();
        }.bind(this)

        this.updateClassName = function() {
            this.inputField.className = (this.inputField.value != '')?'isFilled':'';
        }.bind(this)

        opts.bus && opts.bus.on('setValue', function(newValue) {
            self.inputField.value = newValue;
        });
});
