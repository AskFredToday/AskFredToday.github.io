riot.tag2('af-mermaid', '<div class="renderedsvg"></div>', '', '', function(opts) {

        var self = this;
        this.graphDefinition = this.opts.graphdef;
        this.render = function() {
            var element = self.root.getElementsByClassName("renderedsvg")[0];
            element.innerHTML = '';
            var insertSvg = function(svgCode, bindFunctions){
                element.innerHTML = svgCode;
            };
            var graph = mermaidAPI.render('id1', self.graphDefinition, insertSvg);
        };
        this.on('mount', function() {
            self.render();
        });
        this.opts.bus && this.opts.bus.on('newgraphdef', function(graphDef) {
            self.graphDefinition = graphDef;
            self.render();
        });
});
