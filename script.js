const addModal = document.querySelector('.add-modal');
const addModalForm = document.querySelector('.add-modal .form');
const btnAdd = document.querySelector('.btn-add');
const tableUsers = document.querySelector('.table-users');

let id;

var data = new Date();
var dia     = data.getDate();           // 1-31
var dia_sem = data.getDay();            // 0-6 (zero=domingo)
var mes     = data.getMonth();          // 0-11 (zero=janeiro)
var ano2    = data.getYear();           // 2 dígitos
var ano4    = data.getFullYear();       // 4 dígitos
var hora    = data.getHours();          // 0-23
var min     = data.getMinutes();        // 0-59
var seg     = data.getSeconds();        // 0-59
var mseg    = data.getMilliseconds();   // 0-999
var tz      = data.getTimezoneOffset(); // em minutos
var str_data = dia + '/' + (mes+1) + '/' + ano4;
var str_hora = hora + ':' + min + ':' + seg;
var data_hora = str_data + ' - ' + str_hora;

// Create element and render comments
const renderUser = doc => {
  const tr = `    
  <tr data-id='${doc.id}'>
  <td style = "text-transform:uppercase;">${doc.data().nome} - ${doc.data().horario}</td>     
  <td ><textarea>${doc.data().comentario}</textarea></td>
  </tr>
  `;
  tableUsers.insertAdjacentHTML('beforeend', tr);
}

addModalForm.addEventListener('submit', e => {
  e.preventDefault();
  db.collection('comments').add({
    nome: addModalForm.nome.value,
    horario: data_hora,
    comentario: addModalForm.comentario.value,    
  }); 

  addModalForm.nome.value = '';
  addModalForm.comentario.value = '';
    
});

db.collection('comments').orderBy("horario",'desc').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if(change.type === 'added') {
      renderUser(change.doc);
    }
    if(change.type === 'removed') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableUsers.removeChild(tbody);
    }
    if(change.type === 'modified') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableUsers.removeChild(tbody);
      renderUser(change.doc);
    }
  })
})

// Click submit in add modal



