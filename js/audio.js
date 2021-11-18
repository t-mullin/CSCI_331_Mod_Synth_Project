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
const connectionArray = []; //module:  ie osc1, output: object member ie auduioContect.destination 
const outputArray = [];
//connectionArray[x].module.connect(connectionArray[x].output) maybe this will work

//setup();

function add_inputs() {
    for (const obj in rackArray) {
        //console.log(`${obj}: ${rackArray[obj].id}`);
        //if (rackArray[obj].id.match(/(osc_core_)/)) {
            //console.log(rackArray[obj].id);
            for(let osc = 0; osc < rackArray[obj]["module"].length; osc++) {
                if(rackArray[obj]["module"][osc].output != " ") {
                    //console.log(rackArray[obj]["module"][osc].output);
                    if(rackArray[obj]["module"][osc].output === 'audioContext.destination') {
                        rackArray[obj]["module"][osc].osc.connect(audioContext.destination);
                    } else {
                        let out = rackArray[obj]["module"][osc].output;
                        let outputID = out.substring(0, out.indexOf('.'));
                        let outputMod = rackArray.find((mod) => {return mod.id == outputID});
                        
                        console.log(out)
                        console.log(outputMod.module[0]["osc"])
                        console.log(out.substring(out.indexOf('.')+1))

                        if(out.substring(out.indexOf('.')+1) === 'oscSquare') {
                            rackArray[obj]["module"][osc]["osc"].connect(outputMod.module[0]["osc"]);
                        } else if(out.substring(out.indexOf('.')+1) === 'oscSquare') {
                            rackArray[obj]["module"][osc]["osc"].connect(outputMod.module[1]["osc"]);
                        } else if(out.substring(out.indexOf('.')+1) === 'oscSquare') {
                            rackArray[obj]["module"][osc]["osc"].connect(outputMod.module[2]["osc"]);
                        } else if(out.substring(out.indexOf('.')+1) === 'oscSquare.frequency') {
                            rackArray[obj]["module"][osc]["osc"].connect(outputMod.module[0]["osc"].frequency);
                        } else if(out.substring(out.indexOf('.')+1) === 'oscSaw.frequency') {
                            rackArray[obj]["module"][osc]["osc"].connect(outputMod.module[1]["osc"].frequency);
                        } else if(out.substring(out.indexOf('.')+1) === 'oscSine.frequency') {
                            rackArray[obj]["module"][osc]["osc"].connect(outputMod.module[2]["osc"].frequency);
                        } 
                    }
                }
            }
        //} else if (rackArray[obj].id.match(/(LFO_)/)) {


        //} else if (rackArray[obj].id.match(/(Filter_)/)) {

        //} else if (rackArray[obj].id.match(/(distortion_)/)) {

        //}
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
        <label for="osc_freq">Osc Freq</label>
        <input id="osc_freq_${numOsc}" name="osc_freq" type="range" min="0" max="880" value="0" step="10">
        <label for="add_osc">Osc Type:</label>
        <select id="sel_osc_${numOsc}" name="add_Osc">
            <option value='square'>Square</option>
            <option value='sine'>Sine</option>
            <option value='sawtooth'>Sawtooth</option>
            <option value='triangle'>Triangle</option>
        </select>
        <label for="osc_out">Osc Out</label>
        <select class="output_select" id="osc_out_${numOsc}" name="osc_out">
            <option value=audioContext.destination>Speakers</option>
        </select>
        </div>`
    );
    //add the module to the selector that selects the module for removal
    remove_option.insertAdjacentHTML('beforeend', `<option value="oscillator">Oscillator Panel ${numOsc}</option>`);

    //setting up the oscillatorNodes
    let osc = audioContext.createOscillator();
    osc.type = 'square';
    osc.frequency.value = 0;
    osc.start(0);

    outputArray.push(`<option value=osc_core_${numOsc}.module>Osc ${numOsc}</option>`);
    outputArray.push(`<option value=osc_core_${numOsc}.module.frequency>Osc ${numOsc} Frequency</option>`);

    update_outputs();

    //adding the oscillator module to the global list of modules
    //NOTE: may need to change this to include the input/output to make connecting modules
    //      easier
    let oscillator = { id: `osc_core_${numOsc}`, module: osc, output: " "};
    rackArray.push(oscillator);

    //setting up event listeners for the frequency sliders
    document.getElementById(`osc_freq_${numOsc}`).addEventListener('input', (e) => {
        osc.frequency.setValueAtTime(Number(e.target.value), audioContext.currentTime);
    });

    document.getElementById(`sel_osc_${numOsc}`).addEventListener('change', (e) => {
        osc.type = e.target.value;
    });

    document.getElementById(`osc_out_${numOsc}`).addEventListener('change', (e) => {
        oscillator.output = e.target.value;
    });

};

function add_lfo() {
    numLFO++;
    //insert the html to make an oscillator module, each is unique due to using a template literal
    rack.insertAdjacentHTML('beforeend',
        `<div id="LFO_${numLFO}">
        <h3>LFO ${numLFO}</h3>
        <label for="lfo_freq">LFO Freq</label>
        <input id="freq_lfo_${numLFO}" name="lfo_freq" type="range" min="0" max="220" value="0" step="0.1">
        <label for="add_LFO">LFO Type:</label>
        <select id="sel_lfo_${numLFO}" name="add_LFO">
            <option value='square'>Square</option>
            <option value='sine'>Sine</option>
            <option value='sawtooth'>Sawtooth</option>
            <option value='triangle'>Triangle</option>
        </select>
        <label for="lfo_out">LFO Out</label>
        <select class="output_select" id="lfo_out_${numLFO}" name="lfo_out">
            <option value=audioContext.destination>Speakers</option>
        </select>
        </div>`
    );
    //add the module to the selector that selects the module for removal
    remove_option.insertAdjacentHTML('beforeend', `<option value="lfo">LFO ${numLFO}</option>`);

    //setting up the oscillatorNodes
    let lfo = audioContext.createOscillator();
    lfo.type = 'square';
    lfo.frequency.value = 0;
    lfo.start(0);
    
    outputArray.push(`<option value=LFO_${numLFO}.module>LFO ${numLFO}</option>`);
    outputArray.push(`<option value=LFO_${numLFO}.module.frequency>LFO ${numLFO} Frequency</option>`);
    update_outputs();


    let lfos = { id: `LFO_${numLFO}`, module : lfo, output: " "};
    rackArray.push(lfos);

    document.getElementById(`sel_lfo_${numLFO}`).addEventListener('change', (e) => {
        lfo.type = e.target.value;
    });

    document.getElementById(`freq_lfo_${numLFO}`).addEventListener('input', (e) => {
        lfo.frequency.setValueAtTime(Number(e.target.value), audioContext.currentTime);
    });

    document.getElementById(`lfo_out_${numLFO}`).addEventListener('change', (e) => {
        lfos.output = e.target.value;
    });

};

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
        <label for="filter_out">Filter Out</label>
        <select class="output_select" id="filter_out_${numFilter}" name="filter_out">
            <option value=audioContext.destination>Speakers</option>
        </select>
        </div>`
    );

    //add the module to the selector that selects the module for removal
    remove_option.insertAdjacentHTML('beforeend', `<option value="filter">Filter ${numFilter}</option>`);

    let filter = audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 0;
    filter.Q.value = 0;

    outputArray.push(`<option value=Filter_${numFilter}.module>Filter ${numFilter}</option>`);
    outputArray.push(`<option value=Filter_${numFilter}.module.frequency>Filter ${numFilter} Cutoff</option>`);
    outputArray.push(`<option value=Filter_${numFilter}.module.Q>Filter ${numFilter} Q</option>`);
    update_outputs();

    let filters = { id: `Filter_${numFilter}`, module: filter, output: " "};
    rackArray.push(filters);

    document.getElementById(`sel_filter_${numFilter}`).addEventListener('change', (e) => {
        filter.type = e.target.value;
    });

    document.getElementById(`freq_cuttoff_${numFilter}`).addEventListener('input', (e) => {
        filter.frequency.setValueAtTime(Number(e.target.value), audioContext.currentTime);
    });

    document.getElementById(`filter_q_${numFilter}`).addEventListener('input', (e) => {
        filter.Q.setValueAtTime(Number(e.target.value), audioContext.currentTime);
    });

    document.getElementById(`filter_out_${numFilter}`).addEventListener('change', (e) => {
        filters.output = e.target.value;
    });
};

