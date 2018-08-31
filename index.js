
var taskApp = new Vue({
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

        //Vamos a usar javascript para entrar al array de task y dividirlo y tomar el valor que necesitamos para poder eliminarlo
        deleteTask: function (task) {
            this.$http.delete("http://142.93.202.10:8080/tasks", { body: { id: task.id } }).then(result => {
                console.log(JSON.stringify(result.data));
                //Borra la primera ocurrencia de task
                this.tasks.splice(this.tasks.indexOf(task), 1);
            }, error => {
                console.error(error);
            });
        },

        updateTask: function (task) {
            this.$http.put("http://142.93.202.10:8080/tasks", task).then(result => {
                console.log(JSON.stringify(result.data));
                this.tasks = result.body;
            }, error => {
                console.error(error);
            });
        }
    }
});
