//file for the Web Audio API integration
const AudioContext = window.AudioContext || window.webkitAudioContext;
const freqSquare = document.getElementById('freq_square');
const freqSaw = document.getElementById('freq_saw');
const freqSin = document.getElementById('freq_sin');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const addButton = document.getElementById('add_module');
const removeButton = document.getElementById('remove_module');
let numOsc = 0;
//const scope = document.getElementById('oscilloscope');
//const scopeCtx = scope.getContext("2d");
//const audioContext = new AudioContext();

//let osc_scope = audioContext.createAnalyser();
//osc_scope.fftSize = 2048;
//let scopeBuffer = osc_scope.frequencyBinCount;
//let data = new Uint8Array(scopeBuffer);
//osc_scope.getByteTimeDomainData(data);

//setup();

function add_osc_core() {
    numOsc++;
    let rack = document.getElementById('module_rack');
    rack.insertAdjacentHTML('beforeend', 
        `<div id="osc_core_${numOsc}">
        <canvas id="oscilloscope"></canvas>
        <input id="freq_square_${numOsc}" type="range" min="0" max="440" value="0" step="10">
        <input id="freq_saw_${numOsc}" type="range" min="0" max="440" value="0" step="10">
        <input id="freq_sin_${numOsc}" type="range" min="0" max="440" value="0" step="10">
        </div>`
    );

    let remove_option = document.getElementById('remove_module_select');
    remove_option.insertAdjacentHTML('beforeend', `<option value="oscillators">Oscillator Pannel ${numOsc}</option>`);

    document.getElementById(`freq_square_${numOsc}`).addEventListener('input', (e) => {
        let newFreq = parseInt(e.target.value);
        console.log(e.target);
        //oscSquare.frequency.setValueAtTime(newFreq, audioContext.currentTime);
        //console.log(oscSquare.frequency);
    }); 

    document.getElementById(`freq_saw_${numOsc}`).addEventListener('input', (e) => {
        let newFreq = parseInt(e.target.value);
        console.log(e.target);
        //oscSaw.frequency.setValueAtTime(newFreq, audioContext.currentTime);
        //console.log(oscSquare.frequency);
    });

    document.getElementById(`freq_sin_${numOsc}`).addEventListener('input', (e) => {
        let newFreq = parseInt(e.target.value);
        console.log(e.target);
        //oscSine.frequency.setValueAtTime(newFreq, audioContext.currentTime);
        //console.log(oscSquare.frequency);
    });
}

function remove_osc_core(selector) {
    let module_name = selector.selectedOptions[0].innerHTML;
    let module_num = module_name.match(/(\d+)/);
    let module = document.getElementById(`osc_core_${module_num[0]}`);
    let rack = document.getElementById('module_rack');
    rack.removeChild(module);
    selector.selectedOptions[0].parentNode.removeChild(selector.selectedOptions[0]);
}

addButton.addEventListener('click', () => {
    let selector = document.getElementById('add_module_select');
    switch (selector.value) {
        case 'oscillators':
            add_osc_core();
            break;
        default:
            console.log(selector.value);
    }
});

removeButton.addEventListener('click', () => {
    let selector = document.getElementById('remove_module_select');
    switch (selector.value) {
        case 'oscillators':
            remove_osc_core(selector);
            break;
        default:
            console.log(selector.value);
    }
});


function setup() {
    const oscSquare = audioContext.createOscillator();
    oscSquare.type = 'square';
    oscSquare.frequency = 0;
    const oscSaw = audioContext.createOscillator();
    oscSaw.type = 'sawtooth';
    oscSaw.frequency = 0;
    const oscSine = audioContext.createOscillator();
    oscSine.type = 'sine';
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