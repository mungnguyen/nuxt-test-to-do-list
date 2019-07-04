<template>
  <div>
    <center>
      <b-button pill variant="primary" @click="changeOpenModal(true)">Add new</b-button>
    </center>
    <b-modal
      ref="modal"
      v-model="openModalValue"
      :title="title"
      @show="resetModal"
      @hidden="reset"
      @ok="handleOk"
    >
      <form @submit.stop.prevent="handleSubmit">
        <b-form-group
          ref="titleForm"
          :state="todoChange.titleState"
          label-cols-md="2"
          label="Tilte"
          label-for="title"
          invalid-feedback="Title is required"
        >
          <b-form-input
            id="title"
            v-model="todoChange.title"
            :state="todoChange.titleState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          ref="bodyForm"
          :state="todoChange.bodyState"
          label-cols-md="2"
          label="Body"
          label-for="body"
          invalid-feedback="Body is required"
        >
          <b-form-input id="body" v-model="todoChange.body" :state="todoChange.bodyState" required></b-form-input>
        </b-form-group>

        <b-form-group
          ref="startDateForm"
          :state="todoChange.startDateState"
          label-cols-md="2"
          label="Start: "
          label-for="startDate"
          invalid-feedback="Start date is invalid"
        >
          <date-picker
            id="startDate"
            v-model="todoChange.startDate"
            :state="todoChange.startDateState"
            required
            :config="{format: 'MM/DD/YYYY'}"
          ></date-picker>
        </b-form-group>
        <b-form-group
          ref="endDateForm"
          :state="todoChange.endDateState"
          label-cols-md="2"
          label="End: "
          label-for="endDate"
          invalid-feedback="End date is invalid"
        >
          <date-picker
            id="endDate"
            v-model="todoChange.endDate"
            :state="todoChange.endDateState"
            required
            :config="{format: 'MM/DD/YYYY'}"
          ></date-picker>
        </b-form-group>
      </form>
    </b-modal>

    <b-modal
      v-model="anounModal"
      title="Update to-do"
      @hidden="closeAnounModal"
      @ok="closeAnounModal"
    >
      <p>{{ anounStatus }}</p>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";

export default {
  props: {
    openModal: {
      type: Boolean,
      default: false
    },
    update: {
      type: Boolean,
      default: false
    }
  },

  data: function() {
    return {
      todoChange: {
        id: "",
        title: "",
        titleState: null,
        body: "",
        bodyState: null,
        startDate: "",
        startDateState: null,
        endDate: "",
        endDateState: null
      },
      anounModal: false
    };
  },

  computed: {
    ...mapState("todoModule", ["todo", "updateSuccess"]),

    title() {
      const title = this.update ? "Update to-do" : "Add new to-do";
      return title;
    },

    openModalValue: {
      // return this.openModal;
      get() {
        return this.openModal;
      },
      set(value) {
        this.$emit("update:openModal", value);
      }
    },

    anounStatus() {
      return this.updateSuccess
        ? "Update this to-do successfully"
        : "A problem happened. Please try again";
    }
  },

  methods: {
    ...mapActions("todoModule", ["addTodo", "updateTodo"]),
    //Open Modal
    changeOpenModal(value) {
      this.$parent.setOpenModal(value);
    },

    //Reset modal
    resetModal() {
      if (this.update) {
        this.todoChange = {
          ...this.todoChange,
          ...this.todo,
          ...{
            startDate: moment(this.todo.startDate),
            endDate: moment(this.todo.endDate)
          }
        };
      } else {
        this.todoChange = {
          id: "",
          title: "",
          titleState: "",
          body: "",
          bodyState: "",
          startDate: null,
          startDateState: "",
          endDate: null,
          endDateState: ""
        };
      }
    },

    reset() {
      this.todoChange = {
        id: "",
        title: "",
        titleState: "",
        body: "",
        bodyState: "",
        startDate: null,
        startDateState: "",
        endDate: null,
        endDateState: ""
      };
      this.$parent.setOpenModal(false);
      this.$parent.setUpdate(false);
    },

    //Check form validate
    checkFormValidity() {
      //Title != {}
      const validTitle = this.todoChange.title.length > 0 ? true : false;
      this.todoChange.titleState = validTitle ? "valid" : "invalid";

      //Body != {}
      const validBody = this.todoChange.body.length > 0 ? true : false;
      this.todoChange.bodyState = validBody ? "valid" : "invalid";

      //Start != {}, End > Start && End > Now
      ////Format date
      // const end = moment(this.todoChange.endDate).format("YYYY-MM-DD");
      // const start = moment(this.todoChange.startDate).format("YYYY-MM-DD");
      const now = moment().format("YYYY-MM-DD");

      ////Check start date valid
      const validStart = this.todoChange.startDate ? true : false;
      this.todoChange.startDateState = validStart ? "valid" : "invalid";

      ////Check end date valid
      const validDate =
        !this.todoChange.endDate ||
        moment(this.todoChange.endDate).isBefore(now) ||
        moment(this.todoChange.endDate).isBefore(this.todoChange.startDate)
          ? false
          : true;
      this.todoChange.endDateState = validDate ? "valid" : "invalid";

      return validTitle && validBody && validDate && validStart;
    },

    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
      // this.reset();
      if (this.update) {
        this.anounModal = true;
      }
      // this.$parent.setUpdate(false);
    },

    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // format date in todoChange
      this.todoChange = {
        ...this.todoChange,
        ...{
          startDate: moment(this.todoChange.startDate).format("YYYY/MM/DD"),
          endDate: moment(this.todoChange.endDate).format("YYYY/MM/DD")
        }
      };

      //Update or Add new to-do
      if (this.update) {
        this.updateTodo(this.todoChange);
      } else {
        this.addTodo(this.todoChange);
      }
      // Hide the modal manually
      this.$nextTick(() => {
        this.$refs.modal.hide();
      });
    },

    closeAnounModal() {
      this.anounModal = false;
      this.$parent.setUpdate(false);
    }
  }
};
</script>

