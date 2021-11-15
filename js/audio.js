//file for the Web Audio API integration


const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const addButton = document.getElementById('add_module');
const removeButton = document.getElementById('remove_module');
const rack = document.getElementById('module_rack'); //gets the div that is going to contain the modules
const remove_option = document.getElementById('remove_module_select');

let numOsc, numLFO, numFilter, numDist = 0;

const rackArray = [];

//setup();

function add_inputs() {
    for(const obj in rackArray){
        //console.log(`${obj}: ${rackArray[obj].id}`);
        if(rackArray[obj].id.match(/(osc_core_)/)) {
            //console.log(rackArray[obj].id);
        } else if(rackArray[obj].id.match(/(LFO_)/)) {
            console.log(rackArray[obj].id);
        } else if(rackArray[obj].id.match(/(Filter_)/)) {

        } else if(rackArray[obj].id.match(/(distortion_)/)) {

        }
    }
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
        case 'distortions':
            moduleRemoved = true;
            var module = document.getElementById(`distortion_${module_num[0]}`);
            var index = rackArray.findIndex(({id}) => id === `distortion_${module_num[0]}`);
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

