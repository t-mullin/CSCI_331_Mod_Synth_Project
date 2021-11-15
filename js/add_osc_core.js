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
};