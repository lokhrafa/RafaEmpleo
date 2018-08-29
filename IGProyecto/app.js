function registrar(){

    var email = document.getElementById('email').value;

    var contrasena = document.getElementById('contrasena').value;



    firebase.auth().createUserWithEmailAndPassword(email, contrasena)

    .then(function(){

        verificar()

    })

    .catch(function(error) {

        // Handle Errors here.

        var errorCode = error.code;

        var errorMessage = error.message;

        console.log(errorCode);

        console.log(errorMessage);

        // ...



      });

}



function ingreso(){

    var email2 = document.getElementById('email2').value;

    var contrasena2 = document.getElementById('contrasena2').value;



    firebase.auth().signInWithEmailAndPassword(email2, contrasena2).catch(function(error) {

        // Handle Errors here.

        var errorCode = error.code;

        var errorMessage = error.message;

        console.log(errorCode);

        console.log(errorMessage);

        // ...

      });

      if(contrasena !== contrasena2, email !== email2){

       contenido.innerHTML=`
       
       <div class="container">
       <div class = "alert alert-danger" role="alert">

       <h4 class="alert-heading"> INCORRECT </h4>
       <p.</p>
       <br>
  <p class="mb-0">Username or Password Incorrect.</p>
      
       </div>
       </div>
       
       `;
  
      


      }



}

function observador(){

    firebase.auth().onAuthStateChanged(function(user) {

        if (user) {

            console.log('existe usuario activo')

            aparece(user);

          // User is signed in.

          var displayName = user.displayName;

          var email = user.email;



          console.log('******');

          console.log(user.emailVerified);

          console.log('*******');





          var emailVerified = user.emailVerified;

          var photoURL = user.photoURL;

          var isAnonymous = user.isAnonymous;

          var uid = user.uid;

          var providerData = user.providerData;

          // ...

        } else {

          // User is signed out.

          console.log('no existe usuario activo')

          // ...

          contenido.innerHTML = `

          <div class="alert alert-primary" role="alert">

        sesion inactiva..

</div>

          `;

        }

      });

}

observador();



function aparece(user)

{  

    var user = user;

    var contenido = document.getElementById('contenido');
 

    

    if(user.emailVerified){

        contenido.innerHTML = `
        <div id="wrapper">

        <!-- Sidebar -->
        <div id="sidebar-wrapper">
            <nav id="spy">
                <ul class="sidebar-nav nav">
                    <li class="sidebar-brand">
                        <a href="#home"><span class="fa fa-home solo">Home</span></a>
                    </li>
                    <li>
                        <a href="cliente.html" data-scroll>
                            <span class="">Clientes</span>
                        </a>
                    </li>
                    <li>
                        <a href="producto.html" data-scroll>
                            <span class="">Productos</span>
                        </a>
                    </li>
                    <li>
                        <a href="asociado.html" data-scroll>
                            <span class="">Asociados</span>
                        </a>
                    </li>
                    <li>
                        <a href="#anch4" data-scroll>
                        <button onclick="cerrar()" class="btn btn-danger">Cerrar sesion </button>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>

        <!-- Page content -->
        <div id="page-content-wrapper">
            <div class="content-header">
                <h1 id="home">
                    <a id="menu-toggle" href="#" class="glyphicon glyphicon-align-justify btn-menu toggle">
                        <i class="fa fa-bars"></i>
                    </a>
                    Sidebar Navigation Template
                </h1>
            </div>

            <div class="page-content inset" data-spy="scroll" data-target="#spy">
                <div class="row">
  
                        <div class="jumbotron" >
                        <div class = "container mt-5">

        <div class = "alert alert-success" role="alert">

        <h4 class="aerlt-heading display-4">Bienvenido! ${user.email} </h4>
        
        </div>

       

        </div> 
                        
                        </div>
    
                </div>
                <div class="row">
                    <div class="col-md-12 well">
                    <div class="container">

        <h1>Agregar Proyectos </h1>
    
        <input type="text" id="nombre" placeholder="ProyectoID" class="form-control my-3">
    
        <input type="text" id="apellido" placeholder="Descripcion" class="form-control my-3">
    
        <input type="text" id="fecha" placeholder="clienteID" class="form-control my-3">

        <input type="text" id="productoid" placeholder="productoID" class="form-control my-3">

        <input type="text" id="asociadoid" placeholder="asociadoID" class="form-control my-3">

        <input type="text" id="fechainicio" placeholder="fechaInicio" class="form-control my-3">

        <input type="text" id="fechafinal" placeholder="fechaFinal" class="form-control my-3">
 

    
        <button class="btn btn-info" id="boton" onclick="guardar()">Guardar</button>
        <hr>
        <div class="container">
       
        <i class="fas fa-search fa-sm">
        <input id="myInput"  onkeyup="myFunction()" class="form-control mr-sm-2" type="search" placeholder="Consulta" aria-label="Search">
        </i>
        </div>
     
    
        <table class="table my-3">
    
          <thead>
    
            <tr>
    
              <th scope="col">ProyectoId</th>
    
              <th scope="col">Descripcion</th>
    
              <th scope="col">clienteID</th>
    
              <th scope="col">productoID</th>

              <th scope="col">asociadoID</th>

              <th scope="col">fechaInicio</th>

              <th scope="col">fechaFinal</th>
    
              <th scope="col">Eliminar</th>
    
              <th scope="col">Editar</th>
    
            </tr>
    
          </thead>
    
          <tbody id="tabla">
    
          
    
          </tbody>
    
        </table>
    
      </div>
                        
                    </div>
                    <div class="col-md-12 well">
                        
                    </div>
                    <div class="col-md-12 well">
                       
                    </div>
                    <div class="col-md-12 well">
                       
                    </div>
                </div>

                <div class="navbar navbar-default navbar-static-bottom">
                 
                </div>
            </div>

        </div>

   
        

        `;
  
    }
    

    var tabla = document.getElementById('tabla');

db.collection("users").onSnapshot((querySnapshot) => {

    tabla.innerHTML = '';

    querySnapshot.forEach((doc) => {

        console.log(`${doc.id} => ${doc.data().ProyectoID}`);

        tabla.innerHTML += `  

        <tr>
        <td>${doc.data().ProyectoID}</td>

        <td>${doc.data().Descripcion}</td>

        <td>${doc.data().clienteID}</td>

        <td> ${doc.data().productoID}</td>

        <td> ${doc.data().asociadoID}</td>

        <td> ${doc.data().fechaInicio}</td>

        <td> ${doc.data().fechaFinal}</td>

        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>

        <td> <button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().ProyectoID}','${doc.data().Descripcion}','${doc.data().clienteID}','${doc.data().productoID}','${doc.data().asociadoID}','${doc.data().fechaInicio}','${doc.data().fechaFinal}')">Editar</button></td>

      </tr>`
      

  

    });

});


}



