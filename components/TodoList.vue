<template>
  <div>
    <div>
      <div v-for="item in listTodo" :key="item.id" :item="item" style="margin-left: 1em">
        <div v-if="!item.tick">
          <font-awesome-icon :icon="['far', 'circle']" />
          <span class="title">
            <b>{{ item.title }}</b>
          </span>
          <font-awesome-icon icon="trash" class="delete" />
          <hr />
        </div>
      </div>
    </div>

    <div>
      <div v-for="item in listTodo" :key="item.id" :item="item" style="margin-left: 1em">
        <div v-if="item.tick" style="color: grey">
          <font-awesome-icon :icon="['far', 'check-circle']" />
          <span class="title">
            <b>
              <strike>{{ item.title }}</strike>
            </b>
          </span>
          <font-awesome-icon icon="trash" class="delete" />
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
  </div>
</template>


<script>
export default {
  props: {
    listTodo: {
      type: Array,
      default: []
    }
  },

  data() {
    return {
      filter: "all"
    };
  },

  methods: {
    changeFilter(filter) {
      this.filter = filter;
    },

    setId(id) {
      this.$parent.id = id;
    }
  }
};
</script>
