// Distortion module
function add_distortion_mod() {
    numDist++;

    rack.insertAdjacentHTML('beforeend',
        `<div id="distortion_${numDist}">
        <label id="dist_ratio_${numDist}" for="dist_ratio_${numDist}">Distortion</label>
        <input id="dist_ratio_${numDist}" type="range" min="0" max="440" value="0" step="10">
        <label for="dist_out">Distortion Out</label>
        <select class="output_select" id="dist_out_${numDist}" name="dist_out">
            <option value=audioContext.destination>Speakers</option>
        </select>
        </div>`
    );

    remove_option.insertAdjacentHTML('beforeend', `<option value="distortions">Distortion ${numDist}</option>`);

    var distortion = audioContext.createWaveShaper();
    distortion.oversample = '4x';

    outputArray.push(`<option value=distortion_${numDist}.module>Distortion ${numDist}</option>`);
    update_outputs();

    let distortions = { id: `distortion_${numDist}`, module: distortion, output: " " }
    rackArray.push(distortions)

    let amount;
    document.getElementById(`distortion_${numDist}`).addEventListener('input', (e) => {
        amount = Number(e.target.value)
        distortion.curve = distortion_curve(amount);
    });

    document.getElementById(`dist_out_${numDist}`).addEventListener('change', (e) => {
        distortions.output = e.target.value;
    });
}


// Generate number for distortion curve
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