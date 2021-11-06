//file for the Web Audio API integration
const AudioContext = window.AudioContext || window.webkitAudioContext;
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const addButton = document.getElementById('add_module');
const removeButton = document.getElementById('remove_module');
const rack = document.getElementById('module_rack'); //gets the div that is going to contain the modules
let numOsc = 0;
let numLFO = 0;
let numFilter = 0;
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

function add_inputs() {
    for(const obj in rackArray){
        //console.log(`${obj}: ${rackArray[obj].id}`);
        if(rackArray[obj].id.match(/(osc_core_)/)) {
            //console.log(rackArray[obj].id);
        } else if(rackArray[obj].id.match(/(LFO_)/)) {
            console.log(rackArray[obj].id);
        } else if(rackArray[obj].id.match(/(Filter_)/)) {

        }
    }
}

/* add_osc_core: Adds the html containing the structure for a new oscillator module.
 *               The module contains a squarewave, sawtoothwave, and sinewave oscillators.
 *               The oscillators are intialized and events are added to sliders that control 
 *               the frequency of the oscillators.   
 */ 
function add_osc_core() {
    numOsc++; //used for template literals
    //insert the html to make an oscillator module, each is unique due to using a template literal
    rack.insertAdjacentHTML('beforeend', 
        `<div id="osc_core_${numOsc}">
        <h3>Osc Core ${numOsc}</h3>
        <label for="freq_square">Square Freq</label>
        <input id="freq_square_${numOsc}" name="freq_square" type="range" min="0" max="440" value="0" step="10">
        <label for="freq_saw">Saw Freq</label>
        <input id="freq_saw_${numOsc}" name="freq_saw" type="range" min="0" max="440" value="0" step="10">
        <label for="freq_sine">Sine Freq</label>
        <input id="freq_sin_${numOsc}" name="freq_sine" type="range" min="0" max="440" value="0" step="10">
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
    let oscillators = {id: `osc_core_${numOsc}`, osc1: oscSquare, osc2: oscSaw, osc3: oscSine};
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


function add_lfo() {
    numLFO++;
    //insert the html to make an oscillator module, each is unique due to using a template literal
    rack.insertAdjacentHTML('beforeend', 
        `<div id="LFO_${numLFO}">
        <h3>LFO ${numLFO}</h3>
        <input id="freq_lfo_${numLFO}" type="range" min="0" max="220" value="0" step="0.1">
        <label for="add_LFO">LFO Type:</label>
        <select id="sel_lfo_${numLFO}" name="add_LFO">
            <option value='square'>Square</option>
            <option value='sine'>Sine</option>
            <option value='sawtooth'>Sawtooth</option>
            <option value='triangle'>Triangle</option>
        </select>
        </div>`
    );
    //add the module to the selector that selects the module for removal
    let remove_option = document.getElementById('remove_module_select');
    remove_option.insertAdjacentHTML('beforeend', `<option value="lfo">LFO ${numLFO}</option>`);

    //setting up the oscillatorNodes
    let lfo = audioContext.createOscillator();
    lfo.type = 'square';
    lfo.frequency.value = 0;

    let lfos = {id: `LFO_${numLFO}`, lfo1: lfo};
    rackArray.push(lfos);

    document.getElementById(`sel_lfo_${numLFO}`).addEventListener('change', (e) => {
        let lfo_type = e.target.value;
        lfo.type = lfo_type;
    });

    document.getElementById(`freq_lfo_${numLFO}`).addEventListener('input', (e) => {
        let newFreq = Number(e.target.value);
        lfo.frequency.setValueAtTime(newFreq, audioContext.currentTime);
    });

}

function add_filter() {
    numFilter++;
    //insert the html to make an oscillator module, each is unique due to using a template literal
    rack.insertAdjacentHTML('beforeend', 
        `<div id="Filter_${numFilter}">
        <h3>Filter ${numFilter}</h3>
        <label for="filter_cutoff">Cutoff Freq</label>
        <input id="freq_cuttoff_${numFilter}" name="filter_cutoff" type="range" min="0" max="10000" value="0" step="1">
        <label for="filter_q">Resonance</label>
        <input id="filter_q_${numFilter}" name="filter_q" type="range" min="0" max="12" value="0" step="1">
        <label for="filter_type">Filter Type:</label>
        <select id="sel_filter_${numFilter}" name="filter_type">
            <option value='lowpass'>Low Pass</option>
            <option value='highpass'>High Pass</option>
        </select>
        </div>`
    );

    //add the module to the selector that selects the module for removal
   let remove_option = document.getElementById('remove_module_select');
   remove_option.insertAdjacentHTML('beforeend', `<option value="filter">Filter ${numFilter}</option>`);

   let filter = audioContext.createBiquadFilter();
   filter.type = 'lowpass';
   filter.frequency.value = 10000;
   filter.Q.value = 0;    
   
   let filters = {id: `Filter_${numFilter}`, filter1: filter};
   rackArray.push(filters);

   document.getElementById(`sel_filter_${numFilter}`).addEventListener('change', (e) => {
       let filter_type = e.target.value;
       filter.type = filter_type;
       console.log(filter.type);
   });

   document.getElementById(`freq_cuttoff_${numFilter}`).addEventListener('input', (e) => {
       let newFreq = Number(e.target.value);
       filter.frequency.setValueAtTime(newFreq, audioContext.currentTime);
        console.log(filter.frequency.value);
    });

   document.getElementById(`filter_q_${numFilter}`).addEventListener('input', (e) => {
       filter.Q.value = Number(e.target.value);
       console.log(filter.Q.value);
   });

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
        case 'lfo':
            add_lfo();
            break;
        case 'filter':
            add_filter();
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
    //gets the selected option from the selector element
    let module_name = selector.selectedOptions[0].innerHTML;
    //gets the number from the selected element
    let module_num = module_name.match(/(\d+)/);
    let moduleRemoved = false;
    switch (selector.value) {
        case 'oscillators':
            moduleRemoved = true;
            var module = document.getElementById(`osc_core_${module_num[0]}`);
            var index = rackArray.findIndex(({id}) => id === `osc_core_${module_num[0]}`);
            break;
        case 'lfo':
            moduleRemoved = true;
            var module = document.getElementById(`LFO_${module_num[0]}`);
            var index = rackArray.findIndex(({id}) => id === `LFO_${module_num[0]}`);
            break;
        case 'filter':
            moduleRemoved = true;
            var module = document.getElementById(`Filter_${module_num[0]}`);
            var index = rackArray.findIndex(({ id }) => id === `Filter_${module_num[0]}`);
            break;
        default:
            console.log(selector.value);
    }
    if(moduleRemoved) {
        rack.removeChild(module);
        selector.selectedOptions[0].parentNode.removeChild(selector.selectedOptions[0]);
        rackArray.splice(index, 1);
    }
});

playButton.addEventListener('click', () => {
    add_inputs();
    if(audioContext.state === 'suspended') {
        audioContext.resume();
    }
}); 

pauseButton.addEventListener('click', () => {
    audioContext.suspend();
}); 

function setup() {
    
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
    
    var distortion = audioContext.createWaveShaper();

    let distortions = {id: `distortion_${numDist}`, dist: distortion}
    rackArray.push(distortions)

    
    let amount;
    document.getElementById(`distortion_${numDist}`).addEventListener('input', (e) => {
         amount = Number(e.target.value)
         distortion.curve = distortion_curve(amount);
         console.log(distortion.curve);
    });

    const oscSaw = audioContext.createOscillator();
    oscSaw.type = 'sawtooth';
    oscSaw.frequency.value = 440;
    
    
    console.log(distortion.curve);
    distortion.oversample = '4x';
    oscSaw.start(0);
    oscSaw.connect(distortion);
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