riot.tag2('af-select', '<div class="input isFilled" onclick="{onFocus}">{currentTitle}</div><i class="material-icons" onclick="{onFocus}">keyboard_arrow_down</i><label onclick="{onFocus}">{opts.label}</label><div class="options"><ul><li each="{option in opts.options}" onclick="{selectOption}" class="{current : (currentTitle == option.title)}">{option.title}</li></ul></div><div class="overlay" onclick="{closeSelect}"></div>', '', '', function(opts) {
        var self = this;
        self.currentTitle = self.opts.initvalue.title;

        this.on('mount', function(){
            this.inputField = this.root.getElementsByClassName('input')[0];
        })

        this.onFocus = function(e) {
            this.inputField.className = 'input isFocused isFilled';
        }

        this.closeSelect = function(e) {
            self.inputField.className = 'input isFilled';
        }

        this.selectOption = function(e) {
            self.currentTitle = this.option.title;
            self.opts.bus && self.opts.bus.trigger('newValue', this.option);
            self.inputField.className = 'input isFilled';
        };

        opts.bus && opts.bus.on('setValue', function(newValue) {
            self.currentTitle = newValue.title;
            self.update();
        });

});
