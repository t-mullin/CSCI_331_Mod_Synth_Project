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
    remove_option.insertAdjacentHTML('beforeend', `<option value="oscillator">Oscillator ${numOsc}</option>`);

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