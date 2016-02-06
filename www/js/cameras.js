function Camera(i) {
    this.paused = false;
    this.port = 5800 + i;
    this.url = "http://roborio-3223-frc:" + this.port + "/?action=snapshot";
    this.eltId = "webcam" + i;
    this.imageNr = 0;
    this.finished = [];
    this.elt = $("#" + this.eltId);
    this.elt.html("<noscript><img src='" + this.url + "'/></noscript>");
}

Camera.prototype.createImageLayer = function() {
    var that = this;
    var img = new Image();
    img.style.position = "absolute";
    img.style.zIndex = -1;
    img.onload = function() {
        that.imageOnload(this);
    };
    img.onclick = function() {
        that.imageOnclick(this);
    };
    img.src = this.url + "&n=" + (++this.imageNr);
    var webcam = document.getElementById(this.eltId);
    webcam.insertBefore(img, webcam.firstChild);
};

Camera.prototype.imageOnload = function(img) {
    img.style.zIndex = this.imageNr;
    while (1 < this.finished.length) {
        var del = this.finished.shift();
        del.parentNode.removeChild(del);
    }
    this.finished.push(img);
    if(!this.paused) {
        this.createImageLayer();
    }
};

Camera.prototype.imageOnclick = function() {
    this.paused = !this.paused;
    if(!this.paused) this.createImageLayer();
}

