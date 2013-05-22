var Labs = Labs || {};

Labs = {

    ready: function(fn){
        document.addEventListener("DOMContentLoaded", fn);
    },

    createElement: function(element, e_id, e_class){
        var ele = document.createElement(element);
        e_id != "" ? ele.setAttribute("id", e_id) : null;
        e_class != "" ? ele.setAttribute("class", e_class) : null;
        return ele;
    },

    on: function(_event, element, fn){
        if(typeof(element) === "string"){
            element = Labs.get(element);
        }
        element.addEventListener(_event, fn);
    },

    get: function(element){
        return document.getElementById(element);
    },

    size: function(element, width, height){
        var args = Array.prototype.slice.call(arguments),
            element = args.shift();
        if(args.length == 0){
            var w = element.style.width;
            var h = element.style.height;
            w = w.substring(0, "px");
            h = h.substring(0, "px");
            return [w, h];               
        } else if(arguments.length  > 0){
            arguments[0].style.width = arguments[1] + "px";
            arguments[0].style.height = arguments[2] + "px";
            return element;
        }
        return false;
    },

    position: function(element, left, top){
        var args = Array.prototype.slice.call(arguments),
            element = args.shift();
        if(args.length == 0){
            var t = element.style.top,
                l = element.style.left;
            t = t.substring(0, "px");
            l = l.substring(0, "px");
            return [l, t];               
        } else if(arguments.length  > 0){
            element.style.left = arguments[1] + "px";
            element.style.top = arguments[2] + "px";
            return element;
        }
        return false;
    },


    Utils: {

        arrayMax: function(arr){
            var max = arr[0], temp;
            for(var i = 1; i < arr.length-1; i++){
                temp = Math.max(arr[i], arr[i+1]);
                if(temp > max) max = temp;
            }
            return max;
        }

    },

    Graphics: {

        init: function(config){
            var canvas = Labs.get(config.canvas);
            this.context = canvas.getContext("2d");
            this.drawNow = config.drawNow || true;
            this.pointSize = config.pointSize || 2;
            return this;
        },

        line: function(fromX, fromY, toX, toY){
            var con = this.context;
            con .beginPath();
            con.moveTo(fromX, fromY);
            con.lineTo(toX, toY);
            con.closePath();
            if(this.drawNow) con.stroke(); //should allow setting stroke or fill
        },

        point: function(x, y){
            this.context.rect(x, y, this.pointSize, this.pointSize);
            if(this.drawNow) this.context.stroke(); 
        },

        draw: function(){
            this.context.stroke();
        }
    },

    UI: {

        Chart: {
            create: function(config){
                this.data = config.data;
                this.canvas = config.canvas;

                return this;
            },

            render: function(){
                var canvas = this.canvas;
                var g = Labs.Graphics.init({
                    canvas: canvas
                });
                var axisPadding = 50;
                var xSpacer = 450 / 5;

                for(var x = 0; x < 350; x++){
                    g.line(50, 400, x, 400);
                }
            }
        },

        DragAndDrop: {
            init: function(config){
                this._class = config._class
                this.attachEventHandlers();
            },

            attachEventHandlers: function(){
                var x, move = false, posX;
                this.outerbox.addEventListener("mousedown", function(e){
                    x = e.x;
                    move = true;
                });

                this.outerbox.addEventListener("mouseup", function(e){
                    move = false;
                });

                this.outerbox.addEventListener("mousemove", function(e){  
                    if(move){
                     
                    }  
                });                  
            }
        },

        Popup: {
            create: function(config){
                this.overlay = Labs.createElement("div", "overlay", "");
                this.outerbox = Labs.createElement("div", "outerbox", "");
                Labs.size(this.outerbox, config.width, config.height);
                var boxLeft = (document.width * 0.5) - (config.width * 0.5),
                    boxTop = (document.height * 0.5) - (config.height * 0.5);
                Labs.position(this.outerbox, boxLeft, boxTop);
                this.container = document.createDocumentFragment();
                this.overlay.appendChild(this.outerbox);
                this.container.appendChild(this.overlay);
                this.opened = false;
                this.attachEventHandlers();
                return this;
            },

            render: function(){
                if(!this.opened){
                    document.body.appendChild(this.container);
                }        
            },

            close: function(){

            },

            attachEventHandlers: function(){

            }
        },

        Slider: {
            create: function(config){
                this.min = config.min || 0;
                this.max = config.max || 100;
                this.container = config.container;
                this.onValChange = config.onValChange || null;
                this.value = 0;
                this.handleWidth = 10;
                return this;              
            },

            render: function(){
                this.slider_container = Labs.createElement("span", "slider_container");
                var slider_panel = Labs.createElement("span", "slider_panel")
                slider_panel.style.width = this.max + this.handleWidth + "px";
                this.slider_handle = Labs.createElement("span", "slider_handle");
                this.slider_handle.style.left = "0px";
                slider_panel.appendChild(this.slider_handle);
                this.slider_container.appendChild(slider_panel);
                var frag = document.createDocumentFragment();
                frag.appendChild(this.slider_container);
                Labs.get(this.container).appendChild(frag);
                this.attachEventHandlers();
                return this;
            },

            attachEventHandlers: function(){
                var self = this,
                    startX = 0,
                    move = false, 
                    posX = 0,
                    count = 0,
                    slider_style = this.slider_handle.style;

                Labs.on("mousedown", this.slider_handle, function(e){
                    startX = e.clientX - self.slider_handle.offsetLeft;
                    move = true;
                    slider_style.border = "1px solid red";
                });

                Labs.on("mousemove", this.slider_container, function(e){
                    if(move){
                        posX = (e.clientX - startX);
                        if(posX >= self.min && posX <= self.max){
                            slider_style.left = posX + "px";
                            self.value = posX;
                            if(self.onValChange) {
                                self.onValChange(posX);
                            }
                        }
                    } 
                });

                Labs.on("mouseup", document, function(e){
                    if(move){
                        slider_style.border = "1px solid black";
                        move = false;
                    }
                });

                this.slider_handle.onselectstart = function(){
                    return false;
                };

                Labs.get("slider_panel").onselsectstart = function(){
                    return false;
                };

                this.slider_container.onselectstart = function(){
                    return false;
                };
            }
        },

        Gallery: {
            images: [],

            create: function(config){
                this.overlay = Labs.createElement("div", "galleryOverlay", "");
                this.outerbox = Labs.createElement("div", "outerbox", "");
                this.slideImages = Labs.createElement("div", "slide_images", "");
                this.galleryContainer = document.createDocumentFragment();
                this.imgOverlay = Labs.createElement("div","imgOverlay", "");
                this.outerbox.appendChild(this.slideImages);
                this.outerbox.appendChild(this.imgOverlay);
                this.overlay.appendChild(this.outerbox);
                this.galleryContainer.appendChild(this.overlay);
                this.galleryUp = false;
                this.images = config.images;
                this.imageIndex = 1;
                this.attachEventHandlers();
                return this;
            },

            render: function(){
                var frag = document.createDocumentFragment();
                for(var i = 0; i < this.images.length; i++){
                    var img = new Image();
                    img.src = this.images[i];
                    frag.appendChild(img);
                }
                this.slideImages.appendChild(frag);
                this.galleryUp = true;
                document.body.appendChild(this.galleryContainer);
                return this;   
            },

            close: function(){

            },

            attachEventHandlers: function(){
                //TODO: only if gallery is up
                var self = this;
                document.addEventListener("keyup", function(e){
                    if(self.galleryUp){
                        var keyCode = e.keyCode || e.which;
                        if(keyCode == 27){ //escape key so close
                            close();
                        } else if(keyCode == 39){ //right key
                            if(self.imageIndex == self.images.length){
                                this.moveImage();
                                self.imageIndex = 0;
                            }
                        } else if(keyCode == 37){ //left key
                            
                        }
                    }
                });   

                var x, move = false, posX;
                this.outerbox.addEventListener("mousedown", function(e){
                    x = e.x;
                    console.log(x);
                    move = true;
                });

                this.outerbox.addEventListener("mouseup", function(e){
                    move = false;
                    console.log(e.x - x);
                });

                this.outerbox.addEventListener("mousemove", function(e){  
                    if(move){
                        var posX = (e.clientX - x);
                        if(e.x < x){ //left swipe
                            if(posX > -150){
                               self.moveImage(-350); 
                            } else self.moveImage(posX);                            
                            if(self.imageIndex == self.images.length){
                                //self.moveImage();
                                self.imageIndex = 0;
                            }
                        } else if(e.x > x){ //right swipe
                            
                        }                        
                    }  
                });             
            },

            moveImage: function(posX){
                this.slideImages.style.webkitTransform = "translateX(" + this.imageIndex++ * posX + "px)";
            }
        }
    },

    Event: {
        
        handlers: {},

        addHandler: function(type, handler){
            if(typeof this.handlers[type] == "undefined"){
                this.handlers[type] = [];
            }
            this.handlers[type].push(handler);
        },

        fire: function(event){
            if(!event.target){
                event.target = this;
            }

            if(this.handlers[event.type] instanceof Array){
                var handlers = this.handlers[event.type];
                for(var i = 0; handlers.length; i++){
                    handlers[i](event);
                }
            }
        },

        removeHandler: function(type, handler){
            if(this.handlers[event.type] instanceof Array){
                var handlers = this.handlers[event.type];
                for(var i = 0; handlers.length; i++){
                    if(handlers[i] === handler){
                        handlers.splice(i, 1);
                        break;
                    }
                }
            }            
        }
    }


}