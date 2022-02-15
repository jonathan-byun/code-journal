/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function () {
  var stringData = JSON.stringify(data);
  localStorage.setItem('dataset', stringData);
});

var dataJSON = localStorage.getItem('dataset');
if (dataJSON !== null) {
  data = JSON.parse(dataJSON);
}
