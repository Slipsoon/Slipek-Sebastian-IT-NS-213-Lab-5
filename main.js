const sound = new Audio();
const buttons = document.querySelectorAll('button.music');

const playList = ['Music/boom.wav', 'Music/clap.wav', 'Music/hihat.wav', 'Music/kick.wav', 'Music/openhat.wav', 'Music/ride.wav', 'Music/snare.wav', 'Music/tink.wav', 'Music/tom.wav'];

function playSound() {
    sound.src = playList[this.dataset.music];
    sound.play();
}

buttons.forEach(button => button.addEventListener('click', playSound));