var NN_UI = (function($){

    panelTransfer = false;

    function Panel(config) {
        this.value = 0;
        this.size = config.size;
        var canvas = document.createElement("canvas");
        canvas = $(canvas);
        canvas.attr("id", "panel" + config.id);
        canvas.addClass("panels");
        canvas.css({
            "border": "1px solid " + config.panelColour,
            "width": config.size,
            "height": config.size,
            "position": "absolute"
        });
        this.canvas = canvas;
        this.id = "panel" + config.id;
        this.attachEventHandlers();
        return this;
    }

    Panel.prototype.attachEventHandlers = function(){
        this.canvas.on("click", function(){
            if(this.value == 1){
                this.value = 0;
                $(this).css("background", "white");
            }
            else {
                this.value = 1;
                $(this).css("background", "black");
            }   
        }); 
    };

    function PanelPad(config){
        this.pads = [], row = [];
        this.panelSize = config.panelSize;
        var panel = {};
        for(var i = 0; i < config.panels; i++){
            for(var j = 0; j < config.panels; j++){
                panel = new Panel({
                    size: config.panelSize,
                    id: j + "" + i,
                    panelColour: config.panelColour || "black"
                });
                row.push(panel);
            }
            this.pads.push(row);
            row = [];
        }
        this.container = $("#" + config.container);
        this.attachEventHandlers();
    }

    PanelPad.prototype = {

        attachEventHandlers: function(){
            var draw = false, 
                id, 
                panel,
                container = this.container
                self = this;

            container.on("mousemove", function(e){
                if(draw || NN_UI.panelTransfer){
                    var target = $(e.target);
                    target.css("background", "black");
                    id = target.attr("id");
                    panel = self.getPanel(id);
                    panel.value = 1;
                }
            });

            container.on("mousedown", function(){
                draw = true;
            });

            container.on("mouseup", function(){
                draw = false;
            });
        },

        getPanel: function(id){
            var pads = this.pads, pad;
            for(var i = 0; i < pads.length; i++){
                for(var j = 0; j < pads.length; j++){
                    pad = pads[i][j];
                    if(pad.id == id) return pad;
                }
            }
            throw new Error("Panel with id '" + id + "' not found..");
        },

        render: function(){
            var canvas, pad, left = 0, top = 0;
            for(var i = 0; i < this.pads.length; i++){
                pad = this.pads[i];
                for(var j = 0; j < this.pads.length; j++){
                    canvas = pad[j].canvas;
                    canvas.css({
                        "left": left + "px",
                        "top": top + "px"
                    });

                    left += this.panelSize;
                    this.container.append(canvas);
                }
                left = 0;
                top += this.panelSize;
            }
            return this;
        },

        clearPanel: function(){
            var pads = this.pads, pad;
            for(var i = 0; i < pads.length; i++){
                pad = pads[i];
                for(var j = 0; j < pads.length; j++){
                    pad[j].value = 0;
                    pad[j].canvas.css("background", "white");
                }
            }                
        },

        processInput: function(){
            var pads = this.pads, output = [], pad;
            for(var i = 0; i < pads.length; i++){
                pad = pads[i];
                for(var j = 0; j < pads.length; j++){
                    output.push(pad[j].value);
                }
            }    
            //console.log(output); 
            this.outputStr = output.join(",");
            return output;       
        }
    };

    function InputPad(config){
        var canvas = document.createElement("canvas");
        canvas.setAttribute("width", config.width);
        canvas.setAttribute("height", config.height);
        this.context = canvas.getContext("2d");
        canvas = $(canvas);
        canvas.addClass("inputpanel");
        canvas.attr("id", config.id);
        this.width = config.width;
        this.height = config.height;
        this.container = $("#" + config.container);
        this.canvas = canvas;
        this.penSize = config.penSize || 20;
        this.panelPadContainer = config.panelPadContainer || null;
        return this;
    }

    InputPad.prototype = {

        attachEventHandlers: function(){
            var self = this, 
                x, _x,
                y, _y,
                con = this.context, 
                draw = false, 
                ev, 
                panels, 
                id, 
                i = 0;

            con.lineWidth = this.penSize;
            var canvas = this.canvas;

            canvas.on("mousedown", function(e){
                draw = true;
                x = (e.offsetX || e.clientX - $(e.target).offset().left);
                y = (e.offsetY || e.clientY - $(e.target).offset().top);
            });

            canvas.on("mousemove", function(e){
                if(draw) {
                    con.beginPath();
                    con.arc(x, y, 10, 0, Math.PI * 2, false); //??
                    con.closePath();
                    con.fill();
                    x = (e.offsetX || e.clientX - $(e.target).offset().left);
                    y = (e.offsetY || e.clientY - $(e.target).offset().top);
                    if(self.panelPadContainer){
                        _x = Math.floor(x / self.penSize);
                        _y = Math.floor(y / self.penSize);
                        ev = document.createEvent("MouseEvents");
                        ev.initMouseEvent("mousemove", true, true, window, e.details, e.screenX, e.screenY, e.clientX, e.clientY, true, true, true, true, e.button, null);
                        panels = document.getElementsByClassName("panels");
                        for(i = 0, len = panels.length; i < len; i++){
                            id = panels[i].getAttribute("id");
                            if(id == "panel" + _x + _y){
                                panels[i].dispatchEvent(ev);
                                break;
                            }
                        }
                        NN_UI.panelTransfer = true;
                    }
                }
            });

            canvas.on("mouseup", function(){
                if(draw) draw = false;
            });

            canvas.on("mouseout", function(){
                NN_UI.panelTransfer = false;
            });
        },

        render: function(){
            this.container.append(this.canvas);
            this.attachEventHandlers();
            return this;
        },

        processInput: function(){
            this.imageData = this.context.getImageData(0, 0, this.width, this.height);
            var data = this.imageData.data;
            var processedData = [];
            for(var i = 0; i < data.length; i++){
                processedData.push(data[i] > 0 ? 1 : 0);
            }

            console.log(processedData);
            this.processedData = processedData;
        },

        clearPanel: function(){
            this.context.clearRect(0, 0, this.width, this.height);
        }
    };

    return {
        PanelPad: PanelPad,
        InputPad: InputPad
    }
})(jQuery);