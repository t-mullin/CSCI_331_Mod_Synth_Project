// Low frequency oscillator module
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