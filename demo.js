$(function() {
  var $timer1 = $('.timer1'),
      $timer2 = $('.timer2'),
      $timer3 = $('.timer3');

  // Define the behavior of timer1
  $timer1.hover(function(){ $(this).trigger('reset') });

  $timer1.on('step', function(evt, val){
    $(this).html(val)
  });

  // Set up the stepper and start it
  $timer1.stepper(850).trigger('beat');


  // Define the behavior of timer2
  $timer2.hover(
    function(evt){ $(this).trigger('pause')  },
    function(evt){ $(this).trigger('resume') }
  );

  $timer2.on('step', function(evt, val){
    $(this).html(val)
  });

  // Set up the stepper and start it
  $timer2.stepper(500).trigger('beat');


  // Define the behavior of timer3
  $timer3.on('step', function(evt, val){
    $(this).html(val)
  });

  $timer3.on('reset', function(){
    $(this).css('color', randomColor());
  })

  // Set up the looper and start it
  $timer3.looper(100, 5).trigger('beat');

  $timer3.trigger('set:increment', 0.25);

  // Set up some global event tracking
  $('body').on('beat', function(evt){
    $('.log').html(function(id, old){
      return old + "\n" + "beat: " + evt.target.className;
    });
  });

  $('body').on('reset', function(evt){
    $('.log').html(function(id, old){
      return old + "\n" + "reset: " + evt.target.className;
    })
  });

  $('body').on('pause', function(evt){
    $('.log').html(function(id, old){
      return old + "\n" + "pause: " + evt.target.className;
    })
  })

  // Set up the global pause and resume buttons
  $('.pause-all').click(function(){
    $('[class*=timer]').trigger('pause');
  });

  $('.resume-all').click(function(){
    $('[class*=timer]').trigger('beat');
  });
});

// Some helper functions

var randomColorVal = function(){ return parseInt(Math.random() * 255) };

var randomColor = function() {
  return 'rgb('+randomColorVal()+','+randomColorVal()+','+randomColorVal()+')';
}
