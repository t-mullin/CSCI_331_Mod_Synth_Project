
var osc = "The oscillators are circuts which produce continuous, repeating, alternating waveform.\n";

var lfo = "The LFO stands for Low Frequency Oscillator and this is functionally the same as a normal oscillator, although typically the frequency is below 20 Hz.\n";

var dist = "The distortion module is responsible for making alterations to the waveform created by the oscillator.\n";

var filter = "The filter module is used to cut out frequencies from a waveform, cutting out either the high or the low end.\n";

var vca = "The voltage-controlled amplifier module is used to control the amount that a connected effect or waveform can pass through the output of the module.\n";

var instructions = 'To get sound out of an oscillator, first connect the "Osc Out" paremeter to any other output, then change it back to "Speaker." Now, when you press play and adjust the frequency, you should hear the oscillation.';
        
var connect = 'Once you have added other modules to the module rack, you should see options in their respective "Outputs" for each other module. Once a module output is connected to another component (i.e. frequency or gain), so long as there is an oscillator (whether an LFO or an Osc Node) with its output connected to the speaker.\n';
    


const instructButton = document.getElementById('guide');

instructButton.addEventListener('click', () => {
    alert(`${osc}\n${lfo}\n${dist}\n${filter}\n${vca}\n${instructions}\n${connect}\n`);
});