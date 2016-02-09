
var param_vals = {
    arm_pitch_down_speed: 0.25,
    arm_pitch_up_speed: 0.25,
    arm_roller_out_speed: 0.25,
    arm_roller_in_speed: 0.25
};

var param_waiting = {};
var param_update = {};
var param_timeouts = {};

var param_input_debounce = 900;

$(function() {
    NetworkTables.addGlobalListener(onValueChanged_params, true);
    setupInputs();
});

function setupInputs() {
    for(var propName in param_vals) {
        setupInput(propName);
    }
}

function setupInput(propName) {
    param_waiting[propName] = false;
    param_update[propName] = function() {
        NetworkTables.putValue(
                "/SmartDashboard/" + propName, 
                param_vals[propName]);
        param_waiting[propName] = false;
    };
    $("#" + propName).on("input", function() {
        var value = $("#" + propName).val();
        param_vals[propName] = parseFloat(value);
        clearTimeout(param_timeouts[propName]);
        param_waiting[propName] = true;
        param_timeouts[propName] = setTimeout(
                param_update[propName], param_input_debounce);
    });
}

function onValueChanged_params(key, value, isNew) {
    for(var propName in param_vals) {
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
