/* global data */
/* exported data */
var photoInput = document.querySelector('#photo');
var photoMain = document.querySelector('#main-image');
var title = document.querySelector('#title');
var notes = document.querySelector('#notes');
photoInput.addEventListener('input', updatePhoto);
function updatePhoto(e) {
  photoMain.src = e.target.value;
}

photoMain.addEventListener('error', reset);

function reset() {
  photoMain.src = 'images/placeholder-image-square.jpg';
}

function resetInputs() {
  document.querySelector('form').reset();
}

var form = document.querySelector('form');
form.addEventListener('submit', store);
function store(e) {
  e.preventDefault();
  var newObject = {};
  newObject.title = title.value;
  newObject.photoURL = photoInput.value;
  newObject.notes = notes.value;
  newObject.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(newObject);
  reset();
  resetInputs();
}
