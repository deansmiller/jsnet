var NN_WORK = (function(){

    function Neuron(config){
        this.inputs = [], this.weights = [], this.output = 0;
        for(var i = 0; i < config.inputs; i++){
            this.weights.push(Math.random());
        }
        this.bias = Math.random(); //dont need this??     
    }

    Neuron.prototype = {

        applyInput: function(_input){
            if(_input.length != this.weights.length)
                throw new Error("Incorrect parameters..");

            var sum = 0, i = 0, len = _input.length, bias = this.bias, weights = this.weights;
            for(i = 0; i < len; i++){
                sum += _input[i] * weights[i];
            }
            this.output = 1 / (1 + Math.exp(-sum + bias));                
        },

        getWeightSum: function(){
            var sum = 0, i = 0, weights = this.weights, len = this.weights.length;
            for(i; i < len; i++){
                sum += weights[i];
            }
            return sum;
        }

    };

    function Network(config){
        this.size = config.neurons[1];
        this.inputs = config.inputs;
        this.neurons = [];
        this.learningRate = config.learningRate;
        this.error = config.error;
        this.patterns = config.patterns;
        for(var i = 0; i < this.size; i++){
            this.neurons.push(new Neuron({
                inputs: config.inputs
            }));
        }
        this.logErrorPerIteration = config.logErrorPerIteration;
        this.chartErrorPerIteration = config.chartErrorPerIteration;
    }

    Network.prototype = {

        train: function(){
            self.postMessage("Commencing network training..");
            var currentError = 0, i = 0, output, pattern;
            var iterations = [], errors = [];

            do {
                for(pattern in this.patterns){
                    this.applyInput(this.patterns[pattern].input);
                    this.calculateWeightChanges(this.patterns[pattern].input, this.patterns[pattern].output);
                    currentError = this.calculateMSE(this.patterns[pattern].output, this.output);
                    this.mse = currentError;
                }
                
                i++;

                if((i % this.logErrorPerIteration) == 0){
                    self.postMessage({ cmd: "log", iteration: i, error: currentError });
                }

                if((i % this.chartErrorPerIteration) == 0){
                    iterations.push(i);
                    errors.push(currentError);
                }
            } while (currentError > this.error);

            self.postMessage("Training completed with error at: " + " " + currentError + " after iterations: " + i);
            self.postMessage({ cmd: "chart", x: iterations, y: errors });
        },

        calculateMSE: function(_outputData, networkOutput){
            var sum = 0;
            for(var i = 0; i < _outputData.length; i++){
                sum += Math.pow((_outputData[i] - networkOutput[i]), 2);
            }
            return sum;
        },

        calculateErrors: function(_outputData){
            var error = 0, errors = [];
            for(var i = 0; i < _outputData.length; i++){
                error = (_outputData[i] - this.output[i]) * this.output[i] * (1 - this.output[i]);
                errors.push(error);
            }
            return errors;
        },

        calculateWeightChanges: function(_inputData, _outputData){
            var errors = this.calculateErrors(_outputData), neuron;
            for(var i = 0; i < this.size; i++){
                neuron = this.neurons[i];
                for(var j = 0; j < this.inputs; j++){
                    neuron.weights[j] += this.learningRate * errors[i] * _inputData[j];
                }
                neuron.bias += this.learningRate * errors[i];
            }
        },

        applyInput: function(_inputData){
            if(_inputData.length != this.inputs)
                throw new Error("Incorrect input array length..");

            for(var i = 0; i < this.size; i++){
                this.neurons[i].applyInput(_inputData);
            }

            var output = [];
            for(var i = 0; i < this.size; i++){
                output.push(this.neurons[i].output);
            }

            this.output = output;
        }
    }

    return {
        Network: Network
    }

})();

var nn;

self.addEventListener("message", function(e) {
    var data = e.data;
    self.postMessage(data);
    switch (data.cmd) {
        case "createNetwork":
            createNetwork(data.config);
            break;
        case "trainNetwork":
            trainNetwork();
            break;
        case "recog":
            recog(data.input);
            break;
        default:
            self.postMessage("Unknown command: " + data.msg);
  };
}, false);


function createNetwork(config){
    nn = new NN_WORK.Network(config);
}

function trainNetwork(){
    nn.train();
}


function recog(input){
    nn.applyInput(input);
    self.postMessage({ cmd: "output", output: nn.output})
}
