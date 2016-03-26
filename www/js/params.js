
var param_specs = {
    shooter_pitch: {
        defaultVal: 1,
        type: "double"
    },
    rotate_proportional: {
        defaultVal: 0.03,
        type: "double"
    },
    rotate_derivative: {
        defaultVal: 0.00,
        type: "double"
    },
    rotate_integral: {
        defaultVal: 0.00,
        type: "double"
    },
	raise_proportional: {
        defaultVal: 0.03,
        type: "double"
    },
    raise_derivative: {
        defaultVal: 0.00,
        type: "double"
    },
    raise_integral: {
        defaultVal: 0.00,
        type: "double"
    },
    arm_pitch_down_speed: {
        defaultVal: 0.25,
        type: "double"
    },
    arm_pitch_up_speed: {
        defaultVal: 0.25,
        type: "double"
    },
    arm_roller_out_speed: { 
        defaultVal: 0.25,
        type: "double"
    },
    arm_roller_in_speed: {
        defaultVal: 0.25,
        type: "double"
    },
    desired_heading: {
        defaultVal: 0.0,
        type: "double"
    },
    rotate_velocity: {
        defaultVal: 0.0,
        type: "double"
    },
    rotate_mode: {
        defaultVal: "simple",
        type: "string"
    }
};

var param_vals = {};
var param_waiting = {};
var param_update = {};
var param_timeouts = {};

var param_input_debounce = 900;

$(function() {
    NetworkTables.addGlobalListener(onValueChanged_params, true);
    setupInputs();
});

function setupInputs() {
    for(var propName in param_specs) {
        setupInput(propName);
    }
}

function setupInput(propName) {
    param_vals[propName] = param_specs[propName].defaultVal;
    param_waiting[propName] = false;
    param_update[propName] = function() {
        NetworkTables.putValue(
                "/SmartDashboard/" + propName, 
                param_vals[propName]);
        param_waiting[propName] = false;
    };
    $("#" + propName).on("input", function() {
        var value = $("#" + propName).val();
        var resetTimeout = function() {
            clearTimeout(param_timeouts[propName]);
            param_waiting[propName] = true;
            param_timeouts[propName] = setTimeout(
                    param_update[propName], param_input_debounce);
        };
        if(param_specs[propName].type === "double") {
            var fval = parseFloat(value);
            if(!isNaN(fval)) {
                param_vals[propName] = parseFloat(value);
                resetTimeout();
            }
        }
        if(param_specs[propName].type === "string") {
            param_vals[propName] = (value);
            resetTimeout();
        }
    });
}

function onValueChanged_params(key, value, isNew) {
    for(var propName in param_specs) {
        if(key === '/SmartDashboard/' + propName) {
            var elt = $("#" + propName);
            var pre_next_td = function(_elt) {
                return _elt.parents("td:first");
            };
            var next_td = function(_elt) {
                return pre_next_td(_elt).next("td");
            };
            if (next_td(elt).length == 0) {
                $("<td>").insertAfter(pre_next_td(elt));
            }
            next_td(elt).text(value);
        }
    }
}
