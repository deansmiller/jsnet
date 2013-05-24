Labs.ready(function(){

    //defaults
    jQuery("#error").val(0.001);
    jQuery("#rate").val(0.05);
    jQuery("#logError").val(5000);
    jQuery("#chartError").val(5000);

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
        }
    };

    var pp = new NN_UI.PanelPad({
        panelSize: 20, // each panel size in pixels 
        panels: 10, // panel per row
        container: "panelpad-container",
        panelColour: "rgb(177, 173, 173)" //should really be set using CSS!!
    }).render();


    var ip = new NN_UI.InputPad({
        width: 200,
        height: 200,
        id: "demo",
        penSize: 20, //must match PanelPad panelSize
        container: "inputpad-container",
        panelPadContainer: "panelpad-container"
    }).render();


    worker = new Worker("/js/nn_work.js");

    worker.addEventListener("message", function(e){
        var data = e.data;
        //console.log("Worker: ", data);
        if(data.cmd == "chart" && data.x.length > 0){
            var paper = new Raphael(document.getElementById("chart-container"));
            paper.linechart(0, 0, 500, 300, data.x, data.y, {
                axis: "0 0 1 1",
                smooth: true,
                gutter: 20
            });           
        } 

        if(data.cmd == "log"){
            var text = jQuery("#log").val();
            jQuery("#log").val(text + data.iteration + ": " + data.error + "\n");
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
            jQuery("#guess").text(result);
        }

        if(data.cmd == "training-completed"){
            jQuery("#status").show();
        }

    }, false);


    var createNetwork = function(){
        //users cannot config these parameters
        var config = {};
        config.inputs = 100;
        config.patterns = patterns;
        config.neurons = [4, 4];
        //only these ones
        config.error = parseFloat(jQuery("#error").val());
        config.learningRate = parseFloat(jQuery("#rate").val());
        config.logErrorPerIteration = parseInt(jQuery("#logError").val());
        config.chartErrorPerIteration = parseInt(jQuery("#chartError").val()); 
        worker.postMessage({"cmd":"createNetwork", config: config});
    };

    createNetwork();

    jQuery("#recog").click(function(){
        var data = pp.processInput();
        worker.postMessage({"cmd":"recog", "input": data});
    });

    jQuery("#train").click(function(){
        worker.postMessage({"cmd": "trainNetwork"});
    });

    jQuery("#stop").click(function(){
        worker.terminate();
        jQuery("#status").hide();
    });

    jQuery("#clear").click(function(){
        pp.clearPanel();
        ip.clearPanel();
    });

    jQuery("#reset").click(function(){
        createNetwork();
        jQuery("#log").val("");
        jQuery("#guess").text("");
        jQuery("#chart-container").html("");
        jQuery("#status").hide();
    });


});