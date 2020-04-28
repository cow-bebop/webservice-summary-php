$(function() {
  $("#nav-toggle").on("click", function() {
    $("body").toggleClass("js-open");
  });

  $(".js-list__item-ank").on("click", function() {
    $("body").removeClass("js-open");
  });
});

$(function() {
  $('a[href^="#"]').click(function() {
    var headerHight = $(".header").height(); //ヘッダの高さ
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? "html" : href);
    var position = target.offset().top - headerHight; //ヘッダの高さ分位置をずらす
    $("html, body").animate({ scrollTop: position }, 550, "swing");
    return false;
  });
});
