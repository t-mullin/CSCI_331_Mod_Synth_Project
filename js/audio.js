//file for the Web Audio API integration
const AudioContext = window.AudioContext || window.webkitAudioContext;
//const freqSquare = document.getElementById('freq_square');
//const freqSaw = document.getElementById('freq_saw');
//const freqSin = document.getElementById('freq_sin');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const addButton = document.getElementById('add_module');
const removeButton = document.getElementById('remove_module');
let numOsc = 0;
const rackArray = [];
//const scope = document.getElementById('oscilloscope');
//const scopeCtx = scope.getContext("2d");
const audioContext = new AudioContext();


//let osc_scope = audioContext.createAnalyser();
//osc_scope.fftSize = 2048;
//let scopeBuffer = osc_scope.frequencyBinCount;
//let data = new Uint8Array(scopeBuffer);
//osc_scope.getByteTimeDomainData(data);

//setup();

/* add_osc_core: Adds the html containing the structure for a new oscillator module.
 *               The module contains a squarewave, sawtoothwave, and sinewave oscillators.
 *               The oscillators are intialized and events are added to sliders that control 
 *               the frequency of the oscillators.   
 */ 
function add_osc_core() {
    numOsc++; //used for template literals
    let rack = document.getElementById('module_rack'); //gets the div that is going to contain the modules
    //insert the html to make an oscillator module, each is unique due to using a template literal
    rack.insertAdjacentHTML('beforeend', 
        `<div id="osc_core_${numOsc}">
        <canvas id="oscilloscope"></canvas>
        <input id="freq_square_${numOsc}" type="range" min="0" max="440" value="0" step="10">
        <input id="freq_saw_${numOsc}" type="range" min="0" max="440" value="0" step="10">
        <input id="freq_sin_${numOsc}" type="range" min="0" max="440" value="0" step="10">
        </div>`
    );
    //add the module to the selector that selects the module for removal
    let remove_option = document.getElementById('remove_module_select');
    remove_option.insertAdjacentHTML('beforeend', `<option value="oscillators">Oscillator Pannel ${numOsc}</option>`);

    //setting up the oscillatorNodes
    let oscSquare = audioContext.createOscillator();
    oscSquare.type = 'square';
    oscSquare.frequency.value = 0;
    let oscSaw = audioContext.createOscillator();
    oscSaw.type = 'sawtooth';
    oscSaw.frequency.value = 0;
    let oscSine = audioContext.createOscillator();
    oscSine.type = 'sine';
    oscSine.frequency.value = 0;

    oscSine.start(0);
    oscSine.connect(audioContext.destination);

    //adding the oscillator module to the global list of modules
    //NOTE: may need to change this to include the input/output to make connecting modules
    //      easier
    let oscillators = {id: `osc_core_${numOsc}`, osc1: oscSquare, osc2: oscSaw, osc3: oscSine}
    rackArray.push(oscillators);
    
    //setting up event listeners for the frequency sliders
    document.getElementById(`freq_square_${numOsc}`).addEventListener('input', (e) => {
        let newFreq = Number(e.target.value);
        oscSquare.frequency.setValueAtTime(newFreq, audioContext.currentTime);
    }); 

    document.getElementById(`freq_saw_${numOsc}`).addEventListener('input', (e) => {
        let newFreq = Number(e.target.value);
        oscSaw.frequency.setValueAtTime(newFreq, audioContext.currentTime);
    });

    document.getElementById(`freq_sin_${numOsc}`).addEventListener('input', (e) => {
        let newFreq = Number(e.target.value);
        oscSine.frequency.setValueAtTime(newFreq, audioContext.currentTime);
    });
}
/* remove_osc_core: This function removes the selected osc module from the DOM
 *                  then removes it from the global module list. 
 * NOTE: This will probably have to be modified to also disconnect any node attached to it.
 */
function remove_osc_core(selector) {
    //gets the selected option from the selector element
    let module_name = selector.selectedOptions[0].innerHTML;
    //gets the number from the selected element
    let module_num = module_name.match(/(\d+)/);
    //gets the actual html by it's id
    let module = document.getElementById(`osc_core_${module_num[0]}`);
    //gets the parent element
    let rack = document.getElementById('module_rack');
    //removes the selected child element
    rack.removeChild(module);
    //removes the option from the selector
    selector.selectedOptions[0].parentNode.removeChild(selector.selectedOptions[0]);
    //removes the module from the global list of modules
    let index = rackArray.findIndex(({id}) => id === `osc_core_${module_num[0]}`);
    rackArray.splice(index, 1);
}

//sets up an event listener on the addButton
addButton.addEventListener('click', () => {
    //gets what module that the end user wants to add
    let selector = document.getElementById('add_module_select');
    //selects the correct add module function based on the selected option 
    switch (selector.value) {
        case 'oscillators':
            add_osc_core();
            break;
        case 'distortions':
            add_distortion_mod();
            break;
        default:
            console.log(selector.value);
    }
});

