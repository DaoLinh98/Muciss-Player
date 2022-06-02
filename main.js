const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playlist = $('.playlist')
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.cd');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const nextBtn = $(' .btn-next');
const prevBnt = $('.btn-prev')
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const playlist2 = $('.playlist')
const app = {
    currentIndex: 0,
    isplaying: false,
    israndom: false,
    isrepeat: false,
    songs: [{
        name: "Caught Up - Gryffin",
        singer: "Olivia O' Brien",
        path: "./mussic/song2.mp3",
        image: "./img/img1.jpg"
    }, {
        name: "Something Just Like This",
        singer: "The Chainsmokers",
        path: "./mussic/song3.mp3",
        image: "./img/img2.jpg"
    }, {
        name: "Closer",
        singer: "The Chainsmokers; Halsey",
        path: "./mussic/song4.mp3",
        image: "./img/img3.jpg"
    }, {
        name: "The River",
        singer: "Axel Johansson",
        path: "./mussic/song5.mp3",
        image: "./img/img4.jpg"
    }, {
        name: "On My Way",
        singer: "Alan Walker",
        path: "./mussic/song6.mp3",
        image: "./img/img5.jpg"
    }, {
        name: "Darkside",
        singer: "Alan Walker",
        path: "./mussic/song7.mp3",
        image: "./img/img6.jpg"
    }, {
        name: "Caught Up - Gryffin",
        singer: "Olivia O' Brien",
        path: "./mussic/song2.mp3",
        image: "./img/img1.jpg"
    }, {
        name: "Something Just Like This",
        singer: "The Chainsmokers",
        path: "./mussic/song3.mp3",
        image: "./img/img2.jpg"
    }, {
        name: "Closer",
        singer: "The Chainsmokers; Halsey",
        path: "./mussic/song4.mp3",
        image: "./img/img3.jpg"
    }, {
        name: "The River",
        singer: "Axel Johansson",
        path: "./mussic/song5.mp3",
        image: "./img/img4.jpg"
    }, {
        name: "On My Way",
        singer: "Alan Walker",
        path: "./mussic/song6.mp3",
        image: "./img/img5.jpg"
    }, {
        name: "Darkside",
        singer: "Alan Walker",
        path: "./mussic/song7.mp3",
        image: "./img/img6.jpg"
    }, ],
    render() {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>
          
          `
        })
        playlist.innerHTML = htmls.join('');
    },
    defineProperties() {
        Object.defineProperty(this, 'currentSong', {
            get() {
                return this.songs[this.currentIndex];
            }
        })

    },

    handlEvents() {
        const _this = this;

        const cdWidth = cd.offsetWidth;
        document.onscroll = function() {
            const scrolltop = window.scrollY;
            const newCdWidth = cdWidth - scrolltop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;


        }
        playBtn.onclick = function() {
            if (app.isplaying) {
                audio.pause()
            } else {
                audio.play()

            }
        }
        audio.onplay = function() {
            app.isplaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();



        }
        audio.onpause = function() {
            app.isplaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();


        }

        audio.ontimeupdate = function() {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent;

            }

        }
        progress.onchange = function(e) {
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime
        }
        const cdThumbAnimate = cdThumb.animate([{
            transform: 'rotate(360deg)'
        }], {
            duration: 40000,
            iteration: Infinity,


        });
        cdThumbAnimate.pause();


        nextBtn.onclick = function() {
            if (app.israndom) {
                app.playRandom();
            } else {
                app.nextSong();
            }

            audio.play();
            app.render();
            app.scrollToActiveSong();

        };

        prevBnt.onclick = function() {
            if (app.israndom) {
                app.playRandom();
            } else {
                app.prevSong();

            }
            audio.play();
            app.render();
            app.scrollToActiveSong();



        };

        randomBtn.onclick = function() {
            if (app.israndom) {
                app.israndom = false;
                randomBtn.classList.remove("active");
            } else {
                app.israndom = true;
                randomBtn.classList.add("active");
            }

        }

        audio.onended = function() {
            if (app.isrepeat) {
                audio.play();
            } else {
                nextBtn.click();
            }

        };


        repeatBtn.onclick = function() {
            if (app.isrepeat) {
                app.isrepeat = false;
                repeatBtn.classList.remove("active");
                console.log(app.isrepeat);

            } else {
                app.isrepeat = true;
                repeatBtn.classList.add("active");
                console.log(app.isrepeat);
            }

        };

        playlist2.onclick = function(e) {
            const songnode = e.target.closest('.song:not(.active)');
            if (e.target.closest('.song:not(.active)') ||
                e.target.closest('.option')) {
                if (songnode) {

                    app.currentIndex = Number(songnode.dataset.index);
                    app.loadCurrentSong();
                    app.render();
                    audio.play();



                }
            }
        }



    },
    scrollToActiveSong() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500)
    },


    loadCurrentSong() {
        heading.textcontent = this.songs[this.currentIndex].name;
        cdThumb.style.backgroundImage = `url('${this.songs[this.currentIndex].image}')`;
        audio.src = this.songs[this.currentIndex].path;
    },
    nextSong() {
        this.currentIndex++;
        console.log(this.currentIndex);
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length;
        }
        this.loadCurrentSong();
    },
    playRandom() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * app.songs.length);
        }
        while (newIndex === this.currentIndex);

        this.currentIndex = newIndex;
        this.loadCurrentSong();

    },



    start() {


        this.handlEvents();
        this.loadCurrentSong();
        this.render();
    }

}


app.start();