;(function($){
  
  var mw = {};
  
  $(document).ready(function(){
    
    if($('body').hasClass('moonwalk')) {
      setup();
      arrange();
    };
    
  });
  
  var getScale = function() {
  /* What we're doing here is pushing the scrollbar handle to the furthest extent
    and then checking how far it actually was pushed down, which should tell us
    how big exactly the scrollbar handle is, and thus what percentage of the 
    page a user is able to see at any given time. */
       
    $(window).scrollTop(100000);
    mw.scroll_handle_extent = $(window).scrollTop();
    mw.scroll_handle_percent = (mw.col_h_tallest - mw.scroll_handle_extent) / mw.col_h_tallest;
    $(window).scrollTop(0);
  };
  
  var build = function() {
    
  };
  
  var arrange = function() {
    mw.col_h_tallest = 0;
    mw.col_w_total = 0;
    
    $('.mw-column').each(function(){
      
      /* If the width of the column equals the width of the
      document, then it is assumed to have no width specifically
      implemented, and is assumed to be "auto." Width is then
      set to a percentage of the document width based on the 
      number of columns present. */
      
      if(parseInt($(this).css('width')) == mw.doc_w) {
        $(this).css('width', mw.doc_w / mw.col_c);
      }
      
      $(this).css({
        'position': 'absolute',
        'top': 0,
        'left': mw.col_w_total,
        'height': mw.win_h
      });
      
      /* Updating the total width of all iterated columns... */
      
      mw.col_w_total += $(this).outerWidth();
      
      /* Finding the tallest column, based on the height of its liner... */
      
      if($('.liner', this).outerHeight() > mw.col_h_tallest) mw.col_h_tallest = $('.liner', this).outerHeight();
    });
    
    /* We need to find out what percentage of the height of the page
    is represented by the size of the scrollbar handle. */
    
    getScale();
    
    /* We don't want the liners moving with the page as it 
    scrolls... let's position-fix them! */
    
    $('.moonwalk>.liner').css({
      // 'width': (mw.col_w_total > mw.win_w) ? mw.col_w_total : mw.win_w,
      'width': '100%',
      'height': mw.win_h,
      'overflow': 'visible',
      'position': 'fixed',
      'top': 0,
      'left': 0
    });
    
    tentpole();
    
    $(this).css({
      'height': mw.win_h,
      'overflow': 'hidden'
    })
  };
  
  var tentpole = function() {
    /* The tentpole is what makes the browser-supplied scrollbar 
    actually look like it's controlling any of this behavior. I 
    suppose if you didn't care about this feeling like a natural
    thing and preferred using a custom scrollbar instead a lot of
    this would be much simpler to implement. But that's cheating. ;) */
    
    $('.tentpole').css({
      'height': mw.col_h_tallest,
      'width': mw.col_w_total
    });
  };
  
  $(window).scroll(function(){
    
    /* "Scroll" the entire page left-right if the content extends beyond the window... */
    $('.moonwalk>.liner').css('left', 0 - parseInt($(window).scrollLeft()));
    
    /* "Scroll" each column by shifting its liner up and down... */
    $('.mw-column>.liner').each(function(){
      var h = $(this).outerHeight();
      if(h > mw.win_h) $(this).css('top', 0 - ((h * ($(window).scrollTop() / mw.scroll_handle_extent)) - (mw.win_h * ($(window).scrollTop() / mw.scroll_handle_extent))));
    });
  });
  
  var setup = function() {
    
    /* Set up the mw object so we can use it later */
    mw.containerSelector = 'body';
    mw.container = $(mw.containerSelector);
    mw.colSelector = 'mw-column';
    mw.container.wrapInner('<div class="liner" />');
    mw.container.prepend('<div class="tentpole" />');
    mw.win_w = $(window).width();
    mw.doc_w = $(document).width();
    mw.win_h = $(window).height();
    mw.doc_h = $(document).height();
    mw.col_c = $('.mw-column').length;
    
    /* Wrap each column's contents in a wrapper. */
    $('.mw-column').each(function(){
      var liner = $('<div class="liner" />').css({
        'position': 'fixed'
      });
      $(this).wrapInner(liner);
    });
    
    /* Do some initial CSS setup */
    $('.moonwalk').css({
      'padding': 0,
      'margin': 0,
      'overflow-x': 'scroll'
    });

    $('.moonwalk .liner').css({
      'position': 'relative'
    });

    $('.mw-column, .mw-column *').css({
      'margin': 0,
      'padding': 0
    });

    $('.mw-column').css({
      'float': 'left'
    });
  };
  
})(jQuery);