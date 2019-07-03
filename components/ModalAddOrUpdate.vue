<template>
  <div>
    <center>
      <b-button @click="$emit('open-modal', true)">Add new</b-button>
    </center>
    <b-modal v-model="openModal" title="title">
      <!-- <form @submit.stop.prevent="handleSubmit">
      <b-form-group
        ref="titleForm"
        :state="titleState"
        label-cols-md="2"
        label="Tilte"
        label-for="title"
        invalid-feedback="Title is required"
      >
        <b-form-input id="title" v-model="title" :state="titleState" required></b-form-input>
      </b-form-group>

      <b-form-group
        ref="bodyForm"
        :state="bodyState"
        label-cols-md="2"
        label="Body"
        label-for="body"
        invalid-feedback="Body is required"
      >
        <b-form-input id="body" v-model="body" :state="bodyState" required></b-form-input>
      </b-form-group>

      <b-form-group
        ref="startDateForm"
        :state="startDateState"
        label-cols-md="2"
        label="Start: "
        label-for="startDate"
        invalid-feedback="Start date is invalid"
      >
        <date-picker
          id="startDate"
          v-model="startDate"
          :state="startDateState"
          required
          :config="{format: 'MM/DD/YYYY'}"
        ></date-picker>
      </b-form-group>
      <b-form-group
        ref="endDateForm"
        :state="endDateState"
        label-cols-md="2"
        label="End: "
        label-for="endDate"
        invalid-feedback="End date is invalid"
      >
        <date-picker
          id="endDate"
          v-model="endDate"
          :state="endDateState"
          required
          :config="{format: 'MM/DD/YYYY'}"
        ></date-picker>
      </b-form-group>
      </form>-->
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    openModal: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "Add new to-do"
    }
  },

  data: () => {
    return {};
  },

  methods: {
    // setOpenModal(value) {
    //   this.openModal = value;
    // }
  }
};
</script>

