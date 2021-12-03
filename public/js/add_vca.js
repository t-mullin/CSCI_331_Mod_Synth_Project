// Voltage-Controlled Amplifier mod
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

    let vcas = { id: `vca_${numVCA}`, module: vca, output: " " };
    rackArray.push(vcas);

    document.getElementById(`gain_${numVCA}`).addEventListener('input', (e) => {
        vca.gain.value = Number(e.target.value);
    });

    document.getElementById(`vca_out_${numVCA}`).addEventListener('change', (e) => {
        vcas.output = e.target.value;
    });
}