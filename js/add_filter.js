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
        </div>`
    );

    //add the module to the selector that selects the module for removal
   remove_option.insertAdjacentHTML('beforeend', `<option value="filter">Filter ${numFilter}</option>`);

   let filter = audioContext.createBiquadFilter();
   filter.type = 'lowpass';
   filter.frequency.value = 10000;
   filter.Q.value = 0;    
   
   let filters = {id: `Filter_${numFilter}`, filter1: filter};
   rackArray.push(filters);

   document.getElementById(`sel_filter_${numFilter}`).addEventListener('change', (e) => {
       let filter_type = e.target.value;
       filter.type = filter_type;
       console.log(filter.type);
   });

   document.getElementById(`freq_cuttoff_${numFilter}`).addEventListener('input', (e) => {
       let newFreq = Number(e.target.value);
       filter.frequency.setValueAtTime(newFreq, audioContext.currentTime);
        console.log(filter.frequency.value);
    });

   document.getElementById(`filter_q_${numFilter}`).addEventListener('input', (e) => {
       filter.Q.value = Number(e.target.value);
       console.log(filter.Q.value);
   });
};