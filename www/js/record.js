
var inRecordPrepState = false;
var recording = false;

$(function() {
    NetworkTables.addGlobalListener(recordListener, true);
    $("#recordingWarning").hide();
    //$("#BeginRecordBtn").prop("disabled",'disabled');
    /*
    $("#RecordPrepBtn").click(function() {
        inRecordPrepState = !inRecordPrepState;
        console.info("inRecordPrepState", inRecordPrepState);
        if(inRecordPrepState) {
            $("#RecordPrepBtn").text("Exit Record Mode");
            enableRecordButton();
            $("#recordingWarning").show();
            NetworkTables.putValue("/SmartDashboard/recordMode", true);
            console.info("/SmartDashboard/recordMode", true);
        }else{
            $("#RecordPrepBtn").text("Enter Record Mode");
            $("#recordingWarning").hide();
            $("#BeginRecordBtn").prop("disabled",'disabled');
            NetworkTables.putValue("/SmartDashboard/recordMode", false);
            console.info("/SmartDashboard/recordMode", false);
        }
    });
    */
    $("#BeginRecordBtn").click(function() {
        recording = !recording;
        console.info("recording", recording);
        if(recording) {
            console.info("recording!");
            $("#BeginRecordBtn").text("Stop Recording");
        }else{
            console.info("not recording!");
            stopRecording();
        }
    });

    /*
    $("#RecordNameTxt").keyup(function() {
        enableRecordButton();
    });
    */

    //setInterval(sendRecordName, 1000);
});

function sendRecordName() {
    if(inRecordPrepState) {
        var val = $("#RecordNameTxt").val();
        if(val != null && val.trim() != '') {
            NetworkTables.putValue("/SmartDashboard/recordName", val);
            console.info("/SmartDashboard/recordName", val);
        }
    }
    console.info("/SmartDashboard/recording", recording);
}

function stopRecording() {
    $("#BeginRecordBtn").text("Start Recording");
}

/*
function enableRecordButton() {
    var val = $("#RecordNameTxt").val();
    if(val.trim() !== '') {
        $("#BeginRecordBtn").prop("disabled",'');
    }else{
        $("#BeginRecordBtn").prop("disabled",'disabled');
    }
}
*/

function recordListener(key, value, isNew) {
    if(key === "/SmartDashboard/recordMode") {
        if(value == false && recording) {
            //console.info("stop recording!");
            //stopRecording();
        }
        if(value == true && !recording) {
            //console.info("hey we're not recording!");
            //NetworkTables.putValue("/SmartDashboard/recordMode", false);
        }
    }
    if(key === '/SmartDashboard/recordStatus') {
        $("#RecordClock").text(value);
    }
}
