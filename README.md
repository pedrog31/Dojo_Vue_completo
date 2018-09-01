# Dojo_Vue_completo
## Html
Comenzaremos con la creación de una carpeta en el ordenador. Dentro de la carpeta se crean los archivos ***index.html***, ***style.css*** y ***script.js***.

Abrimos el archivo ***index.html*** en el editor de código o IDE de preferencia (Se recomiendo usar Visual Studio Code). Creamos un esqueleto html: 
```html
<!DOCTYPE  html>
<html  lang="en">
<head>
	<meta  charset="UTF-8">
	<meta  name="viewport"  content="width=device-width, initial-scale=1.0">
	<meta  http-equiv="X-UA-Compatible"  content="ie=edge">
	<title>Document</title>
</head>
	<body>
	</body>
</html>
```
Modificamos el título que aparecerá en la pestaña cuando se abra la página web:
```html
<title>To Do List App</title>
```
Pegaremos las siguientes etiquetas en el ***head*** de nuestro index. Se utilizará el Framework de CSS ***Bootstrap*** y utilizaremos un complemento de ***jQuery***:
```html
<!-- jQuery para Bootstrap -->
<script  src="https://code.jquery.com/jquery-3.1.1.min.js"  integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>

<!-- Bootstrap -->
<link  rel="stylesheet"  href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script  src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'></script>
```
Para los estilos de letras se utilizará la siguiente fuente extraída de los repositorios de Google:
```html
<!-- Letra Fuente -->
<link  href="https://fonts.googleapis.com/css?family=Indie+Flower|Kosugi+Maru"  rel="stylesheet">
```
Enlazaremos de una vez con Vue.js en su versión para desarrolladores a través del link:
```html
<!--Vue.js-->
<script  src="https://unpkg.com/vue/dist/vue.js"></script>
```
Por último, para el servicio que se piensa consumir se necesita también de los siguientes recursos necesarios para los método ***Get*** y ***Post***.
```html
<!--Resource para los metodos get y post-->
<script  src="https://cdnjs.cloudflare.com/ajax/libs/vue-resource/1.3.4/vue-resource.min.js"></script>
```
Ahora vamos con el ***Body***, en primera instancia solo vamos a crear la tabla donde se van a mostrar las notas:
```html
<div class="container col-sm-8 col-sm-offset-2">
    <div>
        <h1>To do Task List App</h1>
        
        <table class="table">
            <thead>
                <th>Checkmark Done</th>
                <th>Task Name</th>
                <th>Delete</th>
            </thead>

            <tbody>
                <tr>
                    <td>
                        <input type="checkbox">
                    </td>
                    <td>
                        <span>Nota 1</span>
                    </td>
                    <td>
                        <button class="btn btn-danger btn-block">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
```
De esta manera solo se podría crear una tabla con datos quemados, es decir, siempre van a ser los mismos datos. Allí es donde entra  Vue.