//sets up an event listener on the removeButton
removeButton.addEventListener('click', () => {
    //gets what module that the end user wants to remove
    let selector = document.getElementById('remove_module_select');
    //selects the correct remove module function based on the selected option 
    switch (selector.value) {
        case 'oscillators':
            remove_osc_core(selector);
            break;
        case 'distortions':
            remove_distortion_mod(selector);
            break;
        default:
            console.log(selector.value);
    }
});


function setup() {
    /*
    const oscSquare = audioContext.createOscillator();
    oscSquare.type = 'square';
    oscSquare.frequency = 0;
    const oscSaw = audioContext.createOscillator();
    oscSaw.type = 'sawtooth';
    oscSaw.frequency = 0;
    const oscSine = audioContext.createOscillator();
    oscSine.type = 'sine';
    */
    const gain = audioContext.createGain();
    gain.gain.value = 0.5;
    oscSquare.connect(gain);
    oscSquare.start(0);
    oscSaw.connect(gain);
    oscSaw.start(0);
    oscSine.connect(gain);
    oscSine.start(0);
    gain.connect(osc_scope);

    freqSquare.addEventListener('input', (e) => {
        let newFreq = parseInt(e.target.value);
        //console.log(newFreq);
        oscSquare.frequency.setValueAtTime(newFreq, audioContext.currentTime);
        //console.log(oscSquare.frequency);
    }); 

    freqSaw.addEventListener('input', (e) => {
        let newFreq = parseInt(e.target.value);
        //console.log(newFreq);
        oscSaw.frequency.setValueAtTime(newFreq, audioContext.currentTime);
        //console.log(oscSquare.frequency);
    });

    freqSin.addEventListener('input', (e) => {
        let newFreq = parseInt(e.target.value);
        //console.log(newFreq);
        oscSine.frequency.setValueAtTime(newFreq, audioContext.currentTime);
        //console.log(oscSquare.frequency);
    }); 

    playButton.addEventListener('click', () => {
        if(audioContext.state === 'suspended') {
            gain.connect(audioContext.destination);
            audioContext.resume();
        }
    }); 

    pauseButton.addEventListener('click', () => {
        audioContext.suspend();
        gain.disconnect(audioContext.destination);
    }); 
}

//need to replace this as it is direcly from https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode
//used to debug
function drawScope() {
    requestAnimationFrame(drawScope);
    osc_scope.getByteTimeDomainData(data);
    scopeCtx.fillStyle - "rgb(0, 0, 0)";
    scopeCtx.fillRect(0,0,scope.width, scope.height);
    scopeCtx.lineWidth = 2;
    scopeCtx.strokeStyle = "rgb(0, 200, 0)";
    scopeCtx.beginPath();
    let sliceWidth = scope.width * 1.0 / scopeBuffer;
    let x  = 0;
    for(let i = 0; i < scopeBuffer; i++) {
        let v = data[i]/128.0;
        let y = v * scope.height / 2;
        if(i === 0) {
            scopeCtx.moveTo(x, y);
        } else {
            scopeCtx.lineTo(x, y);
        }
        x += sliceWidth;
    }
    scopeCtx.lineTo(scope.width, scope.height/2);
    scopeCtx.stroke();
}
//drawScope();


let numDist = 0;

function add_distortion_mod() {
    numDist++;

    let rack = document.getElementById('module_rack');

    rack.insertAdjacentHTML('beforeend',
        `<div id="distortion_${numDist}">
        <label id="dist_ratio_${numDist}" for="dist_ratio_${numDist}">Distortion</label>
        <input id="dist_ratio_${numDist}" type="range" min="0" max="440" value="0" step="10">
        </div>`
    );

    let remove_mod = document.getElementById('remove_module_select');
    remove_mod.insertAdjacentHTML('beforeend', `<option value="distortions">Distortion Pannel ${numDist}</option>`);
    
    let distortions = {id: `distortion_${numDist}`, dist: distortionSquare}
    rackArray.push(distortions)

    var distortion = audioContext.createWaveShaper();

    document.getElementById(`distortion_${numDist}`).addEventListener('input', (e) => {
        let amount = Number(e.target.value)

    });
    distortion.curve = distortion_curve(amount);
    distortion.oversample = '4x';
    distortion.start(0);
    distortion.connect(audioContext.destination);
}

function remove_distortion_mod(selector) {
    let mod_name = selector.selectedOptions[0].innerHTML;
    let mod_num = mod_name.match(/(\d+)/);
    let mod = document.getElementById(`distortion_${mod_num[0]}`);
    let rack = document.getElementById('module_rack');
    rack.removeChild(mod);
    selector.selectedOptions[0].parentNode.removeChild(selector.selectedOptions[0]);
    let index = rackArray.findIndex(({id}) => id === `distortion_${mod_num[0]}`);
    rackArray.splice(index, 1);
}

function distortion_curve(amount) {
    var k = typeof amount === 'number' ? amount : 0,
        n_samples = 44100,
        curve = new Float32Array(n_samples),
        degree = Math.PI / 180,
        i = 0,
        x;
    for ( ; i < n_samples; ++i) {
        x = i * 2 / n_samples - 1;
        curve[i] = (3 + k) * x * 20 * degree / (Math.PI + k * Math.abs(x));
    }

    return curve;
};

// distortion.curve = distortion_curve(400);
// distortion.oversample = '4x';