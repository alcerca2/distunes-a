const $ = require("jquery");

import { UIManager } from "./UIManager";

export class SongFormManager extends UIManager {

    constructor(elementSelector, songsService, pubsub) {
        super(elementSelector);
        this.songsService = songsService;

        this.pubsub = pubsub;
    }

    init() {
       this.setupSubmitEventHandler(); 
    }

    setupSubmitEventHandler() {
        this.element.on("submit", () => {
            // Validar los datos y enviarlos
            this.validateAndSendData();

            return false;
        });

    }

    validateAndSendData() {
        if (this.isValid()) {
            // Envía los datos
            this.send();
        }
    }
    
    isValid() {
        const inputs = this.element.find("input");
        for (let input of inputs){
            if (input.checkValidity() == false) {
                const errorMessage = input.validationMessage;
                input.focus();

                this.setErrorHtml(errorMessage);
                this.setError();

                return false;
            }
        }

        this.setIdeal();

        return true;
    }

    enableFormControls() {
        this.element.find("input, button").attr("disabled", false);
    }

    disableFormControls() {
        this.element.find("input, button").attr("disabled", true); 
    }

    setError() {
        super.setError();
        this.enableFormControls();
    }

    setLoading() {
        super.setLoading();
        this.disableFormControls();
    }

    setIdeal() {
        super.setIdeal();
        this.enableFormControls();
    }

    resetForm() {
        this.element[0].reset();
    }
    
    send() {

        this.setLoading();

        const song = {
            artist: this.element.find("#artist").val(),
            title: this.element.find("#title").val(),
            cover_url: this.element.find("#cover_url").val()
        }

        this.songsService.save(song, success => {

            this.pubsub.publish("new-song", song);

            console.log("Canción guardada");

            this.resetForm();
            this.setIdeal();

        }, error => {

            this.setErrorHtml("Se ha producido un error al guardar la canción en el servidor");

        });
    }
}

