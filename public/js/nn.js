Labs.ready(function(){

    //defaults
    Labs.get("error").value = 0.001;
    Labs.get("rate").value = 0.05;
    Labs.get("logError").value = 10000;
    Labs.get("chartError").value = 5000;

    var patterns = {
        1: {
            input:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            output:[1,0,0,0]
        },
        2: {
            input:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0 ],
            output: [1,0,0,0]
        },
        3: {
            input:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
            output: [1,0,0,0]
        },
        4: {
            input:[0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0 ],
            output:[0,1,0,0]
        },
        5: {
            input:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0 ],
            output: [0,1,0,0]
        },
        6: {
            input:[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,1,1,1,0,1,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
            output: [0,1,0,0]
        },
        7: {
            input:[0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,0,0,1,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,1,0,0,1,1,0,0,0,0,1,1,0,0,0,1,1,1,1,1,1,0],
            output:[0,0,1,0]
        },
        8: {
            input:[0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,1,0,1,1,1,0,0,0,0,1,1,1,1,0,0,0],
            output: [0,0,1,0]
        },
        9: {
            input:[0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,0,0,1,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,1,0,0,1,1,0,0,0,0,1,1,0,0,0,1,1,1,1,1,1,0],
            output: [0,0,1,0]
        },

    };

    var pp = new NN_UI.PanelPad({
        panelSize: 20, // each panel size in pixels 
        panels: 10, // panel per row
        container: Labs.get("panelpad-container"),
        panelColour: "rgb(177, 173, 173)" //should really be set using CSS!!
    }).render();


    var ip = new NN_UI.InputPad({
        width: "200",
        height: "200",
        id: "demo",
        penSize: 20, //must match PanelPad panelSize
        container: Labs.get("inputpad-container"),
        panelPadContainer: Labs.get("panelpad-container")
    }).render();


    worker = new Worker("/js/nn_work.js");

    worker.addEventListener("message", function(e){
        var data = e.data;
        //console.log("Worker: ", data);
        if(data.cmd == "chart" && data.x.length > 0){

            var paper = new Raphael(Labs.get("chart-container"));

            paper.linechart(0, 0, 500, 300, data.x, data.y, {
                axis: "0 0 1 1",
                smooth: true,
                gutter: 20
            });           
        } 

        if(data.cmd == "log"){
            var text = Labs.get("log").value;
            Labs.get("log").value = text + data.iteration + ": " + data.error + "\n";
        }

        if(data.cmd == "output"){
            var output = data.output;
            console.log(output);
            var temp = output[0], max = 0;
            for(var i = 0; i < output.length; i++){
                temp = Math.max(output[i], output[i+1]);
                if(temp > max) max = temp;
            }
            var result;
            for(var i = 0; i < output.length; i++){
                if(output[i] == max){
                    result = i + 1;
                    break;                
                }
            }
            Labs.get("guess").innerText = result;
        }

    }, false);


    var createNetwork = function(){
        //users cannot config these parameters
        var config = {};
        config.inputs = 100;
        config.patterns = patterns;
        config.neurons = [4, 4];
        //only these ones
        config.error = parseFloat(Labs.get("error").value);
        config.learningRate = parseFloat(Labs.get("rate").value);
        config.logErrorPerIteration = parseInt(Labs.get("logError").value);
        config.chartErrorPerIteration = parseInt(Labs.get("chartError").value); 
        worker.postMessage({"cmd":"createNetwork", config: config});
    };

    createNetwork();

    Labs.on("click", "recog", function(){
        var data = pp.processInput();
        worker.postMessage({"cmd":"recog", "input": data});
    });

    Labs.on("click", "train", function(){
        worker.postMessage({"cmd": "trainNetwork"});
    });

    Labs.on("click", "stop", function(){
        worker.terminate();
    });


    Labs.on("click", "clear", function(){
        pp.clearPanel();
        ip.clearPanel();
    });

    Labs.on("click", "reset", function(){
        createNetwork();
        Labs.get("log").value = "";
        Labs.get("guess").innerText = "";
        Labs.get("chart-container").innerHTML = "";
    });


});