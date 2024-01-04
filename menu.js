document.getElementById("rules").addEventListener("click", function() {
  window.open("upload/Da monopoly booklet.pdf", "_blank")
})

document.getElementById("toMap").addEventListener("click", function() {
  document.getElementById("routeHolder").style.display = "none"
})

document.getElementById("toRoute").addEventListener("click", function() {
  document.getElementById("routeHolder").style.display = "flex"
})

// Set the date we're counting down to
var countDownDate = new Date("17:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("timerOutput").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timerOutput").innerHTML = "EXPIRED";
  }
}, 1000);