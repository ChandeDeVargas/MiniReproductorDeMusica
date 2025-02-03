//Se crea un array para almacenar las canciones disponibles dentro de songsList

const songsList = [
    {
        name: "Love is a Bitch",
        artist: "Two Feet",
        src: "assets/mp1.mpeg",
        cover: "assets/images.jpeg"
    },
    {
        name: "Starboy",
        artist: "The Weeknd",
        src: "assets/mp3.mpeg",
        cover: "assets/The_Weeknd_-_Starboy.png"
    },
    {
        name: "Softcore",
        artist: "The Neighbourhood",
        src: "assets/mp2.mpeg",
        cover: "assets/TheNeighbourhood.png"
    }
];

//Obtención de Elementos del DOM o los objetos que se encuentran en html y css
const artistName = document.querySelector('.artist-name');
const musicName = document.querySelector('.song-name');
const fillBar = document.querySelector('.fill-bar');
const time = document.querySelector('.time');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const prog = document.querySelector('.progress-bar');

/*Creación de Variables Globales
song: Se crea un objeto Audio de JavaScript para reproducir música.
currentSong: Índice de la canción que se está reproduciendo en songsList.
playing: Variable booleana que indica si una canción está en reproducción.
*/
let song = new Audio();
let currentSong = 0;
let playing = false;

/*Evento DOMContentLoaded
Cuando la página se carga (DOMContentLoaded):
Se llama loadSong(currentSong), que carga la primera canción.
Se añaden eventos:
timeupdate: Actualiza la barra de progreso mientras la canción se reproduce.
ended: Reproduce la siguiente canción automáticamente cuando una termina.
click en prevBtn y nextBtn para cambiar de canción.
click en playBtn para reproducir o pausar.
click en prog para adelantar o retroceder en la canción.
*/
document.addEventListener('DOMContentLoaded', () => {
    loadSong(currentSong);
    song.addEventListener('timeupdate', updateProgress);
    song.addEventListener('ended', nextSong);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    playBtn.addEventListener('click', togglePlayPause);
    prog.addEventListener('click', seek);
});

/*Función loadSong(index)
Carga una canción en base al índice index:
Asigna el nombre del artista y la canción en el HTML.
Cambia la ruta del archivo de audio (song.src).
Cambia la imagen de portada.
*/
function loadSong(index) {
    const { name, artist, src, cover: thumb } = songsList[index];
    artistName.innerText = artist;
    musicName.innerText = name;
    song.src = src;
    cover.style.backgroundImage = `url(${thumb})`;
}

/*Función updateProgress()
Actualiza la barra de progreso mientras la canción se reproduce.
Calcula el porcentaje pos del tiempo transcurrido y ajusta fillBar.
Muestra el tiempo actual y total de la canción usando formatTime().
*/
function updateProgress() {
    if (song.duration) {
        const pos = (song.currentTime / song.duration) * 100;
        fillBar.style.width = `${pos}%`;

        const duration = formatTime(song.duration);
        const currentTime = formatTime(song.currentTime);
        time.innerText = `${currentTime} - ${duration}`;

    }
}

//Convierte los segundos en formato minutos:segundos.
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

/*Si la canción está en reproducción (playing === true), la pausa.
Si está pausada (playing === false), la reproduce.
Cambia la apariencia del botón de play/pause y agrega la clase active a la portada.
*/
function togglePlayPause() {
    if (playing) {
        song.pause();
    } else {
        song.play();
    }
    playing = !playing;
    playBtn.classList.toggle('fa-pause', playing);
    playBtn.classList.toggle('fa-play', !playing);
    cover.classList.toggle('active', playing);
}
/*Pasa a la siguiente canción.
Si está en la última canción, vuelve a la primera (% songsList.length evita errores).
Llama a playMusic() para cargar y reproducir la nueva canción.
*/
function nextSong() {
    currentSong = (currentSong + 1) % songsList.length;
    playMusic();
}
//Lo mismo
function prevSong() {
    currentSong = (currentSong - 1 + songsList.length) % songsList.length;
    playMusic();
}

//Lo mismo
function playMusic() {
    loadSong(currentSong);
    song.play();
    playing = true;
    playBtn.classList.add('fa-pause');
    playBtn.classList.remove('fa-play');
    cover.classList.add('active');
}
//Adelanta y retrocede
function seek(e) {
    const pos = (e.offsetX / prog.clientWidth) * song.duration;
    song.currentTime = pos;
}