function add_vca() {
    numVCA++;
    rack.insertAdjacentHTML('beforeend',
    `<div id="vca_${numVCA}">
    <h3>VCA ${numVCA}</h3>
    <label for="gain">Gain</label>
    <input id="gain_${numVCA}" name="gain" type="range" min="0" max="2000" value="0" step="1">
    <label for="vca_out">VCA Out</label>
    <select class="output_select" id="vca_out_${numVCA}" name="vca_out">
        <option value=audioContext.destination>Speakers</option>
    </select>
    </div>`
    );

    //add the module to the selector that selects the module for removal
    remove_option.insertAdjacentHTML('beforeend', `<option value="vca">VCA ${numVCA}</option>`);

    let vca = audioContext.createGain();
    vca.gain.value = 0;

    outputArray.push(`<option value=vca_${numVCA}.module>VCA ${numVCA}</option>`);
    outputArray.push(`<option value=vca_${numVCA}.module.gain>VCA ${numVCA} Gain</option>`);
    update_outputs();

    let vcas = {id: `vca_${numVCA}`, module:  vca, output: " "};
    rackArray.push(vcas);

    document.getElementById(`gain_${numVCA}`).addEventListener('input', (e) => {
        vca.gain.value = Number(e.target.value);
    });

    document.getElementById(`vca_out_${numVCA}`).addEventListener('change', (e) => {
        vcas.output = e.target.value;
    });
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
    document.getElementById('control_pannel').style.backgroundColor = "#99e550";
    //add_inputs();
    setup();
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
});

