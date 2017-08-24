$(document).ready(function(){
	let menu = $("#menu");
	let top = menu.offset().top;

	$(window).scroll(function(){
		menu.toggleClass("fixed", $(this).scrollTop() > top);
	});

	let imgzoom = $("#imgzoom");

	$("img").click(function(e){
		e.stopPropagation();

		let imgzoomimg = $("img", imgzoom);
		imgzoomimg.prop("src", $(this).prop("src"));
		imgzoom.addClass("visible");
	});

	$(this).click(function(){
		imgzoom.removeClass("visible");
	});

	if(document.cookie.indexOf("cookies=") < 0) {
		setTimeout(function(){
			$("#cookies, #dim").addClass("visible").trigger("visible");
		}, 5000);

		$("#cookies button").click(function(){
			$("#cookies, #dim").removeClass("visible");

			let d = new Date();
			d.setTime(d.getTime() + 1000 * 60 * 60 * 24 * 365 * 50);
			document.cookie = "cookies=on; expires=" + d.toUTCString() + "; path=/";
		});
	}

	$("#dim").on("transitionend", function(){
		let me = $(this);

		if(!me.is(".visible"))
			me.hide();
	}).on("visible", function(){
		let me = $(this);
		me.show();
	});
	console.log("%c¯\\_(ツ)_/¯", "color: green;font-size: 40px;");
});
