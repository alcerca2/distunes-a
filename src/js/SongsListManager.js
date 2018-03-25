// const $ = require("jquery");

import { UIManager } from "./UIManager";


export class SongsListManager extends UIManager {

    constructor(elementSelector, songsService, pubsub) {
        super(elementSelector);
        this.songsService = songsService;
        this.pubsub = pubsub;
    }

    init() {
        this.loadSongs();

        let self = this;

        console.log(this);
        this.element.on("click", ".delete", function()  {
            let songId = this.parentNode.dataset.id;
            console.log(this);
            self.deleteSong(songId);
        });

        this.element.on("click", ".cover", function() {
            location.href = "detail.html";
        });

        this.element.on('click', '.fav-count', function(){
            let song = this.parentNode
            self.likeSong(song);

        });

        this.pubsub.subscribe("new-song", (topic, song) => {
            this.loadSongs();
        });

        this.pubsub.subscribe("update-song", (topic, song) => {
            this.loadSongs();
        });
    }

    loadSongs() {
        this.songsService.list(songs => {

            if (songs.length == 0) {
                this.setEmpty();
            } else {
                this.renderSongs(songs);
                this.setIdeal();
            }
        }, error => {
            this.setError();
        });
    }

    renderSongs(songs) {
        
        let html = "";
        for (let song of songs) {
            html += this.renderSong(song);
        }
        this.setIdealHtml(html);
    }

    renderSong(song) {

        let likedClass = '';
        let isLiked = localStorage.getItem(song.id);

        if(isLiked == 'true'){
            likedClass = 'liked';
        }


        let cover_url = song.cover_url;

        if (cover_url === "") {
            cover_url = "img/disk.png";
        }

        return `<article class="song" data-id="${song.id}">
         <img class="cover" src="${cover_url}" alt="${song.artist}">
         <div class="artist">${song.artist}</div>
          <div class="title">${song.title}</div>
          <span class="delete">&#x2715;</span>
          <span class="fav-count ${likedClass}">&#x2665;</span>
          <span class="count">${song.likes_qty}</span>
          </article>`;
    }

    deleteSong(songId) {
        this.setLoading();

        localStorage[songId] = 'false';

        this.songsService.delete(songId, success => {
            this.loadSongs();
        }, error => {
            this.setError();
        });
    }

    likeSong(song) {
        console.log(song);
        let songId = song.dataset.id;
        this.songsService.getDetail(songId, (data) => {
            console.log(data);
            this.incrementSongLike(data);
        });

    }

    incrementSongLike(songData) {
        let newQty;
        let isLiked = false;

        if(localStorage.getItem(songData.id) === null 
        || localStorage.getItem(songData.id) === 'false') {
            newQty = parseInt(songData.likes_qty) + 1;
            isLiked = true;

        } else {
            newQty = parseInt(songData.likes_qty) - 1;
            isLiked = false;
        }

        songData.likes_qty = newQty;

        let song = songData;
        this.songsService.update(song, (data) => {
            
            this.updateWebStorage(data, isLiked);
            this.pubsub.publish("update-song", data);
        });
    }

    updateWebStorage(song, isLiked) {
        if(isLiked == true) {
            localStorage[song.id] = 'true';
        }else{
            localStorage[song.id] = 'false';
        }
    }
}