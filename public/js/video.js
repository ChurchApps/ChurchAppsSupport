init();

function addVideoPlaylist(firstVideo){
  var videoplaylist = document.getElementById('videoplaylist');
  if (!videoplaylist) {
    var video = document.createElement('video');
    video.id = 'videoplaylist';
    video.controls = true;
    document.getElementById('videoContainer').appendChild(video);
    
    var src = document.createElement('source');
    src.src = firstVideo;
    video.appendChild(src);
  }
}

function init(){
  
  var playlist = document.getElementById('playlist');
  var tracks = playlist.getElementsByTagName('a');

  addVideoPlaylist(tracks[0].getAttribute('href'));
  var videoplaylist = document.getElementById('videoplaylist');
  //videoplaylist.play();
  
  for(var track in tracks) {
    var link = tracks[track];
    if(typeof link === "function" || typeof link === "number") continue;
    
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var song = this.getAttribute('href');
      run(song, videoplaylist, this);
    });
  }
  
  videoplaylist.addEventListener('ended',function(e) {
      for(var track in tracks) {
        var link = tracks[track];
        var nextTrack = parseInt(track) + 1;
        if(typeof link === "function" || typeof link === "number") continue;
        if(!this.src) this.src = tracks[0];
        if(track == (tracks.length - 1)) nextTrack = 0;
        const shortPath = link.getAttribute('href').replace(/\.\.\//g, '');
        //console.log(nextTrack, shortPath, this.src);

        if(this.src.indexOf(shortPath) != -1){
          var nextLink = tracks[nextTrack];
          run(nextLink.getAttribute('href'), videoplaylist, nextLink);
          break;
        }
      }
  });
}

function run(song, videoplaylist, link){
  console.log("run", song);
  var parent = link.parentElement;

  //quitar el active de todos los elementos de la lista
  var items = parent.parentElement.getElementsByTagName('li');
  for(var item in items) {
    if(items[item].classList)
      items[item].classList.remove("active");
  }

  //agregar active a este elemento
  parent.classList.add("active");

  //tocar la cancion
  videoplaylist.src = song;
  videoplaylist.load();

  var startTime = link.getAttribute('data-start');
  if (startTime) {
    videoplaylist.addEventListener('loadedmetadata', function onLoaded() {
      videoplaylist.currentTime = parseFloat(startTime);
      videoplaylist.removeEventListener('loadedmetadata', onLoaded);
    });
  }

  videoplaylist.play();
}