let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.createElement('audio');

let track_list = [
    {
        name: "Abhi_Toh_Party_Shuru_Hui_Hai",
        image: "m1.jpg",
        path: "Abhi_Toh_Party_Shuru_Hui_Hai.mp3"
    },
    {
        name: "Aankh_Marey_",
        image: "m2.jpg",
        path: "Aankh_Marey___.mp3"
    },
    {
        name: "Akh_Lad_Jaave_Loveyatri_",
        image: "m3.jpg",
        path: "Akh_Lad_Jaave___Loveyatri___.mp3"
    },
    {
        name: "Bom_Diggy_Diggy",
        image: "m4.jpg",
        path: "Bom_Diggy_Diggy.mp3"
    },
    {
        name: "Chalti_Hai_Kya_9_Se_12_",
        image: "m5.jpg",
        path: "Chalti_Hai_Kya_9_Se_12_.mp3"
    },
    {
        name: "Dheere_Dheere_Se_Meri_Zindagi_",
        image: "m6.jpg",
        path: "Dheere_Dheere_Se_Meri_Zindagi_.mp3"
    },
    {
        name: "Dhinka_Chika_",
        image: "m7.jpg",
        path: "Dhinka_Chika__.mp3"
    },
    {
        name: "Ek_Do_Teen",
        image: "m8.jpg",
        path: "Ek_Do_Teen.mp3"
    },
    {
        name: "KGF__Gali_Gali_",
        image: "m9.jpg",
        path: "KGF__Gali_Gali_.mp3"
    },
    {
        name: "Luka_Chuppi_COCA_COLA_",
        image: "m10.jpg",
        path: "Luka_Chuppi__COCA_COLA_.mp3"
    },
    {
        name: "Lungi_Dance_The_",
        image: "m11.jpg",
        path: "Lungi_Dance__The_.mp3"
    }
];

function loadTrack(track_index) {
    clearInterval(updateTimer);
    resetValues();
    
    curr_track.src = track_list[track_index].path;
    curr_track.load();
    
    track_art.style.backgroundImage = `url(${track_list[track_index].image})`;
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    
    updateTimer = setInterval(seekUpdate, 1000);
    
    curr_track.addEventListener("ended", nextTrack);
}

function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function playpauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
    if (track_index < track_list.length - 1)
        track_index += 1;
    else track_index = 0;
    
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    if (track_index > 0)
        track_index -= 1;
    else track_index = track_list.length - 1;
    
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
    let seekPosition = 0;
    
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;
        
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
        
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
        
        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

// Load the first track
loadTrack(track_index);
