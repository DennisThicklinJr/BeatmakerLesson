class Drumkit{
    constructor(){
        this.pads = document.querySelectorAll('.pad');
        this.playButton = document.querySelector('.play');
        this.currentKick = './allSounds/kick-classic.wav';
        this.currentSnare = './allSounds/snare-acoustic01.wav';
        this.currentHihat = './allSounds/hihat-acoustic01.wav';
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.index = 0;
        //setting the default bpm
        this.bpm = 150;
        this.selects = document.querySelectorAll('select'); 
        this.muteBtns = document.querySelectorAll('.mute');
        this.tempoSlider = document.querySelector('.tempo-slider');
    }
    activePad(){
        // shows a pad being clicked on in console 
        // console.log(this);
        //when we clikc on one of the pads they become active
        this.classList.toggle('active');
    }
    //this repeats our track
    repeat(){
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            if(bar.classList.contains('active')){
                if(bar.classList.contains('kick-pad')){
                    this.kickAudio.currentTime = 0; 
                    this.kickAudio.play();
                }
                if(bar.classList.contains('snare-pad')){
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if(bar.classList.contains('hihat-pad')){
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }

        })
        console.log(step); 
        this.index++;
    }
    //starts the track
    start(){
        //calculates bpm and converts it to milliseconds by multiplying by 1000.
        const interval = (60/this.bpm) * 1000;

        if(this.isPlaying){
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        } else{
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval)
        }
    }
    updateButton() {
        if(this.isPlaying){
            this.playButton.innerText = "Stop";
            this.playButton.classList.add('active');
        }else{
            this.playButton.innerText = 'Play';
            this.playButton.classList.remove('active');
        }
    }
    changeSound(e){
        const selectionName = e.target.name;
        const selectionValue = e.target.value; 
        switch(selectionName){
            case 'kick-select':
                this.kickAudio.src = selectionValue;
                break;
            case 'snare-select':
                this.snareAudio.src = selectionValue;
                break;
            case 'hihat-select':
                this.hihatAudio.src = selectionValue;
                break;
        }
    }
    mute(e){
        //accessing the data track here so we know if we're clicking on kick, snare, or hihat
        const muteIndex = e.target.getAttribute('data-track');
        e.target.classList.toggle('active');
        //if the volume/mute button has an active class, we'll mute the sound of the track
        if(e.target.classList.contains('active')){
            switch(muteIndex){
                case '0':
                    this.kickAudio.volume = 0;
                    break;
                case '1':
                    this.snareAudio.volume = 0;
                    break;
                case '2':
                    this.hihatAudio.volume = 0;
                    break;
            }
        }else{
            switch(muteIndex){
                case '0':
                    this.kickAudio.volume = 1;
                    break;
                case '1':
                    this.snareAudio.volume = 1;
                    break;
                case '2':
                    this.hihatAudio.volume = 1;
                    break;
            }
        }
    }
    changeTempo(e){
        // console.log(e); 
        const tempoText = document.querySelector('.tempo-number');
        tempoText.innerText = e.target.value;
    }
    updateTempo(e){
        this.bpm = e.target.value;
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const playButton = document.querySelector('.play');
        if(playButton.classList.contains('active')){
            this.start();
        }
    }
}

const drumKit = new Drumkit(); 

//adding an event listener to all the pads
drumKit.pads.forEach(pad => {
    pad.addEventListener('click', drumKit.activePad);
    pad.addEventListener('animationend', function(){
        this.style.animation = "";
    })
})
//adding event listener to the play button
drumKit.playButton.addEventListener('click', () => {
    drumKit.start();
    drumKit.updateButton();
})

drumKit.selects.forEach(select => {
    select.addEventListener('change', function(e){
        drumKit.changeSound(e);
    });
});

drumKit.muteBtns.forEach(btn => {
    btn.addEventListener('click', function(e){
        drumKit.mute(e);
    });
});

drumKit.tempoSlider.addEventListener('input', function(e){
    drumKit.changeTempo(e);
})

drumKit.tempoSlider.addEventListener('change', function(e){
    drumKit.updateTempo(e);
})