function cerrar(){

    firebase.auth().signOut()

    .then(function(){

        console.log('Saliendo...')

    })

    .catch(function(error){

        console.log(error)

    })

}



function verificar(){

    var user = firebase.auth().currentUser;



user.sendEmailVerification().then(function() {

    console.log('Enviando correo...');

  // Email sent.

}).catch(function(error) {

  // An error happened.

  console.log(error);

});

}

var db = firebase.firestore();


function guardar(){

   

    var nombre = document.getElementById('nombre').value;

    var apellido = document.getElementById('apellido').value;

    var fecha = document.getElementById('fecha').value;

    var productoid = document.getElementById('productoid').value;

    var asociadoid = document.getElementById('asociadoid').value;

    var fechainicio = document.getElementById('fechainicio').value;

    var fechafinal = document.getElementById('fechafinal').value;





    db.collection("users").add({

        ProyectoID: nombre,

        Descripcion: apellido,

        clienteID: fecha,

        productoID: productoid,

        asociadoID: asociadoid,

        fechaInicio: fechainicio,

        fechaFinal: fechafinal


    })

    .then(function(docRef) {

        console.log("Document written with ID: ", docRef.id);

        document.getElementById('nombre').value = '';

        document.getElementById('apellido').value = '';

        document.getElementById('fecha').value = '';

        document.getElementById('productoid').value = '';

        document.getElementById('asociadoid').value = '';

        document.getElementById('fechainicio').value = '';

        document.getElementById('fechafinal').value = '';

    })

    .catch(function(error) {

        console.error("Error adding document: ", error);

    });

    

}







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



function editar(id,nombre,apellido,fecha,productoid,asociadoid,fechainicio,fechafinal){

document.getElementById('nombre').value = nombre;

document.getElementById('apellido').value = apellido;

document.getElementById('fecha').value = fecha;

document.getElementById('productoid').value = productoid;

document.getElementById('asociadoid').value = asociadoid;

document.getElementById('fechainicio').value = fechainicio;

document.getElementById('fechafinal').value = fechafinal;

var boton = document.getElementById('boton');

boton.innerHTML = 'Editar';



boton.onclick = function(){

    

var washingtonRef = db.collection("users").doc(id);



var nombre = document.getElementById('nombre').value;

var apellido = document.getElementById('apellido').value;

var fecha = document.getElementById('fecha').value;

var productoid = document.getElementById('productoid').value;

var asociadoid = document.getElementById('asociadoid').value;

var fechainicio = document.getElementById('fechainicio').value;

var fechafinal = document.getElementById('fechafinal').value;






// Set the "capital" field of the city 'DC'

return washingtonRef.update({

    ProyectoID: nombre,

    Descripcion: apellido,

    clienteID: fecha,

    productoID: productoid,

    asociadoID: asociadoid,

    fechaInicio: fechainicio,

    fechaFinal: fechafinal


})

.then(function() {

    console.log("Document successfully updated!");

    boton.innerHTML = 'Guardar';

    document.getElementById('nombre').value = '';

    document.getElementById('apellido').value = '';

    document.getElementById('fecha').value = '';

    document.getElementById('productoid').value = '';

    document.getElementById('asociadoid').value = '';

    document.getElementById('fechainicio').value = '';

    document.getElementById('fechafinal').value = '';

})

.catch(function(error) {

    // The document probably doesn't exist.

    console.error("Error updating document: ", error);

});

}

}