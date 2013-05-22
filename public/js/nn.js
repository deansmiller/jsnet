Labs.ready(function(){

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
        container: Labs.get("panelpad-container")
    }).render();


    var ip = new NN_UI.InputPad({
        width: "200",
        height: "200",
        id: "demo",
        penSize: 20, //must match PanelPad panelSize
        container: Labs.get("inputpad-container"),
        panelPadContainer: Labs.get("panelpad-container")
    }).render();

    var interval;

    worker = new Worker("/js/nn_work.js");
    worker.addEventListener("message", function(e){
        console.log("Worker: ", e.data);
    }, false);

    worker.postMessage({"cmd":"createNetwork", "config":{
        neurons: [4, 4],
        inputs: 100,
        error: 0.001,
        learningRate: 0.01,
        patterns: patterns,
        logErrorPerIteration: 500                    
    }});

    Labs.on("click", "recog", function(){
        var data = pp.processInput();
        worker.postMessage({"cmd":"recog", "input": data});
        //var output = nn.output;
        // var temp = output[0], max = 0;
        // for(var i = 0; i < output.length; i++){
        //     temp = Math.max(output[i], output[i+1]);
        //     if(temp > max) max = temp;
        // }
        // var result;
        // for(var i = 0; i < output.length; i++){
        //     if(output[i] == max){
        //         console.log(i);
        //         result = i + 1;
        //         break;                
        //     }
        // }
        // console.log(output);
        // Labs.get("result").innerText = result;
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
        //Labs.get("result").innerText = "";
    });


    Labs.on("click", "data", function(){
        pp.processInput();
        console.log(pp.outputStr);
    });

});