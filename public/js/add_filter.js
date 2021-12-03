// Filter module
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