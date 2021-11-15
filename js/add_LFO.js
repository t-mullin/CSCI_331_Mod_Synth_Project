function add_lfo() {
    console.log("adding lfo");
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
};