pauseButton.addEventListener('click', () => {
    pauseButton.style.backgroundColor = "#99e550";
    playButton.style.backgroundColor = "#444";
    document.getElementById('control_pannel').style.backgroundColor = "#444";
    audioContext.suspend();
});

function setup() {
    add_osc_core();
    add_lfo();
    add_vca();
    add_filter();
    rackArray[0].module[1].osc.connect(rackArray[3].module[0].filter);
    rackArray[3].module[0].filter.connect(audioContext.destination);
    rackArray[1].module[0].lfo.connect(rackArray[2].module[0].vca);
    rackArray[2].module[0].vca.connect(rackArray[3].module[0].filter.frequency);

    add_osc_core();
    add_lfo();
    add_vca();

    rackArray[4].module[2].osc.connect(audioContext.destination);
    rackArray[5].module[0].lfo.connect(rackArray[6].module[0].vca);
    rackArray[6].module[0].vca.connect(rackArray[4].module[2].osc.frequency);

}

function add_distortion_mod() {
    numDist++;

    rack.insertAdjacentHTML('beforeend',
        `<div id="distortion_${numDist}">
        <label id="dist_ratio_${numDist}" for="dist_ratio_${numDist}">Distortion</label>
        <input id="dist_ratio_${numDist}" type="range" min="0" max="440" value="0" step="10">
        </div>`
    );

    remove_option.insertAdjacentHTML('beforeend', `<option value="distortions">Distortion Pannel ${numDist}</option>`);

    var distortion = audioContext.createWaveShaper();
    distortion.oversample = '4x';

    let distortions = { id: `distortion_${numDist}`, dist: distortion }
    rackArray.push(distortions)

    let amount;
    document.getElementById(`distortion_${numDist}`).addEventListener('input', (e) => {
        amount = Number(e.target.value)
        distortion.curve = distortion_curve(amount);
        console.log(distortion.curve);
    });

    //const oscSaw = audioContext.createOscillator();
    //oscSaw.type = 'sawtooth';
    //oscSaw.frequency.value = 440;
    //console.log(distortion.curve);
    //oscSaw.start(0);
    //oscSaw.connect(distortion);
    //distortion.connect(audioContext.destination);
}

function distortion_curve(amount) {
    var k = typeof amount === 'number' ? amount : 0,
        n_samples = 44100,
        curve = new Float32Array(n_samples),
        degree = Math.PI / 180,
        i = 0,
        x;
    for (; i < n_samples; ++i) {
        x = i * 2 / n_samples - 1;
        curve[i] = (3 + k) * x * 20 * degree / (Math.PI + k * Math.abs(x));
    }

    return curve;
};