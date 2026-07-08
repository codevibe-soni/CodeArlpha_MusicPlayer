let songName = document.querySelector("#songName");
let songSinger = document.querySelector("#song-singer");
let songImage = document.querySelector(".song-img");
let playPauseImage = document.querySelector("#play-pause");
let nextSong = document.querySelector("#next");
let prevSong = document.querySelector("#previous");
let volumeIcon = document.querySelector(".volume-img i");
let songDuration = document.querySelector("#song-duration");
let Animation = document.querySelector("#animation");
let playBtn = document.getElementById("Playlist-btn");
let playList = document.querySelector(".playlist");
let playListImage = document.querySelector("#playList-img");
let songPlaylist = document.querySelectorAll(".songplaylist");
console.log(playBtn);
console.log(playList);
let index = 3;
let playingSong = false;

let track = document.createElement("audio");

let songs = [
    {
        name:"love me like you do",
        path:"Assets/love me like you do.mp3",
        image:"Assets/singer1.jpg",
        singer:"Ellie Goulding"
    },
    {
         name:"belever",
         path:"Assets/belever.mp3",
         image:"Assets/belibverimg.jpg",
         singer:"Imagine Dragons"
    },
    {
         name:"unstopable",
         path:"Assets/Unstoppable Sia .mp3",
         image:"Assets/unstopable.jpg",
         singer:"Sia"
    },
    {
        name:"Sapne bde",
        path:"Assets/sapnebde.mp3",
        image:"Assets/spne bde.jpg",
        singer:"Unknown"
    },
];

function loadTrack(index){
track.src = songs[index].path;
track.load();
songDuration.value = 0;
songName.innerHTML = songs[index].name;
songSinger.innerHTML = songs[index].singer;
songImage.style =  `background-image: url("${songs[index].image}");`
volume();
setInterval(()=>{
    songDuration.max = track.duration;
    songDuration.value =track.currentTime;
},1000);

}

loadTrack(index);

function playPause(){
    if(playingSong == false){
        playSong();
        Animation.style.display = "flex";
    }else{
        PauseSong();
        Animation.style.display = "none";
    }
        }

   function  playSong(){
        track.play();
        playingSong = true;
        playPauseImage.classList.replace("fa-play", "fa-pause");

    }
    function PauseSong(){
    track.pause();
    playingSong = false;
    playPauseImage.classList.replace("fa-pause", "fa-play");
}

function next(){
    if (index == songs.length-1){
        index = 0;
        
    }else{
    index++;
    }
    loadTrack(index);
    if(playingSong){
        playSong();
    }
}

function previous(){
    if(index == 0){
        index = songs.length-1;
    }else{
        index--;
    }
    loadTrack(index);

    if(playingSong){
        playSong();
    }
}

function volume(){
track.volume = document.querySelector("#volume-range").value/100;
if(track.volume == 0){
volumeIcon.classList.replace("fa-volume-high", "fa-volume-xmark");
}else{
     volumeIcon.classList.replace("fa-volume-xmark", "fa-volume-high");
}
}

function Duration(){
    track.currentTime = songDuration.value ;
}

playBtn.addEventListener("click",()=>{
    playList.classList.toggle("playlist-active");
    if(playList.classList.contains("playlist-active")){

        //  playListImage.classList.replace("fa-bars", "fa-xmark");
        playListImage.classList.remove("fa-brands","fa-napster");
         playListImage.classList.add("fa-solid","fa-xmark");
    }else{
        playListImage.classList.remove("fa-solid","fa-xmark");
        playListImage.classList.add("fa-brands","fa-napster");
        //   playListImage.classList.replace("fa-xmark", "fa-bars");
    }
   

});

songPlaylist.forEach((song,index)=>{
song.addEventListener("click",()=>{
loadTrack(index);
playSong();
//   playList.classList.remove("playlist-active");

});
});

track.addEventListener("ended",()=>{
    next();
    playSong();
});



