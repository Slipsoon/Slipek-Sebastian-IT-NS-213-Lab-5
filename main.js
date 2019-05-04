    // Consts
    const sound = new Audio();
    const buttons = document.querySelectorAll('button.music');

    // Music Array
    const playList = ['', 'Music/boom.wav', 'Music/clap.wav', 'Music/hihat.wav', 'Music/kick.wav', 'Music/openhat.wav', 'Music/ride.wav', 'Music/snare.wav', 'Music/tink.wav', 'Music/tom.wav'];

    // Play sound by image click f.
    function playSoundByClick() {
        sound.src = playList[this.dataset.music];
        sound.play();
    }

    // Play sound by key press f. 
    function playSoundByKey(e) {
        let index = 1; // default key 1 (boom.wav)

        // check if key is between 1-9
        for (let i = 1; i < playList.length; i++) {
            if (i == e.key)
                index = i;
        }

        sound.src = playList[index];
        sound.play();
    }

    // Music click event listener
    buttons.forEach(button => {
        button.addEventListener('click', playSoundByClick);
    });
    // Keyup event listener
    document.addEventListener('keyup', playSoundByKey);