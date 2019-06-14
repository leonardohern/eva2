firebase.initializeApp({
    apiKey: "AIzaSyDMESH6VlSDwD1d2Xpd5OmPuDcWmllpy9U",
    authDomain: "eva2-9dfe7.firebaseapp.com",
    projectId: "eva2-9dfe7"
  });

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

function guardar() {
    //Agregar Datos a BD
    var autor = document.getElementById('Autor').value;
    var titulotituloti = document.getElementById('titulo').value;
    var fecha = document.getElementById('fecha_de_publicacion').value;
    db.collection("libros").add({
        Autor: autor,
        titulo: titulotituloti,
        fecha_de_publicacion: fecha
    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById('Autor').value = '';
            document.getElementById('titulo').value = '';
            document.getElementById('fecha_de_publicacion').value = '';
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}

//leer Datos 
var tabla = document.getElementById('tabla');
db.collection("libros").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().Autor}`);
        tabla.innerHTML += `
        <tr>
            <th scope="row">${doc.data().titulo}</th>
            <td>${doc.data().Autor}</td>
            <td>${doc.data().fecha_de_publicacion}</td>
            <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
            <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().Autor}','${doc.data().titulo}','${doc.data().fecha_de_publicacion}')">Editar</button></td>
          </tr>
          `
    });
});

//Borrar Datos
function eliminar(id){
    db.collection("libros").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

//Actualizar Datos 
function editar(id,autor,titulo,fecha){

    document.getElementById('Autor').value = autor;
    document.getElementById('titulo').value = titulo;
    document.getElementById('fecha_de_publicacion').value = fecha;
    var boton = document.getElementById('boton');
    boton.innerHTML='Editar';

    boton.onclick= function(){
        var washingtonRef = db.collection("libros").doc(id);
        // Set the "capital" field of the city 'DC'
        var autor = document.getElementById('Autor').value;
        var titulo = document.getElementById('titulo').value;
        var fecha = document.getElementById('fecha_de_publicacion').value;
      
        return washingtonRef.update({
                Autor: autor,
                titulo: titulo,
                fecha_de_publicacion: fecha
        })
        .then(function() {
            console.log("Document successfully updated!");
            boton.innerHTML='Guardar';
            document.getElementById('Autor').value = '';
            document.getElementById('titulo').value = '';
            document.getElementById('fecha_de_publicacion').value = '';
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        }); 

    }
}





