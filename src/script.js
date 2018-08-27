$(document).ready(function() {
  let flagRun = false;   // timer is stopped
  let flagSession = true;  // it is session time
  let countdown;
  let interval;

  const showFlag = () => {
    flagSession ? $('#title').html('Session') : $('#title').html('Break') ;
  };

  const defineCountdown = () => {
    if (flagSession) {
      return $('#seTime').html() * 60;
    } else {
      return $('#brTime').html() * 60;
    }
  };

  const checkZero = (len) => {
    if (len > 0) {
      return --len;
    } else {
      return len;
    }
  };

  $('button').on('click', function() {
    if (flagRun) {
      return;
    }
    
    let sessionLength = $('#seTime').html();
    let breakLength = $('#brTime').html();

    switch ($(this).attr('id')) {
      case 'brSet':
        $(this).html() === '+' ? breakLength++ : breakLength = checkZero(breakLength);
        $('#brTime').html(breakLength);

        if (!flagSession) {
          countdown = defineCountdown();
        }
        break;

      case 'seSet':
        $(this).html() === '+' ? sessionLength++ : sessionLength = checkZero(sessionLength);
        $('#seTime').html(sessionLength);
        flagSession = true;
        countdown = defineCountdown();
        showFlag();
        $('#timer').html(sessionLength);
        break;

      default:
        $('#brTime').html(5);
        $('#seTime').html(25);
    };
    showMessage();

  });

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const showMessage = () => {
    if ($('#seTime').html() === '0') {
      $('#message').html('Set the session length to use the clock!');
    } else if ($('#brTime').html() === '0') {
      $('#message').html('No break between sessions');
    } else {
      $('#message').html('');
    }
  };

  showFlag();
  countdown = defineCountdown();

  $('.counter').on('click', function() {
    if ($('#seTime').html() === '0') {
      return;
    }

    if (flagRun) {      // timer was running and now it stopped
      console.log('Timer stopped');
      clearTimeout(interval);
      flagRun = !flagRun;

    } else {            // timer just started running
      console.log('Session starts');
      interval = startTimer();
      flagRun = !flagRun;
    }
  });


  const displayTime = (duration) => {
    let hours = Math.floor(duration / 3600);
    let minutes = Math.floor((duration - hours * 3600) / 60);
    let seconds = duration % 60;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    $('#timer').html(hours + ':' + minutes + ":" + seconds);
  };

  const startTimer = () => {    // duration in seconds

    displayTime(countdown);

    return setTimeout(() => {
      $('#timer').html(countdown);
      countdown--;

      if (countdown >= 0) {
        interval = startTimer();
      } else {
        clearTimeout(interval);
        flagSession = !flagSession;

        countdown = defineCountdown();
        showFlag();
        startTimer();
      }
    }, 1000);
  };
});
