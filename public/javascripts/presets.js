

addPresets();
function addPresets() {
    var newPreset = document.getElementById("add_preset");
    var sounds = ["preset1", "preset2", "preset3", "preset4"];
    var options = "";
  
    for (var i=0; i<sounds.length; i++) {
        options += "<option>" + sounds[i] + "</option>";
    }
  
    newPreset.insertAdjacentHTML('beforeend' , options);
}
