//const scope = document.getElementById('oscilloscope');
//const scopeCtx = scope.getContext("2d");
//let osc_scope = audioContext.createAnalyser();
//osc_scope.fftSize = 2048;
//let scopeBuffer = osc_scope.frequencyBinCount;
//let data = new Uint8Array(scopeBuffer);
//osc_scope.getByteTimeDomainData(data);

//need to replace this as it is direcly from https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode
//used to debug
function drawScope() {
    requestAnimationFrame(drawScope);
    osc_scope.getByteTimeDomainData(data);
    scopeCtx.fillStyle - "rgb(0, 0, 0)";
    scopeCtx.fillRect(0,0,scope.width, scope.height);
    scopeCtx.lineWidth = 2;
    scopeCtx.strokeStyle = "rgb(0, 200, 0)";
    scopeCtx.beginPath();
    let sliceWidth = scope.width * 1.0 / scopeBuffer;
    let x  = 0;
    for(let i = 0; i < scopeBuffer; i++) {
        let v = data[i]/128.0;
        let y = v * scope.height / 2;
        if(i === 0) {
            scopeCtx.moveTo(x, y);
        } else {
            scopeCtx.lineTo(x, y);
        }
        x += sliceWidth;
    }
    scopeCtx.lineTo(scope.width, scope.height/2);
    scopeCtx.stroke();
}
//drawScope();