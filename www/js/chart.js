var chart;
var chartVariable = "";
var data = ['y'];
var dataChanged = false;
var maxSize = 1000 / 20 * 10;
var isCharting = false;

var chartVariables = {
    angle: {
        name: "/SmartDashboard/angle",
        label: "NavX angle",
        unit: "degrees"
    },
    yaw: {
        name: "/SmartDashboard/yaw",
        label: "NavX yaw",
        unit: "degrees"
    },
    roll: {
        name: "/SmartDashboard/roll",
        label: "NavX roll",
        unit: "degrees"
    },
    pitch: {
        name: "/SmartDashboard/pitch",
        label: "NavX pitch",
        unit: "degrees"
    },
    accel_x: {
        name: "/SmartDashboard/accel_x",
        label: "NavX Acceleration X",
        unit: "??"
    },
    accel_y: {
        name: "/SmartDashboard/accel_y",
        label: "NavX Acceleration Y",
        unit: "??"
    },
    accel_z: {
        name: "/SmartDashboard/accel_z",
        label: "NavX Acceleration Z",
        unit: "??"
    },
    velocity_x: {
        name: "/SmartDashboard/velocity_x",
        label: "NavX Velocity X",
        unit: "??"
    },
    velocity_y: {
        name: "/SmartDashboard/velocity_y",
        label: "NavX Velocity Y",
        unit: "??"
    },
    velocity_z: {
        name: "/SmartDashboard/velocity_z",
        label: "NavX Velocity Z",
        unit: "??"
    },
    pos_x: {
        name: "/SmartDashboard/pos_x",
        label: "NavX Displacement X",
        unit: "??"
    },
    pos_y: {
        name: "/SmartDashboard/pos_y",
        label: "NavX Displacement Y",
        unit: "??"
    },
    pos_z: {
        name: "/SmartDashboard/pos_z",
        label: "NavX Displacement Z",
        unit: "??"
    },
    fused_heading: {
        name: "/SmartDashboard/fused_heading",
        label: "NavX Fused Heading",
        unit: "??"
    },
    raw_shooter_angle: {
        name: "/SmartDashboard/raw_shooter_angle",
        label: "Shooter angle (raw)",
        unit: "degrees"
    },
    shooter_pitch: {
        name: "/SmartDashboard/shooter_pitch",
        label: "Shooter angle (compensated)",
        unit: "degrees"
    }
};

$(function() {
    setupChart();
    NetworkTables.addGlobalListener(chartOnValueChanged, true);
    $("#ChartSelect").change(function() {
        var newChartVariable = $("#ChartSelect").val();
        if(newChartVariable != "") {
            chartVariable = newChartVariable;
            data = ['y'];
            isCharting = true;
        }else{
            data = ['y'];
            isCharting = false;
        }
        chartRefreshRaw()
    });
});

function setupChart() {
    chart = c3.generate({data:{columns:[data]}});
    setInterval(chartRefresh, 200);
    setInterval(function() {
        NetworkTables.putValue("/SmartDashboard/angle", Math.sin(new Date().getTime() / 100));
    }, 100);
}

function chartRefresh() {
    if(dataChanged && isCharting) {
        chartRefreshRaw();
        dataChanged = false;
    }
}

function chartRefreshRaw() {
    chart.load ({
        columns:[data]
    });
}

function chartOnValueChanged(key, value, isNew) {
    if (isCharting && 
            chartVariable in chartVariables && 
            key === chartVariables[chartVariable].name) {
        dataChanged = true;
        var c = data.shift();
        $("#ChartedValue").text(numeral(value).format('0.00'));
        data.unshift(value);
        data.unshift(c);
        if (data.length >= maxSize) {			
            data.pop();
        }
    }else
    {
    }
}
