/* global data */
/* exported data */
var photoInput = document.querySelector('#photo');
var photoMain = document.querySelector('#main-image');
photoInput.addEventListener('input', updatePhoto);
function updatePhoto(e) {
  photoMain.src = e.target.value;
}
