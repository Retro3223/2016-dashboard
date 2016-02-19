
function CameraFrame(obj) {
    this.selector = obj.selector;
    this.noSignal = obj.noSignal;
    this.lastLoaded = 0;
    this.state = "no-signal"
    this.camera = null;
    var that = this;

    $(function() {
        that.hideStream();
        that.getSignalImg().on("load", function() {
            that.lastLoaded = Date.now();
            that.state = "signal";
            that.showStream();
        });
        setInterval(function() {
            var now = Date.now();
            if (that.state === "signal" && (now - that.lastLoaded) >= 5000) {
                that.state = "no-signal";
                that.hideStream();
            }
            if (that.state === "no-signal" && 
                    (now - that.lastLoaded) >= 10000) {
                // todo: think of a way to reconnect

            }
        }, 1000);
    });
}

CameraFrame.prototype.getSignalImg = function() {
    return $(this.selector + " .signal");
};

CameraFrame.prototype.getNoSignalImg = function() {
    return $(this.selector + " .no-signal");
};

CameraFrame.prototype.showStream = function() {
    this.getSignalImg().show();
    this.getNoSignalImg().hide();
}

CameraFrame.prototype.hideStream = function() {
    this.getSignalImg().hide();
    this.getNoSignalImg().show();
}

CameraFrame.prototype.setCamera = function(camera) {
    this.camera = camera;
    this.getSignalImg().attr("src", this.camera.stream);
}

var frameL = new CameraFrame({
    selector: "#webcam0_stream",
    noSignal: "/img/indianfront.png"
});

var frameR = new CameraFrame({
    selector: "#webcam1_stream",
    noSignal: "/img/indianback.png",
});

var frontCamera = {
    stream: "http://roborio-3223-frc:5800/?action=stream",
};

var altCamera = {
    stream: "http://roborio-3223-frc:5801/?action=stream",
};

var structureCamera = {
    stream: "http://localhost:8080/cam.mjpg",
};

var nullCamera = {
    stream: "/img/indianfront.png"
};

$(function() {
    frameL.setCamera(frontCamera);
    frameR.setCamera(altCamera);

   $("#rightFrameCamera").change(function(){
   	var value = $("#rightFrameCamera").val();
   	if (value == "front") {
            frameR.setCamera(frontCamera);
   	} else if (value == "back") {
            frameR.setCamera(altCamera);
   	} else if (value == "structure") {
            frameR.setCamera(structureCamera);
   	}else if(value == "none") {
            frameR.setCamera(nullCamera);
        }
   });
   
   $("#leftFrameCamera").change(function(){
   	var value = $("#leftFrameCamera").val();
   	if (value == "front") {
            frameL.setCamera(frontCamera);
   	} else if (value == "back") {
            frameL.setCamera(altCamera);
   	} else if (value == "structure") {
            frameL.setCamera(structureCamera);  	
        } else if (value == "none") {
            frameL.setCamera(nullCamera);
   	}
   });
});













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

