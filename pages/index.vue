<template>
  <div class="row" @open-modal="openModal=$event">
    <div class="col-md-4 to-do-list">
      <TodoList :listTodo="listTodo" />
      <!-- <ModalAddOrUpdate :openModal="openModal" /> -->
      <!-- <TodoDetail /> -->
    </div>
  </div>
</template>

<script>
// import moment from "moment";
import { mapState, mapActions } from "vuex";
import TodoList from "../components/TodoList.vue";
// import TodoDetail from "../components/ToDoDetail";
import ModalAddOrUpdate from "../components/ModalAddOrUpdate";

export default {
  components: {
    TodoList
    // ModalAddOrUpdate
    // TodoDetail
  },
  data: () => {
    return {
      id: "",
      openModal: true
    };
  },

  computed: {
    ...mapState("todoModule", ["listTodo", "todo"]),
    ...mapActions("todoModule", [
      "getAllTodo",
      "getTodoById",
      "addTodo",
      "updateTodo",
      "deleteTodo"
    ])
  },
  methods: {
    setOpenModal(value) {
      this.openModal = value;
    }
  },
  asyncData({ store }) {
    store.dispatch("todoModule/getAllTodo");
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


