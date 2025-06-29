 const playlists = [{
     id: 1,
     title: "From DEVARA MOVIE ",
     description: "Top hit songs from devara movie",
     image: "image/ayudha.jpg",
     songs: [{
         title: "Ayudha Pooja",
         artist: "From DEVARA PART 1",
         duration: "2:54",
         image: "image/ayudha.jpg",
         audio: "audios/ayudhapooja.mp3"
     }, {
         title: "Daavudi Song",
         artist: "From DEVARA PART 1",
         duration: "3:05",
         image: "image/daavudi.jpg",
         audio: " audios/daavudi.mp3"
     }]
 }, {
     id: 2,
     title: "From HII NANNA MOVIE",
     description: "Best songs from hii nanna movie",
     image: "image/samayama.jpg",
     songs: [{
         title: "Gaju Bomma Song",
         artist: "From HII NANNA MOVIE",
         duration: "4:24",
         image: "image/gajubomma.jpg",
         audio: "audios/gajubomma.mp3"
     }, {
         title: "Samayama Song",
         artist: "From HII NANNA MOVIE",
         duration: "3:20",
         image: "image/samayama.jpg",
         audio: "audios/samayama.mp3"
     }]
 }, {
     id: 3,
     title: "ANIMAL MOVIE",
     description: "Top hit songs from animal movie",
     image: "image/evarevaro.jpg",
     songs: [{
         title: "Evarevaroo Song",
         artist: "From ANIMAL MOVIE",
         duration: "4:08",
         image: "image/evarevaro.jpg",
         audio: "audios/evarevaro.mp3"
     }, {
         title: "Nanna Nuvvu naa pranam..",
         artist: "From ANIMAL MOVIE",
         duration: "3:04",
         image: "image/nannanuvvu.jpg",
         audio: "audios/nannanuvvuna.mp3"
     }]
 }, {
     id: 4,
     title: "ABCD2",
     description: "Top hit song from abcd2 movie",
     image: "image/sunsaathiya.jpg",
     songs: [{
         title: "Sun Saathiya",
         artist: "From ABCD2",
         duration: "3:40",
         image: "image/sunsaathiya.jpg",
         audio: "audios/sunsaathiya.mp3"
     }]
 }];

 const recentlyPlayed = [{
     title: "Samayama Song",
     artist: "From HII NANNA MOVIE",
     duration: "3:20",
     image: "image/samayama.jpg",
     audio: "audios/samayama.mp3"
 }, {
     title: "Nanna Nuvvu naa pranam..",
     artist: "From ANIMAL MOVIE",
     duration: "3:04",
     image: "image/nannanuvvu.jpg",
     audio: "audios/nannanuvvuna.mp3"
 }, {
     title: "Evarevaroo Song",
     artist: "From ANIMAL MOVIE",
     duration: "4:08",
     image: "image/evarevaro.jpg",
     audio: "audios/evarevaro.mp3"
 }, {
     title: "Daavudi Song",
     artist: "From DEVARA PART 1",
     duration: "3:05",
     image: "image/daavudi.jpg",
     audio: "audios/daavudi.mp3"
 }, {
     title: "Ayudha Pooja",
     artist: "From DEVARA PART 1",
     duration: "2:54",
     image: "image/ayudha.jpg",
     audio: "audios/ayudhapooja.mp3"
 }, {
     title: "Gaju Bomma Song",
     artist: "From HII NANNA MOVIE",
     duration: "4:24",
     image: "image/gajubomma.jpg",
     audio: "audios/gajubomma.mp3"
 }];


 let currentTrack = null;
 let isPlaying = false;
 let audio = new Audio();
 let progressInterval;
 let missingFiles = [];


 const playlistContainer = document.getElementById('playlist-container');
 const recentContainer = document.getElementById('recent-container');
 const playlistList = document.getElementById('playlist-list');
 const playPauseBtn = document.getElementById('play-pause-btn');
 const currentTrackImg = document.getElementById('current-track-img');
 const currentTrackName = document.getElementById('current-track-name');
 const currentTrackArtist = document.getElementById('current-track-artist');
 const progressBar = document.getElementById('progress-bar');
 const currentTimeEl = document.getElementById('current-time');
 const totalTimeEl = document.getElementById('total-time');
 const errorMessage = document.getElementById('error-message');


 const fullPlayer = document.getElementById('full-player');
 const playerClose = document.getElementById('player-close');
 const fullPlayerImg = document.getElementById('full-player-img');
 const fullPlayerTitle = document.getElementById('full-player-title');
 const fullPlayerArtist = document.getElementById('full-player-artist');
 const fullProgressBar = document.getElementById('full-progress-bar');
 const fullCurrentTime = document.getElementById('full-current-time');
 const fullTotalTime = document.getElementById('full-total-time');
 const fullPlayPauseBtn = document.getElementById('full-play-pause-btn');


 function initPlayer() {

     renderPlaylists();
     renderRecentlyPlayed();


     playPauseBtn.addEventListener('click', togglePlay);
     playerClose.addEventListener('click', closeFullPlayer);
     fullPlayPauseBtn.addEventListener('click', togglePlay);

     audio.addEventListener('timeupdate', updateProgress);
     audio.addEventListener('ended', nextTrack);
     audio.addEventListener('error', handleAudioError);


     if (missingFiles.length > 0) {
         showErrors();
     }
 }


 function handleAudioError() {
     if (currentTrack) {
         missingFiles.push(`Audio file: ${currentTrack.audio}`);
         showErrors();
     }
     pauseTrack();
 }


 function showErrors() {
     let errorHTML = '<h3>Missing Files:</h3>';
     errorHTML += '<p>Some files could not be loaded. Please check these paths:</p>';
     errorHTML += '<ul>';
     files
     const uniqueMissingFiles = [...new Set(missingFiles)];

     uniqueMissingFiles.forEach(file => {
         errorHTML += `<li><span class="file-path">${file}</span></li>`;
     });

     errorHTML += '</ul>';
     errorHTML += '<p>Make sure the files exist in the specified locations.</p>';

     errorMessage.innerHTML = errorHTML;
     errorMessage.style.display = 'block';
 }


 function renderPlaylists() {

     playlistContainer.innerHTML = '';
     playlistList.innerHTML = '';


     playlists.forEach(playlist => {
         const li = document.createElement('li');
         li.innerHTML = `
                    <a href="#" data-id="${playlist.id}">
                        <span>${playlist.title}</span>
                    </a>
                `;
         playlistList.appendChild(li);


         li.querySelector('a').addEventListener('click', (e) => {
             e.preventDefault();
             loadPlaylist(playlist.id);
         });
     });


     playlists.forEach(playlist => {
         const playlistCard = document.createElement('div');
         playlistCard.className = 'playlist-card';
         playlistCard.innerHTML = `
                    <div class="playlist-img">
                        <img src="${playlist.image}" alt="${playlist.title}" onerror="handleImageError(this, '${playlist.image}')">
                        <div class="play-btn">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                    <div class="playlist-title">${playlist.title}</div>
                    <div class="playlist-desc">${playlist.description}</div>
                `;


         playlistCard.querySelector('.play-btn').addEventListener('click', (e) => {
             e.stopPropagation();
             setTrack(playlist.songs[0]);
             playTrack();
         });

         playlistContainer.appendChild(playlistCard);
     });
 }


 function handleImageError(imgElement, path) {

     imgElement.src = ' ';

     missingFiles.push(`Image file: ${path}`);
 }

 function renderRecentlyPlayed() {
     recentContainer.innerHTML = '';

     recentlyPlayed.forEach(song => {
         const songCard = document.createElement('div');
         songCard.className = 'playlist-card';
         songCard.innerHTML = `
                    <div class="playlist-img">
                        <img src="${song.image}" alt="${song.title}" onerror="handleImageError(this, '${song.image}')">
                        <div class="play-btn">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                    <div class="playlist-title">${song.title}</div>
                    <div class="playlist-desc">${song.artist}</div>
                `;


         songCard.querySelector('.play-btn').addEventListener('click', (e) => {
             e.stopPropagation();
             setTrack(song);
             playTrack();
         });

         recentContainer.appendChild(songCard);
     });
 }

 function openFullPlayer() {
     fullPlayer.classList.add('active');
 }


 function closeFullPlayer() {
     fullPlayer.classList.remove('active');
 }


 function loadPlaylist(playlistId) {
     const playlist = playlists.find(p => p.id === playlistId);
     if (!playlist) return;


     alert(`Loading playlist: ${playlist.title}`);
 }


 function setTrack(track) {
     currentTrack = track;


     currentTrackImg.src = track.image;
     currentTrackImg.onerror = function() {
         this.src = ' ';
         missingFiles.push(`Image file: ${track.image}`);
         showErrors();
     };

     currentTrackName.textContent = track.title;
     currentTrackArtist.textContent = track.artist;

     fullPlayerImg.src = track.image;
     fullPlayerImg.onerror = function() {
         this.src = ' ';
     };

     fullPlayerTitle.textContent = track.title;
     fullPlayerArtist.textContent = track.artist;
     audio.src = track.audio;
     audio.load();
     const [minutes, seconds] = track.duration.split(':');
     totalTimeEl.textContent = `${minutes}:${seconds}`;
     fullTotalTime.textContent = `${minutes}:${seconds}`;
 }

 function togglePlay() {
     if (isPlaying) {
         pauseTrack();
     } else {
         playTrack();
     }
 }

 function playTrack() {
     if (!currentTrack) return;

     audio.play().then(() => {
         isPlaying = true;
         playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
         fullPlayPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
         openFullPlayer();
         progressInterval = setInterval(updateProgress, 1000);
     }).catch(error => {
         missingFiles.push(`Audio file: ${currentTrack.audio}`);
         showErrors();
         console.error("Error playing audio:", error);
     });
 }

 function pauseTrack() {
     audio.pause();
     isPlaying = false;
     playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
     fullPlayPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
     clearInterval(progressInterval);
 }

 function updateProgress() {
     if (!audio.duration || isNaN(audio.duration)) return;

     const progressPercent = (audio.currentTime / audio.duration) * 100;
     progressBar.style.width = `${progressPercent}%`;
     fullProgressBar.style.width = `${progressPercent}%`;
     const currentMinutes = Math.floor(audio.currentTime / 60);
     const currentSeconds = Math.floor(audio.currentTime % 60);
     currentTimeEl.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
     fullCurrentTime.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
 }

 function nextTrack() {
     alert("Playing next track...");
     pauseTrack();
     audio.currentTime = 0;
 }
 document.addEventListener('DOMContentLoaded', initPlayer);