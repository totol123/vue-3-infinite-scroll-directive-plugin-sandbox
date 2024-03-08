<script lang="ts" setup>
  import { ref } from 'vue';

  const todos = ref([]);
  const nextPage = ref(1);
  const isLoading = ref(false);

  const handleInfiniteScroll = async () => {
    isLoading.value = true;

    const data = await (await fetch(`https://jsonplaceholder.typicode.com/todos/${nextPage.value}`)).json();
    todos.value.push(data);
    nextPage.value++;

    setTimeout(() => {
      isLoading.value = false;
    }, Math.random() * 2000);
  };
</script>
<template>
  <div v-infinite-scroll="handleInfiniteScroll" 
    data-infinite-scroll-margin="20" 
    data-infinite-scroll-delay="200" 
    :data-infinite-scroll-disabled="isLoading"
  >
    <ul>
      <li  v-for="todo in todos" :key="todo.id"  class="todo">
        <div>
          {{ todo.title }}
        </div>
      </li>
    </ul>
  </div>
  <div class="loader-wrapper" v-if="isLoading">
    <span class="loader"></span>
  </div>
</template>
<style>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-top: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.todo {
  height: 200px;
  border: 3px solid black;
}
.loader-wrapper {
  display: flex;
  justify-content: center;
}
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid black;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
  0% {
      transform: rotate(0deg);
  }
  100% {
      transform: rotate(360deg);
  }
} 
</style>