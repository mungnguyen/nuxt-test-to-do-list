<template>
  <div style="padding: 3em">
    <div v-if="todo.id">
      <p>
        <b>Title:</b>
        {{ todo.title }}
      </p>
      <br />

      <p>
        <b>Body:</b>
        {{ todo.body }}
      </p>
      <br />
      <p>
        <b>Start:</b>
        {{ todo.startDate | formatDate }}
      </p>
      <br />

      <p>
        <b>End:</b>
        {{ todo.endDate | formatDate }}
      </p>
      <br v-if="todo.tick" />
      <p v-if="todo.tick">
        <b>Done:</b>
        {{ todo.doneDate | formatDate }}
      </p>
      <b-button @click="setUpdate(true)" pill variant="outline-primary">Update</b-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState("todoModule", ["todo"]),
  methods: {
    setUpdate(value) {
      this.$parent.setUpdate(value);
      this.$parent.setOpenModal(true);
    }
  }
};
</script>
