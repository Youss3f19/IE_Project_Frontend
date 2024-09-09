//navbar change event

$(window).scroll(function () {
if ($(window).scrollTop()) {
$(".navbar").addClass("change");
$(".text-light").addClass("text-change");
} else {
$(".navbar").removeClass("change");
$(".text-light").removeClass("text-change");

}
});

//404 error
