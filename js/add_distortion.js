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

    let distortions = {id: `distortion_${numDist}`, dist: distortion}
    rackArray.push(distortions)

    let amount;
    document.getElementById(`distortion_${numDist}`).addEventListener('input', (e) => {
         amount = Number(e.target.value)
         distortion.curve = distortion_curve(amount);
         //console.log(distortion.curve);
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
    var k = typeof amount === 'number' ? amount : 50,
        n_samples = 44100,
        curve = new Float32Array(n_samples);//,
        //degree = Math.PI / 180,
        //x;
    amount_norm = amount / 440;
    for (i = 0; i < n_samples; ++i) {

        if (curve[i] > amount) {
            curve[i] = amount
        }
        else if (curve[i] < -amount) {
            curve[i] = amount
        }
        //x = i * 2 / n_samples - 1;
        //curve[i] = (3 + k) * x * 20 * degree / (Math.PI + k * Math.abs(x));
    }

    return curve;
};