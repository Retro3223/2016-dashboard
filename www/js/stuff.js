$(function() {
    NetworkTables.addGlobalListener(inputsListener, true);
	$("#tabs a").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

function inputsListener(key, value, isNew){
	switch(key){
		case "/SmartDashboard/left_3":
				$("#inputs #left_3").text(value);
			break;
	}
}
