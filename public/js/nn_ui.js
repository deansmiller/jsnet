var NN_UI = (function(){

    panelTransfer = false;

    function Panel(config) {
        this.value = 0;
        this.size = config.size;
        this.canvas = Labs.createElement("canvas", "panel" + config.id, "panels");
        this.canvas.style.border = "1px solid " + config.panelColour;
        this.canvas.setAttribute("width", config.size);
        this.canvas.setAttribute("height", config.size);
        this.canvas.style.position = "absolute";
        this.id = "panel" + config.id;
        this.attachEventHandlers();
        return this;
    }

    Panel.prototype.attachEventHandlers = function(){
        Labs.on("click", this.canvas, function(){
            if(this.value == 1){
                this.value = 0;
                this.canvas.style.background = "white";
            }
            else {
                this.value = 1;
                this.canvas.style.background = "black";
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
        this.container = config.container;
        this.attachEventHandlers();
    }

    PanelPad.prototype = {

        attachEventHandlers: function(){
            var draw = false, fromInputPanel = false, id, self = this, panel;
            Labs.on("mousemove", this.container, function(e){
                if(draw || NN_UI.panelTransfer){
                    e.target.style.background = "black";
                    id = e.target.getAttribute("id");
                    panel = self.getPanel(id);
                    panel.value = 1;
                }
            });

            Labs.on("mousedown", this.container, function(){
                draw = true;
            });

            Labs.on("mouseup", this.container, function(){
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
                    canvas.style.left = left + "px";
                    canvas.style.top = top + "px";
                    left += this.panelSize;
                    this.container.appendChild(canvas);
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
                    pad[j].canvas.style.background = "white";
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
        this.canvas = Labs.createElement("canvas", config.id, "inputpanel");
        this.canvas.setAttribute("width", config.width);
        this.canvas.setAttribute("height", config.height);
        this.width = config.width;
        this.height = config.height;
        this.container = config.container;
        this.context = this.canvas.getContext("2d");
        this.penSize = config.penSize || 20;
        this.panelPadContainer = config.panelPadContainer || null;
        return this;
    }

    InputPad.prototype = {

        attachEventHandlers: function(){
            var self = this, x, y, _x, _y, con = this.context, draw = false, ev, panels, id, i = 0;
            con.lineWidth = this.penSize;

            Labs.on("mousedown", this.canvas, function(e){
                draw = true;
                x = e.offsetX;
                y = e.offsetY;
            });

            Labs.on("mousemove", this.canvas, function(e){
                if(draw) {
                    con.beginPath();
                    con.arc(x, y, 3, 0, Math.PI * 2, false); //??
                    con.closePath();
                    con.stroke();
                    x = e.offsetX;
                    y = e.offsetY;
                    _x = Math.floor(x / self.penSize);
                    _y = Math.floor(y / self.penSize);

                    if(self.panelPadContainer){
                        ev = document.createEvent("MouseEvents");
                        ev.initMouseEvent("mousemove", true, true, window, e.details, e.screenX, e.screenY, e.clientX, e.clientY, true, true, true, true, e.button, null);
                        panels = document.getElementsByClassName("panels");
                        for(i = 0; i < panels.length; i++){
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

            Labs.on("mouseup", this.canvas, function(e){
                if(draw) draw = false;
            });

            Labs.on("mouseout", this.canvas, function(){
                NN_UI.panelTransfer = false;
            });
        },

        render: function(){
            this.container.appendChild(this.canvas);
            this.attachEventHandlers();
            return this;
        },

        processInput: function(){
            this.imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
            var data = this.imageData.data;
            var processedData = [];
            for(var i = 0; i < data.length; i++){
                processedData.push(data[i] > 0 ? 1 : 0);
            }

            console.log(processedData);
            this.processedData = processedData;
        },

        clearPanel: function(){
            this.context.clearRect(0, 0, this.width, this.width);
        }
    };

    return {
        PanelPad: PanelPad,
        InputPad: InputPad
    }
})();