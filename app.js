

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
      $('.footable').footable();
    }, 300);
  });
  
  $(".explanation").on("click", function () {
    alert ($(this).attr("title"));
  });
});