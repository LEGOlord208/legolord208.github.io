$("#dark-mode").click(function() {
	$(this).text($(this).text() == "Trololol" ? "Toggle dark mode" : "Trololol");
	$("#light, #dark").toggle();
});
