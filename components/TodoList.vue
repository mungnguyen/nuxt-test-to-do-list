<template>
  <div>
    <div>
      <div v-for="(item, index) in listTodoFilter" :key="index" style="margin-left: 1em">
        <div v-if="!item.tick">
          <font-awesome-icon @click="tickTodo(item.id, item.tick)" :icon="['far', 'circle']" />
          <span class="title" @click="getTodoById(item.id)">
            <b>{{ item.title }}</b>
          </span>
          <font-awesome-icon @click="setId(item.id, true)" icon="trash" class="delete" />
          <hr />
        </div>
      </div>
    </div>

    <div>
      <div v-for="item in listTodoFilter" :key="item.id" style="margin-left: 1em">
        <div v-if="item.tick" style="color: grey">
          <font-awesome-icon @click="tickTodo(item.id, item.tick)" :icon="['far', 'check-circle']" />
          <span class="title">
            <b>
              <strike>{{ item.title }}</strike>
            </b>
          </span>
          <font-awesome-icon @click="setId(item.id, true)" icon="trash" class="delete" />
          <hr />
        </div>
      </div>
    </div>
    <div class="filter">
      <center>
        <b-button-group>
          <b-button @click="changeFilter('all')" variant="outline-primary">All</b-button>
          <b-button @click="changeFilter('completed')" variant="outline-secondary">Completed</b-button>
          <b-button @click="changeFilter('uncompleted')" variant="outline-success">Uncompleted</b-button>
        </b-button-group>
      </center>
    </div>
    <b-modal
      ref="modalDelete"
      v-model="deleteModal"
      title="Delete to-do"
      @hidden="setId('', false)"
      @ok="handleDeleteTodo"
    >
      <p>Do you want to delete this to-do?</p>
    </b-modal>
    <b-modal
      v-model="anounModal"
      title="Delete to-do"
      @hidden="anounModal=false"
      @ok="anounModal=false"
    >
      <p>{{ anounStatus }}</p>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      filter: "all",
      id: "",
      deleteModal: false,
      anounModal: false
    };
  },
  computed: {
    ...mapState("todoModule", ["listTodo", "deleteSuccess"]),

    listTodoFilter() {
      if (this.filter === "all") return this.listTodo;
      else if (this.filter === "completed")
        return this.listTodo.filter(item => item.tick);
      else if (this.filter === "uncompleted")
        return this.listTodo.filter(item => !item.tick);
    },

    anounStatus() {
      return this.deleteSuccess
        ? "Delete this to-do successsfully"
        : "A problem happened. Please try again";
    }
  },

  methods: {
    ...mapActions("todoModule", ["updateTodo", "deleteTodo", "getTodoById"]),

    ...mapMutations("todoModule", ["SET_TODO"]),

    changeFilter(filter) {
      this.filter = filter;
    },

    tickTodo(id, tick) {
      const todoChange = tick
        ? {
            id: id,
            tick: !tick,
            doneDate: null
          }
        : {
            id: id,
            tick: !tick,
            doneDate: moment().format("YYYY/MM/DD")
          };
      // console.log(todo);
      this.updateTodo(todoChange);
    },

    setId(id, deleteModal) {
      this.id = id;
      this.deleteModal = deleteModal;
    },

    handleDeleteTodo() {
      this.deleteTodo(this.id);
      this.setId("", false);
      this.anounModal = true;
      this.SET_TODO({});
    }
  }
};
</script>
