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

function addEntry(entry) {
  var outerRow = document.createElement('div');
  outerRow.className = 'row margin-bot-2-rem';
  var columnHalf = document.createElement('div');
  columnHalf.className = 'column-half';
  outerRow.appendChild(columnHalf);
  var image = document.createElement('img');
  image.className = 'margin-top-2-rem border-radius-75';
  columnHalf.appendChild(image);
  var columnHalf2 = document.createElement('div');
  columnHalf2.className = 'column-half';
  outerRow.appendChild(columnHalf2);
  var innerRow = document.createElement('div');
  innerRow.className = 'row';
  columnHalf2.appendChild(innerRow);
  var header = document.createElement('h2');
  header.className = 'margin-top-2-rem padding-top-1-rem font-size-200 font-weight-600';
  innerRow.appendChild(header);
  var paragraph = document.createElement('p');
  paragraph.className = 'font-size-120 margin-bot-2-rem';
  innerRow.appendChild(paragraph);
  return outerRow;
}

function appendEntry() {
  var domTree = addEntry();
  for (let i = 0; i < data.entries.length; i++) {
    document.querySelector('ul').appendChild(domTree);
  }
}

window.addEventListener('DOMcontentloaded', appendEntry);
