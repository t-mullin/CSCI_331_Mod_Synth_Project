//file for the Web Audio API integration
const AudioContext = window.AudioContext || window.webkitAudioContext;
const freqSquare = document.getElementById('freq_square');
const freqSaw = document.getElementById('freq_saw');
const freqSin = document.getElementById('freq_sin');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const scope = document.getElementById('oscilloscope');
const scopeCtx = scope.getContext("2d");
const audioContext = new AudioContext();

let osc_scope = audioContext.createAnalyser();
osc_scope.fftSize = 2048;
let scopeBuffer = osc_scope.frequencyBinCount;
let data = new Uint8Array(scopeBuffer);
osc_scope.getByteTimeDomainData(data);

setup();

/*
var oscSquare = new OscillatorNode(audioContext, {
    type: 'square',
    frequency: 440
});

const oscSaw = new OscillatorNode(audioContext, {
    type: 'sawtooth',
    frequency: 440
});

const oscSin = new OscillatorNode(audioContext, {
    type: 'sine',
    frequency: 440
});

const gain = new GainNode(audioContext, {
    gain: 1,
});

freqSquare.addEventListener('input', (e) => {
    let newFreq = parseInt(e.target.value);
    console.log(newFreq);
    oscSquare.frequency.setValueAtTime(newFreq, audioContext.currentTime);
    console.log(oscSquare.frequency);
}); 

freqSaw.addEventListener('input', () => {
    let newFreq = parseInt(e.target.value);
    oscSaw.frequency.value = newFreq;
}); 

freqSin.addEventListener('input', () => {
    let newFreq = parseInt(e.target.value);
    oscSin.frequency.value = newFreq;
}); 

let time = audioContext.currentTime;
playButton.addEventListener('click', () => {
    oscSquare.connect(gain).connect(audioContext.destination);
    oscSquare.start(time);
    oscSquare.stop(time + 5);
}); 

playButton.addEventListener('click', () => {
    oscSquare.disconnect();
}); 
*/
function setup() {
    //const AudioContext = window.AudioContext || window.webkitAudioContext;
    //const audioContext = new AudioContext();

    const oscSquare = audioContext.createOscillator();
    oscSquare.type = 'square';
    const gain = audioContext.createGain();
    oscSquare.connect(osc_scope);
    oscSquare.connect(gain);
    oscSquare.start(0);
    freqSquare.addEventListener('input', (e) => {
        console.log(audioContext.state);
        let newFreq = parseInt(e.target.value);
        //console.log(newFreq);
        oscSquare.frequency.setValueAtTime(newFreq, audioContext.currentTime);
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
drawScope();