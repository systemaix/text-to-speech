const textArea = document.getElementById("text");
const speakBtn = document.getElementById("speakBtn");
const stopBtn = document.getElementById("stopBtn");
const voiceSelect = document.getElementById("voiceSelect");

const synth = window.speechSynthesis;
let voices = [];

function loadVoices() {
    voices = synth.getVoices();
    voiceSelect.innerHTML = "";
  
    voices.forEach((voice, index) => {
          const option = document.createElement("option");
          option.value = index;
          option.textContent = `${voice.name} (${voice.lang})`;
          voiceSelect.appendChild(option);
    });
}

// Some browsers load voices asynchronously
synth.onvoiceschanged = loadVoices;

speakBtn.addEventListener("click", () => {
    if (!textArea.value) return;
  
    const utterance = new SpeechSynthesisUtterance(textArea.value);
    utterance.voice = voices[voiceSelect.value];
    synth.speak(utterance);
});

stopBtn.addEventListener("click", () => {
    synth.cancel();
});
