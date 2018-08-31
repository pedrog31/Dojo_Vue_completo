<template>
  <div id="app">
    <header>
      <span>Lista de tareas</span>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
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
}
</style>
