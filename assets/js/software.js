let hash = location.hash;

if(hash){
	let entries = $(".entry").filter(function(){
		return hash.toLowerCase() === $(this).data("hash");
	});

	if(entries.length >= 1)
		window.scrollTo(0, entries.addClass("linked").offset().top - 100);
}

$(".entry .link").click(function(){
	let entry = $(this).closest(".entry");
	let link = location.href.split("#")[0] + entry.data("hash");

	entry.attr("data-clipboard-text", link);

	let clip = new Clipboard("#" + entry.attr("id"));

	clip.on("success", function(e){
		entry.find("span.copied").addClass("visible");
		entry.removeAttr("data-clipboard-text");
	console.log("success")
	});
	clip.on("error", function(e){
		prompt("Press Ctrl+C to copy", link);
	console.log("err")
	});
	console.log(entry.attr("id"))
});

$(".entry .copied").on("animationend", function(){
	$(this).removeClass("visible");
});
