const $ = require("jquery");

export class SongsService {
    constructor(url) {
        this.url = url;
    }

    list(successCallback, errorCallback) {
        $.ajax({
            url: this.url,
            success: successCallback,
            error: errorCallback
        });
    }

    save(song, successCallback, errorCallback) {
        if (song.id) {
            this.update(song, successCallback, errorCallback);
        } else {
            this.create(song, successCallback, errorCallback);
        }
    }

    create(song, successCallback, errorCallback) {
        $.ajax({
            url: this.url,
            method: "post",
            data: song,
            success: successCallback,
            error: errorCallback
        });
    }

    getDetail(songId, successCallback, errorCallback) { 
        $.ajax({
            url: `${this.url}${songId}`,  // songs/5
            success: successCallback,
            error: errorCallback
        });
    }

    update(song, successCallback, errorCallback) {
        $.ajax({
            url: `${this.url}${song.id}`,  // songs/5
            method: "put",
            data: song,
            success: successCallback,
            error: errorCallback
        });
    }

    delete(songId, successCallback, errorCallback) { 
        $.ajax({
            url: `${this.url}${songId}`,  // songs/5
            method: "delete",
            success: successCallback,
            error: errorCallback
        }); 
    }
}