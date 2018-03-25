
const $ = require("jquery");

export class UIManager {
    constructor(selector) {
        this.uiState = "empty loading error partial ideal";
        this.element = $(selector);
    }

    setEmpty() {
        this.element.removeClass(this.uiState).addClass("empty");
    }

    setLoading() {
        this.element.removeClass(this.uiState).addClass("loading");
    }

    setError() {
        this.element.removeClass(this.uiState).addClass("error");
    }

    setPartial() {
        this.element.removeClass(this.uiState).addClass("partial");
    }

    setIdeal() {
        this.element.removeClass(this.uiState).addClass("ideal");
    }

    setEmptyHtml(html) {
        this.element.find(".ui-status.empty").html(html);
    }

    setLoadingHtml(html) {
        this.element.find(".ui-status.loading").html(html);
    }

    setErrorHtml(html) {
        this.element.find(".ui-status.error").html(html);
    }

    setPartialHtml(html) {
        this.element.find(".ui-status.partial").html(html);
    }

    setIdealHtml(html) {
        this.element.find(".ui-status.ideal").html(html);
    }

}