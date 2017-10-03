$(window).ready(function(){
    $("#suggest").submit(function(){
        let link =
            "https://twitter.com/intent/tweet?text="
            + "@LEGOlord208! I have "
            + $("#suggest-type").find(":checked").data("label")
            + " the TIR "
            + $("#suggest-regarding").val() + ": ";
        location.href = link;

        return false;
    });
    $("#download-form").submit(function(){
        location.href = $(this).find("select :checked").data("link");
        return false;
    }).find("select").change(function(){
        let me = $(this);
        let p = $("#virusWarning32");
        p.toggle(me.find(":checked").text() === "Windows (x32)");
    });
    $("#about-toggle").click(function(){
        let about = $("#about").show();
        setTimeout(function(){
            about.toggleClass("visible");
        }, 100);
    });
    $("#about").on("transitionend", function(){
        let me = $(this);
        if(!me.is(".visible"))
            $(this).hide();
    });
});

$.getJSON("/files/tir-titles.json", function(titles){
    document.title = "TIR - " + titles[Math.floor(Math.random() * titles.length)];
});
