    // Different channel sounds consts
    const sound = new Audio();
    const channel1 = new Audio();
    const channel2 = new Audio();
    const channel3 = new Audio();
    const channel4 = new Audio();   
    // Catch all music buttons 
    const buttons = document.querySelectorAll('button.music');
    // Catch all record buttons
    const recordBtns = document.querySelectorAll('button.record');
    // Catch all record replay buttons
    const playingBtns = document.getElementsByName('play');

    // Music Array
    const playList = ['', 'Music/boom.wav', 'Music/clap.wav', 'Music/hihat.wav', 'Music/kick.wav', 'Music/openhat.wav', 'Music/ride.wav', 'Music/snare.wav', 'Music/tink.wav', 'Music/tom.wav'];

    // -- Play sound by image click f.
    function playSoundByClick() {
        sound.src = playList[this.dataset.music];   //  choose music src from array depended of click
        sound.play();   //  play audio
    }

    // -- Play sound by key press f. 
    function playSoundByKey(e) {
        let index = 1; // default key 1 (boom.wav)

        // check if key is between 1-9
        for (let i = 1; i < playList.length; i++) {
            if (i == e.key)
                index = i;  //  assign pressed e.key to index
        }

        sound.src = playList[index];    // choose music src from array depended of key pressed
        sound.play();   // play audio
    }

    // -- Music click event listener
    buttons.forEach(button => {
        button.addEventListener('click', playSoundByClick);
    });

    // -- Keyup event listener
    document.addEventListener('keyup', playSoundByKey);


    //  -- Recording

        //  Lets
    let streamReference, mediaRecorder, audioUrl1, audioUrl2, audioUrl3, audioUrl4;

        //  Channel Arrays
    let audioChunk1 = [], audioChunk2 = [], audioChunk3 = [], audioChunk4 = [];

        //  -- Channel recording buttons listener
    recordBtns.forEach(recordChannel => {
        recordChannel.addEventListener('click', () => {
            // Choose channel f.
            let temp = channelSwitcher(recordChannel.dataset.channel);
            // Choose audio channel 
            let audioUrl = recordChannel.dataset.channel;
            //  Check if recording mark recording channel as red color
            recordChannel.style.color == '' ? recordChannel.style.color = 'red' : recordChannel.style.color = '';
            // Start recording f.
            recording(temp, audioUrl);
        });
    });

        // -- Records replaying buttons listener

        playingBtns.forEach(playingBtn => {
        playingBtn.addEventListener('click', () => { 

        // Choose channel record replaying
        const audioUrl = playingBtn.dataset.channel;

        // Choose different channels sound src
        switch(audioUrl) {
            case '1':
                channel1.src = audioUrl1;     
                channel1.play();    //  play audio
            break;
            case '2':
                channel2.src = audioUrl2;  
                channel2.play();    //  play audio
            break;
            case '3':
                channel3.src = audioUrl3;  
                channel3.play();    //  play audio
            break;
            case '4':
                channel4.src = audioUrl4;  
                channel4.play();    //  play audio
            break;
        }
    });
    });
    
        //  -- Choose channel recording f.

    function channelSwitcher(audioChunk) {

        //  Recording src arrays
        switch(audioChunk) {
            case '1':
                return audioChunk1;
            case '2':
                return audioChunk2;
            case '3':
                return audioChunk3;
            case '4':
                return audioChunk4;
        }
    }

        //  --  Recording audio function

    function recording(audioChunk, audioUrl) {
        //  Check if already recording then stop
        if(mediaRecorder && mediaRecorder.state == "recording") {
            //  Stop recording
            mediaRecorder.stop();
            //  Turn off recording icon
            streamReference.getAudioTracks()[0].stop();
        } 
        //  else start recording
        else {
            console.log(`recording started: Channel${audioUrl}`);
            // Creating audio stream
            navigator.mediaDevices.getUserMedia({ audio: true }).then(function(stream) {
                
            streamReference = stream;
            //  Passing stream into MediaRecorder constructor
            mediaRecorder = new MediaRecorder(stream);
            //  Media Recorder method - start audio recording.
            mediaRecorder.start();
            //  data chunks listener 
            mediaRecorder.addEventListener("dataavailable", event => {
            //  push data chunks to array
            audioChunk.push(event.data);
            });

            //  Stop recording and save audio f.
            mediaRecorder.addEventListener("stop", function() {
                //  Convert audio data chunks to a single audio data blob
                const audioBlob = new Blob(audioChunk);
                console.log(`Recording stopped: Channel${audioUrl}`);
                //  Create an url for single audio data blob
                //  Pass audio chunks to arrays
                switch(audioUrl) {
                    case '1':   //channel1
                        audioUrl1 = URL.createObjectURL(audioBlob);
                    break;
                    case '2':   //channel2
                        audioUrl2 = URL.createObjectURL(audioBlob);
                    break;
                    case '3':   //channel3
                        audioUrl3 = URL.createObjectURL(audioBlob);
                    break;
                    case '4':   //channel4
                        audioUrl4 = URL.createObjectURL(audioBlob);
                    break;
                }
            });
        });
    }
}

