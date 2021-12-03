//file for the Web Audio API integration
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');
const addButton = document.getElementById('add_module');
const removeButton = document.getElementById('remove_module');
const rack = document.getElementById('module_rack'); //gets the div that is going to contain the modules
const remove_option = document.getElementById('remove_module_select');

let numOsc = 0;
let numLFO = 0;
let numFilter = 0;
let numVCA = 0;
let numDist = 0;

const rackArray = [];
const outputArray = [];

function connect_inputs() {
    for (const obj in rackArray) {
        if(rackArray[obj].output === 'audioContext.destination') {
            rackArray[obj].module.connect(audioContext.destination);
        } else {
            const outputs = rackArray[obj].output.split('.');
            var index = rackArray.findIndex(({ id }) => id === outputs[0]);
            if(outputs.length === 2) {
                rackArray[obj].module.connect(rackArray[index].module);
            } else {
                if(outputs[2] === 'frequency') {
                    rackArray[obj].module.connect(rackArray[index].module.frequency);
                } else if(outputs[2] === 'gain') {
                    rackArray[obj].module.connect(rackArray[index].module.gain);
                } else if(outputs[2] === 'Q') {
                    rackArray[obj].module.connect(rackArray[index].module.Q);
                }
            }
        }
    }
}

function disconnect_inputs() {
    for (const obj in rackArray) {
        if(rackArray[obj].output === 'audioContext.destination') {
            rackArray[obj].module.disconnect(audioContext.destination);
        } else {
            const outputs = rackArray[obj].output.split('.');
            var index = rackArray.findIndex(({ id }) => id === outputs[0]);
            if(outputs.length === 2) {
                rackArray[obj].module.disconnect(rackArray[index].module);
            } else {
                if(outputs[2] === 'frequency') {
                    rackArray[obj].module.disconnect(rackArray[index].module.frequency);
                } else if(outputs[2] === 'gain') {
                    rackArray[obj].module.disconnect(rackArray[index].module.gain);
                } else if(outputs[2] === 'Q') {
                    rackArray[obj].module.disconnect(rackArray[index].module.Q);
                }
            }
        }
    }
}

function update_outputs() {
    let outputSel = document.querySelectorAll('select.output_select');
    for (let i = 0; i < outputSel.length; i++) {
        //console.log(outputSel[i]);
        for(let k = outputSel[i].length; k > 0; k--) {
            outputSel[i].remove(k);
        }
        for(let j = 0; j < outputArray.length; j++) {
            outputSel[i].insertAdjacentHTML('beforeend', outputArray[j]);
        }
    }
}

//sets up an event listener on the addButton
addButton.addEventListener('click', () => {
    //gets what module that the end user wants to add
    let selector = document.getElementById('add_module_select');
    //selects the correct add module function based on the selected option 
    switch (selector.value) {
        case 'oscillator':
            add_osc_core();
            break;
        case 'lfo':
            add_lfo();
            break;
        case 'filter':
            add_filter();
            break;
        case 'distortions':
            add_distortion_mod();
            break;
        case 'vca':
            add_vca();
            break;
        default:
            console.log(selector.value);
    }
});

//sets up an event listener on the removeButton
removeButton.addEventListener('click', () => {
    audioContext.suspend();
    //gets what module that the end user wants to remove
    let selector = document.getElementById('remove_module_select');
    //selects the correct remove module function based on the selected option
    //gets the selected option from the selector element
    let module_name = selector.selectedOptions[0].innerHTML;
    //gets the number from the selected element
    let module_num = module_name.match(/(\d+)/);
    let moduleRemoved = false;
    switch (selector.value) {
        case 'oscillator':
            moduleRemoved = true;
            var module = document.getElementById(`osc_core_${module_num[0]}`);
            var index = rackArray.findIndex(({ id }) => id === `osc_core_${module_num[0]}`);
            var modID = `osc_core_${module_num[0]}`;
            break;
        case 'lfo':
            moduleRemoved = true;
            var module = document.getElementById(`LFO_${module_num[0]}`);
            var index = rackArray.findIndex(({ id }) => id === `LFO_${module_num[0]}`);
            var modID = `LFO_${module_num[0]}`;
            break;
        case 'filter':
            moduleRemoved = true;
            var module = document.getElementById(`Filter_${module_num[0]}`);
            var index = rackArray.findIndex(({ id }) => id === `Filter_${module_num[0]}`);
            var modID = `Filter_${module_num[0]}`;
            break;
        case 'distortions':
            moduleRemoved = true;
            var module = document.getElementById(`distortion_${module_num[0]}`);
            var index = rackArray.findIndex(({ id }) => id === `distortion_${module_num[0]}`);
            var modID = `distortion_${module_num[0]}`;
            break;
        case 'vca':
            moduleRemoved = true;
            var module = document.getElementById(`vca_${module_num[0]}`);
            var index = rackArray.findIndex(({ id }) => id === `vca_${module_num[0]}`);
            var modID = `vca_${module_num[0]}`;
            break;
        default:
            console.log(selector.value);
    }
    if (moduleRemoved) {
        rack.removeChild(module);
        selector.selectedOptions[0].parentNode.removeChild(selector.selectedOptions[0]);
        rackArray.splice(index, 1);
        let outputIndex = [];
        for(let i = 0; i < outputArray.length; i++) {
            if(outputArray[i].toString().includes(modID)) {
                outputIndex.push(i);
            }
        }
        for(let i = outputIndex.length; i > 0; i--) {
            outputArray.splice(outputIndex[i-1], 1);
        }
    }
    update_outputs();
});

playButton.addEventListener('click', () => {
    playButton.style.backgroundColor = "#99e550";
    pauseButton.style.backgroundColor = "#444";
    document.getElementById('control_panel').style.backgroundColor = "#99e550";
    connect_inputs();
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
});

pauseButton.addEventListener('click', () => {
    pauseButton.style.backgroundColor = "#99e550";
    playButton.style.backgroundColor = "#444";
    document.getElementById('control_panel').style.backgroundColor = "#444";
    audioContext.suspend();
    disconnect_inputs();
});