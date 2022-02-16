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
  if (data.editing !== null) {
    var replaced = data.entries[data.entries.length - data.editing.entryId];
    replaced.title = title.value;
    replaced.photoURL = photoInput.value;
    replaced.notes = notes.value;
    reset();
    resetInputs();
    $entryForm.className = 'inactive';
    $entries.className = 'active';
  } else {
    var newObject = {};
    newObject.title = title.value;
    newObject.photoURL = photoInput.value;
    newObject.notes = notes.value;
    newObject.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(newObject);
    var appendNewObject = addEntry(newObject);
    var $unorderedList = document.querySelector('ul');
    $unorderedList.prepend(appendNewObject);
    reset();
    resetInputs();
    $entryForm.className = 'inactive';
    $entries.className = 'active';
  }

}

function addEntry(entry) {
  var outerRow = document.createElement('div');
  outerRow.className = 'row margin-bot-2-rem entry-entity';
  outerRow.setAttribute('data-entry-id', data.entries.length - data.entries.indexOf(entry));
  var columnHalf = document.createElement('div');
  columnHalf.className = 'column-half';
  outerRow.appendChild(columnHalf);
  var image = document.createElement('img');
  image.className = 'border-radius-75';
  image.src = entry.photoURL;
  columnHalf.appendChild(image);
  var columnHalf2 = document.createElement('div');
  columnHalf2.className = 'column-half';
  outerRow.appendChild(columnHalf2);
  var innerRow = document.createElement('div');
  innerRow.className = 'row justify-content-space-between';
  columnHalf2.appendChild(innerRow);
  var header = document.createElement('h2');
  header.className = 'margin-top-2-rem padding-top-1-rem font-size-200 font-weight-600';
  header.textContent = entry.title;
  innerRow.appendChild(header);
  var imageColumn = document.createElement('div');
  imageColumn.className = 'column-fourth row justify-right align-items-center';
  innerRow.appendChild(imageColumn);
  var editButton = document.createElement('img');
  editButton.src = 'https://cdn.iconscout.com/icon/free/png-256/edit-2653317-2202989.png';
  editButton.className = 'edit-button';
  imageColumn.appendChild(editButton);
  var innerRow2 = document.createElement('div');
  innerRow2.className = 'row';
  columnHalf2.appendChild(innerRow2);
  var paragraph = document.createElement('p');
  paragraph.className = 'font-size-120 margin-bot-2-rem';
  paragraph.textContent = entry.notes;
  innerRow2.appendChild(paragraph);
  return outerRow;
}

function appendEntry() {
  for (let i = 0; i < data.entries.length; i++) {
    var domTree = addEntry(data.entries[i]);
    document.querySelector('ul').appendChild(domTree);
  }
}

window.addEventListener('DOMContentLoaded', appendEntry);

var $entriesTab = document.querySelector('.entries-tab');
var $entryForm = document.querySelector('#entry-form');
var $entries = document.querySelector('#entries');
$entriesTab.addEventListener('click', function () {
  $entryForm.className = 'inactive';
  $entries.className = 'active';
});

var $newEntryTab = document.querySelector('.new-entry-tab');
$newEntryTab.addEventListener('click', function () {
  $entryForm.className = 'active';
  $entries.className = 'inactive';
  resetInputs();
  reset();
  document.querySelector('#new-or-edit').textContent = 'New Entry';
  data.editing = null;
});

var $unorderedList = document.querySelector('ul');
$unorderedList.addEventListener('click', editPage);
function editPage(e) {
  if (e.target.className === 'edit-button') {
    $entryForm.className = 'active';
    $entries.className = 'inactive';
    data.editing = data.entries[data.entries.length - e.target.closest('.entry-entity').getAttribute('data-entry-id')];
    title.value = data.editing.title;
    photoInput.value = data.editing.photoURL;
    notes.value = data.editing.notes;
    photoMain.src = photoInput.value;
    document.querySelector('#new-or-edit').textContent = 'Edit Entry';
  }
}
