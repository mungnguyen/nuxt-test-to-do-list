<template>
  <div class="row">
    <div class="col-md-4 to-do-list">
      <TodoList />
      <ModalAddOrUpdate :openModal="openModal" :update="update" />
    </div>
    <div class="col-md-8">
      <TodoDetail />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import TodoList from "../components/TodoList.vue";
import TodoDetail from "../components/TodoDetail";
import ModalAddOrUpdate from "../components/ModalAddOrUpdate";

export default {
  components: {
    TodoList,
    ModalAddOrUpdate,
    TodoDetail
  },
  data: () => {
    return {
      openModal: false,
      update: false
    };
  },

  async asyncData({ store }) {
    await store.dispatch("todoModule/getAllTodo");
  },

  methods: {
    ...mapActions("todoModule", [
      "getAllTodo",
      "getTodoById",
      "addTodo",
      "updateTodo",
      "deleteTodo"
    ]),

    setOpenModal(value) {
      this.openModal = value;
    },

    setUpdate(value) {
      this.update = value;
    }
  }
};
</script>

<style>
.to-do-list {
  border-right: 0.05em solid rgb(134, 131, 131);
  margin: 0;
  padding-top: 0.5em;
  padding-right: 0;
  height: 33.8em;
}

.title {
  margin-left: 2em;
  font: 1em sans-serif;
}

.delete {
  position: absolute;
  right: 1em;
  color: grey;
}

.delete:hover {
  color: black;
}

.filter {
  position: absolute;
  bottom: 1em;
  left: 5em;
}
</style>


