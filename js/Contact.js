
document.getElementById("Alright").addEventListener("click", cutitem2);

function cutitem2() {
  document.getElementById("cuitem1").style.display = "none";
  document.getElementById("cutitem2").style.display = "block";
  document.getElementById("cutitem3").style.display = "none";
}


document.getElementById("Next").addEventListener("click", cutitem3);

function cutitem3() {
  document.getElementById("cutitem2").style.display = "none";
  document.getElementById("cutitem3").style.display = "block";
}

document.getElementById("NewMess").addEventListener("click", cutitem2);

document.getElementById("close").addEventListener("click", close);

function close() {
  document.getElementById("speechid").style.display = "none"; 
}

/*SIGNUP*/
var modal = document.getElementById("SignUPid");
var btn = document.querySelector(".SignUP");
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

/* Open when someone clicks on the span element */
function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}