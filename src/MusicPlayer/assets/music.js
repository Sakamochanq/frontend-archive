// Control Button
const audioPlayer = document.getElementById('audioPlayer');
const totalTimeElement = document.getElementById('totalTime');
const currentTimeElement = document.getElementById('currentTime');
const seekRangeElement = document.getElementById('music-range');
const playButton = document.getElementById('playButton');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const randomButton = document.getElementById('randButton');
const loopButton = document.getElementById('loopButton');

// Icon Image
var randomIcon = document.getElementById('random');
var prevIcon = document.getElementById('prev');
var playIcon = document.getElementById('pause');
var nextIcon = document.getElementById('next');
var loopIcon = document.getElementById('loop');

let isPlaying = false;
let isLooping = false;
let currentSongIndex = -1;

const songsInfo = [
    {
        src: './assets/pop/songs/MyMelancholyBaby.mp3',
        albumImage: './assets/pop/albums/MyMelancholyBaby.png',
        musicName: 'My Melancholy Baby',
        artistName: 'ProleteR'
    },
    {
        src: './assets/pop/songs/ThrowItBack.mp3',
        albumImage: './assets/pop/albums/ThrowItBack.png',
        musicName: 'Throw It Back',
        artistName: 'ProleteR'
    },
    {
        src: './assets/pop/songs/ByTheRiver.mp3',
        albumImage: './assets/pop/albums/ByTheRiver.png',
        musicName: 'By The River',
        artistName: 'ProleteR'
    },
];

//load song info
function loadSong(index) {
    const albumIcon = document.querySelector('.album-icon');
    const musicNameElement = document.getElementById('music-name');
    const artistNameElement = document.getElementById('artist-name');

    const currentSong = songsInfo[index];
    audioPlayer.src = currentSong.src;

    albumIcon.src = currentSong.albumImage;
    musicNameElement.textContent = currentSong.musicName;
    artistNameElement.textContent = currentSong.artistName;
    document.title = currentSong.musicName + " - " + currentSong.artistName;
}

loadSong(0);

audioPlayer.onloadedmetadata = () => {
    const totalTimeInSeconds = audioPlayer.duration;
    seekRangeElement.max = totalTimeInSeconds;

    const totalMinutes = Math.floor(totalTimeInSeconds / 60);
    const totalSeconds = Math.floor(totalTimeInSeconds % 60);

    const formattedTotalTime = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
    totalTimeElement.textContent = formattedTotalTime;
};

audioPlayer.addEventListener('timeupdate', () => {
    const currentTimeInSeconds = audioPlayer.currentTime;
    const currentMinutes = Math.floor(currentTimeInSeconds / 60);
    const currentSeconds = Math.floor(currentTimeInSeconds % 60);

    const formattedCurrentTime = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;

    currentTimeElement.textContent = formattedCurrentTime;
    seekRangeElement.value = currentTimeInSeconds;
});

seekRangeElement.addEventListener('input', () => {
    const seekPositionInSeconds = seekRangeElement;
    audioPlayer.currentTime = seekPositionInSeconds;
});

//Ended
audioPlayer.addEventListener('ended', () => {
    currentSongIndex = (currentSongIndex + 1) % songsInfo.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    isPlaying = true;
    playIcon.src = './assets/images/play.png';
});

// Play
playButton.addEventListener('click', () => {
    if (isPlaying) {
        audioPlayer.pause();
        playIcon.src = './assets/images/pause.png';
    } else {
        audioPlayer.play();
        playIcon.src = './assets/images/play.png';
    }
    isPlaying = !isPlaying;
});

// Next
nextButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songsInfo.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    isPlaying = true;
    playIcon.src = './assets/images/play.png';
});

// Prev
prevButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songsInfo.length) % songsInfo.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    isPlaying = true;
    playIcon.src = './assets/images/play.png';
});

// Random
randomButton.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * songsInfo.length);
    loadSong(randomIndex);
    audioPlayer.play();
    isPlaying = true;
    playIcon.src = './assets/images/play.png';
});

// Loop
loopButton.addEventListener('click', () => {
    if(isLooping){
        audioPlayer.loop = false;
        loopButton.style.boxShadow = '5px 5px 15px #bcbcbc, -5px -5px 15px #ffffff';
    }
    else{
        audioPlayer.loop = true;
        loopButton.style.boxShadow = 'inset 5px 5px 15px #bcbcbc, inset -5px -5px 15px #ffffff';
    }
    isLooping = !isLooping;
});