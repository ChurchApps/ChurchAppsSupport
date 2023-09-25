var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}


function showModal(imageUrl) {
  var modal = document.getElementById("myModal");
  //var btn = document.getElementById("myBtn");
  var span = document.getElementsByClassName("close")[0];
  const modalContent = document.getElementById("modalContent");

  //btn.onclick = function() {
    //modal.style.display = "block";
  //}

  modalContent.innerHTML = '<img src="' + imageUrl + '" alt="Image" class="img-fluid">';

  modal.style.display = "block";

  span.onclick = function() {
    modal.style.display = "none";
  }


  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}