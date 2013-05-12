// Heartbeat Plugins
// ========================

/**
  $(elem).heartbeat(interval).trigger('beat')

  Set up a pulse that triggers a beat every `interval` milliseconds

  Defined events:
  - beat
  - pause
  - resume
  - reset
*/
$.fn.heartbeat = function(interval){
  var $heartbeat = $(this);
  var heartbeat = {
    timeout: false,
    playing: false,
    interval: 4000
  };

  heartbeat.interval = interval ? interval : heartbeat.interval;

  $heartbeat.on('beat', function(){
    $heartbeat.trigger('pause');
    $heartbeat.trigger('resume');
  });

  $heartbeat.on('pause', function(){
    clearTimeout(heartbeat.timeout);
  });

  $heartbeat.on('resume', function(){
    // Define a closure to pass a callable with the neccessary
    // scope into the timeout
    var next = (function($e){
      return function(){ $e.trigger('beat') }
    })($heartbeat);

    heartbeat.timeout = setTimeout(next, heartbeat.interval);
  });
  return this;
};

/**
  $(elem).stepper(interval)

  Set up a counter that increments every `interval` milliseconds

  Defined events:
  - step (count)

  Inherited events:
  - beat
  - pause
  - resume
  - reset
  */
$.fn.stepper = function(interval) {
  var $stepper = $(this);
  var stepper = { count: -1, increment: 1 };

  $stepper.on('set:increment', function(__, i){
    stepper.increment = (typeof i == "number") ? i : increment;
  });

  $stepper.on('beat', function(){
    stepper.count += stepper.increment;
    $stepper.trigger('step', stepper.count);
  });

  $stepper.on('reset', function(){
    stepper.count = 0 - stepper.increment;
    $stepper.trigger('beat');
  });

  var heartbeat = $stepper.heartbeat(interval);
  return this;
}

/**
  $(elem).looper(interval, max)

  Set up a looper to trigger each `interval` milliseconds and
  resets to 0 after reaching `max`.

  Inherited events:
  - beat
  - step (count)
  - pause
  - resume
  - reset
  */
$.fn.looper = function(interval, max) {
  var $looper = $(this);
  var looper = { max: 100 };

  looper.max = max ? parseInt(max) : looper.max;

  $looper.on('step', function(evt, count){
    if (count > looper.max) $looper.trigger('reset');
  });

  $looper.stepper(interval);
  return this;
}
