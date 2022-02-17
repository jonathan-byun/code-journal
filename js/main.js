/* global data */
/* exported data */
var $unorderedList = document.querySelector('ul');
var photoInput = document.querySelector('#photo');
var photoMain = document.querySelector('#main-image');
var title = document.querySelector('#title');
var notes = document.querySelector('#notes');
var $deleteButton = document.querySelector('.delete-button');
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
  var $unorderedList = document.querySelector('ul');
  if (data.editing !== null) {
    var entryPosition = data.entries.length - data.editing.entryId;
    var replaced = data.entries[entryPosition];
    replaced.title = title.value;
    replaced.photoURL = photoInput.value;
    replaced.notes = notes.value;
    reset();
    resetInputs();
    $entryForm.className = 'inactive';
    $entries.className = 'active';
    var replacementTree = addEntry(replaced);
    var replacedTree = $unorderedList.children[entryPosition];
    $unorderedList.insertBefore(replacementTree, replacedTree);
    replacedTree.remove();
    $deleteButton.classList.add('inactive');
    $deleteButton.classList.remove('active');
  } else {
    var newObject = {};
    newObject.title = title.value;
    newObject.photoURL = photoInput.value;
    newObject.notes = notes.value;
    newObject.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(newObject);
    var appendNewObject = addEntry(newObject);
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
  image.setAttribute('onerror', "this.onerror=null;this.src='images/placeholder-image-square.jpg'");
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
  $deleteButton.classList.remove('active');
  $deleteButton.classList.add('inactive');
  data.editing = null;
});

var $newEntryTab = document.querySelector('.new-entry-tab');
$newEntryTab.addEventListener('click', function () {
  $entryForm.className = 'active';
  $entries.className = 'inactive';
  $deleteButton.classList.remove('active');
  $deleteButton.classList.add('inactive');
  resetInputs();
  reset();
  document.querySelector('#new-or-edit').textContent = 'New Entry';
  data.editing = null;
});

$unorderedList.addEventListener('click', editPage);
function editPage(e) {
  if (e.target.className === 'edit-button') {
    $entryForm.className = 'active';
    $entries.className = 'inactive';
    $deleteButton.classList.add('active');
    $deleteButton.classList.remove('inactive');
    data.editing = data.entries[data.entries.length - e.target.closest('.entry-entity').getAttribute('data-entry-id')];
    title.value = data.editing.title;
    photoInput.value = data.editing.photoURL;
    notes.value = data.editing.notes;
    photoMain.src = photoInput.value;
    document.querySelector('#new-or-edit').textContent = 'Edit Entry';
  }
}

var $modal = document.querySelector('.modal');
$deleteButton.addEventListener('click', showModal);
function showModal() {
  $modal.classList.add('active-flex');
  $modal.classList.remove('inactive');
}

var $cancelButton = document.querySelector('.cancel-button');
$cancelButton.addEventListener('click', hideModal);
function hideModal() {
  $modal.classList.remove('active-flex');
  $modal.classList.add('inactive');
}

var $confirmButton = document.querySelector('.confirm-button');
$confirmButton.addEventListener('click', deleteEntry);
function deleteEntry() {
  var entryLength = data.entries.length;
  var editEntryEntryID = data.editing.entryId;
  data.entries.splice(entryLength - editEntryEntryID, 1);
  var removedElement = $unorderedList.children[entryLength - editEntryEntryID];
  removedElement.remove();
}
