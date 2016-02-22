$(function(){
	 NetworkTables.addGlobalListener(onValueChanged_joystick, true);
});

function onValueChanged_joystick(key,value,isNew)
{
	if(key==="/SmartDashboard/left_1_pressed"){
		if (value){
			$("#left_1_label").addClass("btn-press");
		}else{
			$("#left_1_label").removeClass("btn-press");
		}
	}

	if(key==="/SmartDashboard/left_2_pressed"){
		if (value){
			$("#left_2_label").addClass("btn-press");
		}else{
			$("#left_2_label").removeClass("btn-press");
		}
	}

	if(key==="/SmartDashboard/left_3_pressed"){
		if (value){
			$("#left_3_label").addClass("btn-press");
		}else{
			$("#left_3_label").removeClass("btn-press");
		}
	}

	if(key==="/SmartDashboard/left_4_pressed"){
		if (value){
			$("#left_4_label").addClass("btn-press");
		}else{
			$("#left_4_label").removeClass("btn-press");
		}
	}

	if(key==="/SmartDashboard/left_5_pressed"){
		if (value){
			$("#left_5_label").addClass("btn-press");
		}else{
			$("#left_5_label").removeClass("btn-press");
		}
	}

	if(key==="/SmartDashboard/left_6_pressed"){
		if (value){
			$("#left_6_label").addClass("btn-press");
		}else{
			$("#left_6_label").removeClass("btn-press");
		}
	}

	if(key==="/SmartDashboard/left_7_pressed"){
		if (value){
			$("#left_7_label").addClass("btn-press");
		}else{
			$("#left_7_label").removeClass("btn-press");
		}
	}

	if(key==="/SmartDashboard/left_8_pressed"){
		if (value){
			$("#left_8_label").addClass("btn-press");
		}else{
			$("#left_8_label").removeClass("btn-press");
		}
	}
	if(key==="/SmartDashboard/left_9_pressed"){
		if (value){
			$("#left_9_label").addClass("btn-press");
		}else{
			$("#left_9_label").removeClass("btn-press");
		}
	}

	if(key==="/SmartDashboard/left_10_pressed"){
		if (value){
			$("#left_10_label").addClass("btn-press");
		}else{
			$("#left_10_label").removeClass("btn-press");
		}
	}

	if(key==="/SmartDashboard/left_11_pressed"){
		if (value){
			$("#left_11_label").addClass("btn-press");
		}else{
			$("#left_11_label").removeClass("btn-press");
		}
	}

	if(key==="/SmartDashboard/right_1_pressed"){
		if (value){
			$("#right_1_label").addClass("btn-press");
		}else{
			$("#right_1_label").removeClass("btn-press");
		}
	}

	if(key==="/SmartDashboard/right_2_pressed"){
		if (value){
			$("#right_2_label").addClass("btn-press");
		}else{
			$("#right_2_label").removeClass("btn-press");
		}
	}

	if(key==="/SmartDashboard/right_3_pressed"){
		if (value){
			$("#right_3_label").addClass("btn-press");
		}else{
			$("#right_3_label").removeClass("btn-press");
		}
	}

	if(key==="/SmartDashboard/right_4_pressed"){
		if (value){
			$("#right_4_label").addClass("btn-press");
		}else{
			$("#right_4_label").removeClass("btn-press");
		}
	}

	if(key==="/SmartDashboard/right_5_pressed"){
		if (value){
			$("#right_5_label").addClass("btn-press");
		}else{
			$("#right_5_label").removeClass("btn-press");
		}
	}

	if(key==="/SmartDashboard/right_6_pressed"){
		if (value){
			$("#right_6_label").addClass("btn-press");
		}else{
			$("#right_6_label").removeClass("btn-press");
		}
	}

	if(key==="/SmartDashboard/right_7_pressed"){
		if (value){
			$("#right_7_label").addClass("btn-press");
		}else{
			$("#right_7_label").removeClass("btn-press");
		}
	}

	if(key==="/SmartDashboard/right_8_pressed"){
		if (value){
			$("#right_8_label").addClass("btn-press");
		}else{
			$("#right_8_label").removeClass("btn-press");
		}
	}
	if(key==="/SmartDashboard/right_9_pressed"){
		if (value){
			$("#right_9_label").addClass("btn-press");
		}else{
			$("#right_9_label").removeClass("btn-press");
		}
	}

	if(key==="/SmartDashboard/right_10_pressed"){
		if (value){
			$("#right_10_label").addClass("btn-press");
		}else{
			$("#right_10_label").removeClass("btn-press");
		}
	}

	if(key==="/SmartDashboard/right_11_pressed"){
		if (value){
			$("#right_11_label").addClass("btn-press");
		}else{
			$("#right_11_label").removeClass("btn-press");
		}
	}

        for(var i = 1; i <= 11; i++) {
            if(key === "/SmartDashboard/right_" + i) {
                $("#right_" + i).text(value);
            }
            if(key === "/SmartDashboard/left_" + i) {
                $("#left_" + i).text(value);
            }
        }
}
