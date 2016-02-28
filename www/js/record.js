
var inRecordPrepState = false;
var recording = false;
var startTime = null;

$(function() {
    NetworkTables.addGlobalListener(recordListener, true);
    $("#recordingWarning").hide();
    $("#BeginRecordBtn").prop("disabled",'disabled');
    $("#RecordPrepBtn").click(function() {
        inRecordPrepState = !inRecordPrepState;
        if(inRecordPrepState) {
            $("#RecordPrepBtn").text("Exit Record Mode");
            enableRecordButton();
            $("#recordingWarning").show();
            NetworkTables.putValue("/SmartDashboard/recordMode", true);
        }else{
            $("#RecordPrepBtn").text("Enter Record Mode");
            $("#recordingWarning").hide();
            $("#BeginRecordBtn").prop("disabled",'disabled');
            NetworkTables.putValue("/SmartDashboard/recordMode", false);
        }
    });
    $("#BeginRecordBtn").click(function() {
        recording = !recording;
        if(recording) {
            var val = $("#RecordNameTxt").val();
            NetworkTables.putValue("/SmartDashboard/recordName", val);
            NetworkTables.putValue("/SmartDashboard/recording", true);
            console.info("recording!");
            startTime = new Date();
            $("#BeginRecordBtn").text("Stop Recording");
        }else{
            console.info("not recording!");
            stopRecording();
        }
    });

    $("#RecordNameTxt").keyup(function() {
        enableRecordButton();
    });

    setInterval(updateClock, 200);
});

function stopRecording() {
    $("#BeginRecordBtn").text("Start Recording");
}

function updateClock() {
    if(recording) {
        var offset = moment.duration(moment().diff(startTime));
        var minutes = offset.get('minutes')+"";
        var seconds = offset.get("seconds")+"";
        if(seconds.length == 1) {
            seconds = "0" + seconds;
        }
        $("#RecordClock").text(minutes + ":" + seconds);
    }
}

function enableRecordButton() {
    var val = $("#RecordNameTxt").val();
    if(val.trim() !== '') {
        $("#BeginRecordBtn").prop("disabled",'');
    }else{
        $("#BeginRecordBtn").prop("disabled",'disabled');
    }
}

function recordListener(key, value, isNew) {
    if(key === "/SmartDashboard/recordMode") {
        if(value == false && recording) {
            stopRecording();
        }
        if(value == true && !recording) {
            NetworkTables.putValue("/SmartDashboard/recordMode", false);
        }
    }
}
