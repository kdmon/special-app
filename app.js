/* jQuery extension to footable for sticky headers*/
(function($) {
  $.fn.stickyHeader = function() {
    return this.each(function() {
      var originalTable = $(this);
      var originalHeader = $(this).find("thead tr");
      var fixedHeader;
      var timer;

      function makeHeader() {
        clearTimeout(timer);
          var offset = $(window).scrollTop(),
            tableOffsetTop = originalTable.offset().top;
          tableOffsetBottom = tableOffsetTop + originalTable.height() - originalHeader.height();
          // outside range, remove the fixed header
          if (offset < tableOffsetTop || offset > tableOffsetBottom) {
            if ($(".footable-fixed").length > 0) {
              console.log("hiding header");
              $(".footable-fixed").remove();
            }
          }
          // otherwise recreate header
          else {
            timer = setTimeout(function() {
              console.log("recreating header");
              if (fixedHeader) fixedHeader.remove();
              fixedHeader = originalHeader.clone(1);
              fixedHeader.addClass("footable-fixed").insertBefore(originalHeader);
              fixedHeader.find("th").each(function(index) {
              $(this).css("width", originalHeader.find("th").eq(index).width() + "px");
            });
          }, 50);
        }
      }
      $(window).resize(makeHeader);
      $(window).scroll(makeHeader);
      makeHeader();
    });
  };
})(jQuery);

/* Main app */

$(function() {
  
  /* IE polyfill */
  if (typeof console === "undefined") {
    console = {};
    console.log = function() {
      return;
    };
  }
  
  /* jQuery Mobile panel setup */
  
  $("body>[data-role='panel']").panel().trigger('create');
  
  /* Event handlers */
  
  $(document).on("pageinit", "#indications", function() {
    setTimeout(function() {
      $('.footable').footable({
        toggleHTMLElement: '<span style="margin: 1em; float:left;"><i class="fa fa-plus-square-o fa-3x footable-toggle footable-expand"></i> <i class="fa fa-minus-square-o fa-3x footable-toggle footable-contract"></i></span>',
        toggleSelector: " > tbody > tr > td > span.footable-toggle"
      });
    }, 300);
  });
  
  $(".explanation").on("click", function () {
    alert ($(this).attr("title"));
  });
});