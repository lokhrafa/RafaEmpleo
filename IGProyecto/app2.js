firebase.initializeApp({

    apiKey:"AIzaSyBTJVFAGjfAgy4zWoRnWDAD7pfqDAv477o",

    authDomain: "igproyectocliente.firebaseapp.com",

    projectId: "igproyectocliente"

  });

  

  //Initialize  cloud firestore through firebase

  var db = firebase.firestore();







function guardar(){

   

    var nombre = document.getElementById('nombre').value;

    var apellido = document.getElementById('apellido').value;






    db.collection("users").add({

        ClienteID: nombre,

      Descripcion: apellido

      

    })

    .then(function(docRef) {

        console.log("Document written with ID: ", docRef.id);

        document.getElementById('nombre').value = '';

        document.getElementById('apellido').value = '';

    })

    .catch(function(error) {

        console.error("Error adding document: ", error);

    });

    

}



var tabla = document.getElementById('tabla');

db.collection("users").onSnapshot((querySnapshot) => {

    tabla.innerHTML = '';

    querySnapshot.forEach((doc) => {

        console.log(`${doc.id} => ${doc.data().ClienteID}`);

        tabla.innerHTML += `  
    

        <tr>

      

        <td>${doc.data().ClienteID}</td>

        <td>${doc.data().Descripcion}</td>

      

        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>

        <td> <button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().ClienteID}','${doc.data().Descripcion}')">Editar</button></td>

      </tr>`

  

    });

});



function eliminar(id){

    

    db.collection("users").doc(id).delete().then(function() {

        console.log("Document successfully deleted!");

    }).catch(function(error) {

        console.error("Error removing document: ", error);

    });

    



}

function myFunction(){

    var input,filter,tabla,tr,td,i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    tabla = document.getElementById("tabla");
    tr = tabla.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++){
        td = tr[i].getElementsByTagName("td")[0];
        if(td){
            if(td.innerHTML.toUpperCase().indexOf(filter) > -1){
                tr[i].style.display = "";

            } else {
                tr[i].style.display = "none";
            }
        }
    }
}




function editar(id,nombre,apellido,fecha){

document.getElementById('nombre').value = nombre;

document.getElementById('apellido').value = apellido;



var boton = document.getElementById('boton');

boton.innerHTML = 'Editar';



boton.onclick = function(){

    

var washingtonRef = db.collection("users").doc(id);



var nombre = document.getElementById('nombre').value;

var apellido = document.getElementById('apellido').value;







// Set the "capital" field of the city 'DC'

return washingtonRef.update({

  ClienteID: nombre,

  Descripcion: apellido,

  

})

.then(function() {

    console.log("Document successfully updated!");

    boton.innerHTML = 'Guardar';

    document.getElementById('nombre').value = '';

    document.getElementById('apellido').value = '';

    

})

.catch(function(error) {

    // The document probably doesn't exist.

    console.error("Error updating document: ", error);

});

}

}