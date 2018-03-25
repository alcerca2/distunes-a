window.$ = window.jQuery = require("jquery");

// Plantilla 1 --------------------------------------------

import { SongsService } from "./SongsService";
import { SongsListManager } from "./SongsListManager";
import { SongFormManager } from "./SongFormManager";
import Pubsub from "pubsub-js";

const songsService = new SongsService("/songs/");
const songsListManager = new SongsListManager(".songs-list", songsService, Pubsub);
songsListManager.init();

const songFormManager = new SongFormManager(".song-form", songsService, Pubsub);
songFormManager.init();

// Plantilla 2 --------------------------------------------

import { CoverManager } from "./CoverManager";
import { FooterManager } from "./FooterManager";

const coverManager = new CoverManager("#title-img-animated");
coverManager.init();

const footerManager = new FooterManager(".web-footer", "#title-img-animated");
footerManager.init();

// Plantilla 3 --------------------------------------------

let contador = 0;
$("div.fisic").on("click", function() {
    if (contador == 0) {
        $(this).css('color', 'blue');
        contador = 1;
    } else {
        $(this).css('color', 'red');
        contador = 0;
    }
});






// $("header").on("click", function () {
//     $(".web-header").css("background", "red");
// });

// $(".web-title").text("Hola");

// $("button").attr("id", "boton");

//$(".web-header").css("background", "red");

// $(".web-header").addClass("cabecera");

// $(".songs-list").removeClass("ideal").addClass("loading");