## Vue
Creamos un nuevo modelo, el cual esperamos que interactue con el segundo div, que es donde tendremos el manejo de los datos, y al cual le vamos a asignar el id ***taskApp***
```html  
<div id="taskApp">
```
En el archivo ***script.js*** vamos a crear el modelo, le asignamos el div ***taskApp*** de la misma manera en que se hace en css, y en ***data*** que es donde almacenaremos las variables de nuestra aplicación creamos un vector de notas llamado ***tasks***
```Javascript
let  taskApp  =  new  Vue({
	el:  '#taskApp',
	data: {
		tasks: [
			{name: "Primera nota"},
			{name: "Segunda nota"},
			{name: "Tercera nota"}
		]
	}
});
```
Ahora queremos que se muestren nuestras notas en la tabla, para eso volveremos al ***index.html*** y modificaremos la etiqueta ***tr*** de tal modo que con un ***for*** recorra el contenido de el vector de notas anteriormente creado.
```html
<tr v-for='task in tasks'>
       <td>
           <input type="checkbox">
       </td>
       <td>
           <span>{{ task.name }}</span>
       </td>
       <td>
           <button class="btn btn-danger btn-block">Delete</button>
       </td>
</tr>
```
No olvidar enlazar los archivos mediante: 
```html
<script  src="script.js"></script>
```
Ahora de manera sencilla vamos a hacer que el botón ***Delete*** elimine la nota. Para esto, debemos de agregar en el ***Vue Model*** la propiedad ***methods*** y en esta agregar el método ***deleteTask(Task)*** 
```Javascript
methods: {
    deleteTask: function (task) {
        this.tasks.splice(this.tasks.indexOf(task), 1);
    }
}
```
Ahora para que este método pueda ser accedido por el botón, l agregamos la siguiente propiedad:
```html
<button class="btn btn-danger btn-block" v-on:click="deleteTask(task)">Delete</button>
```
La cual escucha el evento click y llama al método para borrar notas.
Nuestras notas van a tener un estado para saber si ya fueron realizadas o no. Para esto debemos de añadir en ***tasks*** otra propiedad al ***JSON*** que tome valores ***true*** o  ***false***:
```javascript
data: {
    tasks: [
        { name: "Primera nota", done: false },
        { name: "Segunda nota", done: false },
        { name: "Tercera nota", done: false }
    ]
}
```
Se llamó ***done*** a esta propiedad y se inicializa en ***false*** debido a que en un principio la tarea no va a estar realizada.
En el ***index.html***, vamos a agregarle al ***checkbox*** la propiedad ***done***:
```html
<input type="checkbox" v-model="task.done">
```
Sabemos que una vez clickeado el checkbox la nota cambia de estado, pero visualmente no lo percibimos por completo, para mejorar la "Comprensión" vamos a agregar un estilo que tache el ***Nombre*** de la nota cumplida.
Vamos a agregarle una clase al ***span*** donde se muestra el nombre de la nota con el fin de agregarle luego un estilo:
```html
<span :class="{taskDone: task.done}">{{ task.name }}</span>
```
El estilo que le agregaremos en el archivo ***style.css*** será el siguiente:
```css
.taskDone {
	text-decoration: line-through;
}
```
No olvidar enlazar los archivos mediante: 
```html
<link  rel="stylesheet"  href="style.css">
```
Por último, vamos a añadir una nueva nota
```html
<div class="panel panel-defautl">
    <h2 class="text-center">Add New Task</h2>

    <form v-on:submit='addTask'>
        <div class="col-sm-8">
            <input type="text" class="form-control" v-model="tasks.name">
        </div>
        <div class="col-sm-4">
            <input type="submit" value="Add" class="btn btn-primary btn-block">
        </div>
    </form>
</div>
```
En el método de agregar nota, primero se va a hacer una validación para que no se añadan notas vacías. Luego se añade al vector ***tasks*** y se limpia el ***span*** para añadir una nueva nota.
```javascript
methods: {
    addTask: function () {
        if (this.tasks.name) {
            this.tasks.push ({
                name: this.tasks.name,
                done: false
            });
            this.tasks.name = "";
        }
    },
    deleteTask: function (task) {
        this.tasks.splice(this.tasks.indexOf(task), 1);
    }
}
```
Como ya podemos agregar notas, no es necesario que tengamos datos por defecto, por tanto, podemos dejar vacío el vector ***tasks***:
```javascript
data: {
	tasks: []
}
```
## Css
Ahora en el archivo ***style.css*** agregamos las siguientes lineas con el fin de estilizar un poco la vista:
```Css
h1 {
    font-size: 58px;
}

h1, h2 {
    font-family: 'Kosugi Maru';
    text-align: center;    
}

.btn-primary {
    color: #fff;
    background-color: #7f2fc9;
    border-color: #7f2fc9;
}
```
Con esto terminamos con las funcionalidades básicas de la App, pero todas estas corriendo de manera local. 
## Servicio
Ahora vamos a consumir un servicio que nos permita tener las notas en un servidor.
```Javascript
let taskApp = new Vue({
    el: '#taskApp',
    data: {
        tasks: []
    },
    mounted() {
        this.$http.get("http://142.93.202.10:8080/tasks").then(result => {
            this.tasks = result.data;
        }, error => {
            console.error(error);
        });
    },
    methods: {
        addTask: function (e) {
            e.preventDefault();
            //This if prevents that the input adds empty tasks :D
            if (this.tasks.name) {
                let task = {
                    name: this.tasks.name,
                    done: false
                };
                this.$http.post("http://142.93.202.10:8080/tasks", task).then(result => {
                    this.tasks.push(result.data);
                    console.log(this.tasks);
                }, error => {
                    console.error(error);
                });
                this.tasks.name = "";
            }
        },

        deleteTask: function (task) {
            this.$http.delete("http://142.93.202.10:8080/tasks", { body: { id: task.id } }).then(result => {
                console.log(JSON.stringify(result.data));
                //Borra la primera ocurrencia de task
                this.tasks.splice(this.tasks.indexOf(task), 1);
            }, error => {
                console.error(error);
            });
        },
    }
});
```
Ahora necesitamos que la nota se actualice no solo en local, si no también en el servidor. Para esto creamos un método ***updateTask*** en el ***script.js*** y en el ***index.html*** mediante el evento click lo enlazamos.
```javascript
updateTask: function (task) {
   this.$http.put("http://142.93.202.10:8080/tasks", task).then(result => {
       console.log(JSON.stringify(result.data));
       this.tasks = result.body;
   }, error => {
       console.error(error);
   });
}
```
```html
<input  type="checkbox"  v-on:click="updateTask(task)"  v-model="task.done"  >
```

## Importante
A la hora de finalizar el proyecto debemos cambiar Vue de versión de desarrollo a versión de producción, esto lo hacemos reemplazando: 
```html
<script  src="https://unpkg.com/vue/dist/vue.js"></script>
```
Por
```html
<script  src="https://unpkg.com/vue@2.5.17/dist/vue.min.js"></script>
```
Podemos observar cambios en la consola del navegador.
