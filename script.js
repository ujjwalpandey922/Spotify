
// innitialize variable
let songIndex = 0;
let audioele = new Audio('songs/1.mp3');
let masterplay = document.getElementById("masterPlay");
let progbar = document.getElementById("progbar");
let gif = document.getElementById("gif");
let songitem = Array.from(document.getElementsByClassName("songItem"));
let songs = [
    { songname: "Ten Feets Tall", filepath: "songs/ten.mp3", coverpath: "cover/Ten.PNG" },
    { songname: "Dangerous", filepath: "songs/Dangerous.mp3", coverpath: "cover/Dangerous.PNG" },
    { songname: "Fade Into Darkness - Avicii", filepath: "songs/Fade Into Darkness - Avicii.mp3", coverpath: "cover/Fade.PNG" },
    { songname: "Heroes", filepath: "songs/Heroes.mp3", coverpath: "cover/Heros.PNG" },
    { songname: "Martin Garrix feat. Usher - Don't Look Down ", filepath: "songs/Martin Garrix feat. Usher - Don't Look Down (1).mp3", coverpath: "cover/Don't look down.PNG" },
    { songname: "Nicky Romero - Lighthouse ", filepath: "songs/Nicky Romero - Lighthouse (Original Mix).mp3", coverpath: "cover/Lighthouse.PNG" },
    { songname: "The Nights", filepath: "songs/The Nights.mp3", coverpath: "cover/The Nights.PNG" },
    { songname: "The Weeknd - Can't Feel My Face MG Remix", filepath: "songs/The Weeknd - Can't Feel My Face MG Remix.mp3", coverpath: "cover/Can't feel my face.PNG" },
    { songname: "Years and Years - King", filepath: "songs/Years and Years - King.mp3", coverpath: "cover/years and years.PNG" },
    { songname: "Yesterday", filepath: "songs/Yesterday.mp3", coverpath: "cover/Yesterday.PNG" }
]

songitem.forEach((element, i) => {
    // console.log(element,i);
    element.getElementsByTagName('img')[0].src = songs[i].coverpath;
    element.getElementsByClassName('songname')[0].innerText = songs[i].songname;
});


// play button
masterplay.addEventListener('click', () => {
    if (audioele.paused || audioele.currentTime <= 0) {
        // Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
        //     element.addEventListener('click', (e) => {
        //         e.target.classList.remove('fa-circle-play');
        //         e.target.classList.add('fa-pause');      
        //     })
        // })
       
        audioele.play();
        masterplay.classList.remove("fa-play-circle");
        masterplay.classList.add("fa-pause");
        gif.style.opacity = 1;

    }
    else {
        audioele.pause();
        masterplay.classList.remove("fa-pause");
        masterplay.classList.add("fa-play-circle");
        gif.style.opacity = 0;
    }
});


audioele.addEventListener('timeupdate', () => {
    //  update seekbar
    let progress = parseInt((audioele.currentTime / audioele.duration) * 100);
    progbar.value = progress;
})

progbar.addEventListener('change', () => {
    audioele.currentTime = (progbar.value * audioele.duration) / 100;
})

const makeallplay = () => {
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-circle-play');
        //    element.pause();
        //    gif.style.opacity=0;
    })
}
Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
    element.addEventListener('click', (e) => {

        if (audioele.paused && e.target.id == songIndex) {
            audioele.play();
            // console.log("play bhi hora kya");
            document.getElementById('songnameb').innerText = songs[songIndex].songname;
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-pause');
            gif.style.opacity = 1;
            masterplay.classList.remove("fa-play-circle");
            masterplay.classList.add("fa-pause");
        }
        else if (audioele.paused || audioele.currentTime <= 0) {
            makeallplay();
            // console.log("dusre wale main gaya kya re");
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-pause');
            audioele.src = `songs/${songIndex + 1}.mp3`;
            audioele.play();
            document.getElementById('songnameb').innerText = songs[songIndex].songname;
            gif.style.opacity = 1;
            masterplay.classList.remove("fa-play-circle");
            masterplay.classList.add("fa-pause");
            // audioele.currentTime=0;
            // e.target.classList.remove("fa-play-circle");
            // e.target.classList.add("fa-pause");
        }

        else {
            // audioele.currentTime=(progbar.value * audioele.duration) / 100;
            audioele.pause();
            // console.log("third wala hai be");
            e.target.classList.remove("fa-pause");
            e.target.classList.add("fa-play-circle");
            masterplay.classList.remove("fa-pause");
            masterplay.classList.add("fa-play-circle");
            gif.style.opacity = 0;
        }

    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;
    }
    else {
        songIndex++;
    }
    audioele.src = `songs/${songIndex + 1}.mp3`;
    audioele.play();
    document.getElementById('songnameb').innerText = songs[songIndex].songname;
    gif.style.opacity = 1;
    audioele.currentTime = 0;
    masterplay.classList.remove("fa-play-circle");
    masterplay.classList.add("fa-pause");
})
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 9;
    }
    else {
        songIndex--;
    }
    audioele.src = `songs/${songIndex + 1}.mp3`;
    audioele.play();
    document.getElementById('songnameb').innerText = songs[songIndex].songname;
    gif.style.opacity = 1;
    audioele.currentTime = 0;
    masterplay.classList.remove("fa-play-circle");
    masterplay.classList.add("fa-pause");
})