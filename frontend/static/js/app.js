(function() {
  var arrange, build, getScale, mw, setup, tentpole;

  mw = {};

  $(document).ready(function() {
    if ($("body").hasClass("moonwalk")) {
      setup();
      arrange();
    }
  });

  getScale = function() {
    $(window).scrollTop(100000);
    mw.scroll_handle_extent = $(window).scrollTop();
    mw.scroll_handle_percent = (mw.col_h_tallest - mw.scroll_handle_extent) / mw.col_h_tallest;
    $(window).scrollTop(0);
  };

  build = function() {};

  arrange = function() {
    mw.col_h_tallest = 0;
    mw.col_w_total = 0;
    $(".mw-column").each(function() {
      if (parseInt($(this).css("width")) === mw.doc_w) {
        $(this).css("width", mw.doc_w / mw.col_c);
      }
      $(this).css({
        position: "absolute",
        top: 0,
        left: mw.col_w_total,
        height: mw.win_h
      });
      mw.col_w_total += $(this).outerWidth();
      if ($(".liner", this).outerHeight() > mw.col_h_tallest) {
        mw.col_h_tallest = $(".liner", this).outerHeight();
      }
    });
    getScale();
    $(".moonwalk>.liner").css({
      width: "100%",
      height: mw.win_h,
      overflow: "visible",
      position: "fixed",
      top: 0,
      left: 0
    });
    tentpole();
    $(this).css({
      height: mw.win_h,
      overflow: "hidden"
    });
  };

  tentpole = function() {
    $(".tentpole").css({
      height: mw.col_h_tallest,
      width: mw.col_w_total
    });
  };

  $(window).scroll(function() {
    $(".moonwalk>.liner").css("left", 0 - parseInt($(window).scrollLeft()));
    $(".mw-column>.liner").each(function() {
      var h;
      h = $(this).outerHeight();
      if (h > mw.win_h) {
        $(this).css("top", 0 - ((h * ($(window).scrollTop() / mw.scroll_handle_extent)) - (mw.win_h * ($(window).scrollTop() / mw.scroll_handle_extent))));
      }
    });
  });

  setup = function() {
    mw.containerSelector = "body";
    mw.container = $(mw.containerSelector);
    mw.colSelector = "mw-column";
    mw.container.wrapInner("<div class=\"liner\" />");
    mw.container.prepend("<div class=\"tentpole\" />");
    mw.win_w = $(window).width();
    mw.doc_w = $(document).width();
    mw.win_h = $(window).height();
    mw.doc_h = $(document).height();
    mw.col_c = $(".mw-column").length;
    $(".mw-column").each(function() {
      var liner;
      liner = $("<div class=\"liner\" />").css({
        position: "fixed"
      });
      $(this).wrapInner(liner);
    });
    $(".moonwalk").css({
      padding: 0,
      margin: 0,
      "overflow-x": "scroll"
    });
    $(".moonwalk .liner").css({
      position: "relative"
    });
    $(".mw-column, .mw-column *").css({
      margin: 0,
      padding: 0
    });
    $(".mw-column").css({
      float: "left"
    });
  };

  return;

}).call(this);
