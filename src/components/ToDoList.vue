<template>
  <div class="container col-sm-8 col-sm-offset-2">
        <div id="taskApp">
            <h1>Lista de tareas</h1>

            <!-- Add new task form-->
            <div class="panel defoutl">
                <h2 class="text-center">Nueva tarea</h2>

                <form v-on:submit='addTask'>
                    <div class="col-sm-8">
                        <input type="text" class="form-control edit-text" v-model="tasks.name">
                    </div>
                    <div class="col-sm-4">
                        <input type="submit" value="Añadir" class="btn btn-primary btn-block">
                    </div>
                </form>
            </div>
            <!--Boostrap task panel no identifica los forms como contenido, asi que añadimos la etiquieta non-breaking space -->

            <table class="table">
                <thead>
                    <th>Tarea realizada</th>
                    <th>Nombre</th>
                    <th>Eliminar</th>
                </thead>

                <tbody>
                    <tr v-for='task in tasks'>
                        <td><input type="checkbox" v-on:click="updateTask(task)" v-model="task.done"></td>
                        <td><span :class="{taskDone: task.done}">{{ task.name}}</span></td>
                        <td><button class="btn btn-danger btn-block" v-on:click="deleteTask(task)">Eliminar</button></td>
                    </tr>

                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      tasks: [

        ]
    }
  },
  mounted() {
            this.$http.get("http://142.93.202.10:8080/tasks").then(result => {
                this.tasks = result.body;
            }, error => {
                console.error(error);
            });
        },
  methods: {
      addTask: function (e) {
          e.preventDefault();
          //This if prevents that the input adds empty tasks :D
          if (this.tasks.name !== ""){
              let task = {
                name: this.tasks.name,
                done: false
              };
              this.$http.put("http://142.93.202.10:8080/tasks", task).then(result => {
                this.tasks.push(result.body);
                console.log(this.tasks);
              }, error => {
                console.error(error);
              });
              this.tasks.name="";
          }
      },

      //Vamos a usar javascript para entrar al array de task y dividirlo y tomar el valor que necesitamos para poder eliminarlo
      deleteTask: function (task) {
          this.$http.delete("http://142.93.202.10:8080/tasks",  {body: { id: task.id }}).then(result => {
            console.log(JSON.stringify(result.body));
            //Borra la primera ocurrencia de task
            this.tasks.splice(this.tasks.indexOf(task), 1);
          }, error => {
            console.error(error);
          });
      },

      updateTask: function (task) {
        task.done = !task.done;
        this.$http.post("http://142.93.202.10:8080/tasks", task).then(result => {
          console.log(JSON.stringify(result.body));
          this.tasks = result.body;
        }, error => {
          console.error(error);
        });
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.taskDone {
    text-decoration: line-through;
}

h1 {
    font-size: 58px;
    font-family: 'Kosugi Maru';
    text-align: center;

}
h2{
    font-family: 'Kosugi Maru';
    text-align: center;
}

.btn-primary {
    color: #fff;
    background-color: #7f2fc9;
    border-color: #7f2fc9;
    margin: 10px !important;
}

.edit-text {
  margin: 10px !important;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
