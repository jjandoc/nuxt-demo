<template>
  <section class="team">
    <h1>Front-Enders</h1>
    <team-list :members="members"></team-list>
    <div class="team-actions">
      <button @click="sortBy('firstName')" class="button--grey">Sort by First Name</button>
      <button @click="sortBy('lastName')" class="button--grey">Sort by Last Name</button>
      <button @click="sortBy('office')" class="button--grey">Sort by Office</button>
      <button @click="sortBy('index')" class="button--grey">Sort by Awesomeness</button>
    </div>
  </section>
</template>

<script>
import TeamList from '~/components/TeamList';

export default {
  components: {TeamList},
  fetch({store}) {
    if (!store.state.members.length) {
      return store.dispatch('FETCH_MEMBERS');
    }
  },
  data() {
    return {
      sort: 'index',
      order: 'asc',
    };
  },
  computed: {
    members() {
      return this.$store.getters.getSortedMembers(this.sort, this.order);
    },
  },
  methods: {
    sortBy: function(param) {
      if (this.sort === param) {
        this.toggleOrder();
      } else {
        this.sort = param;
        this.order = 'asc';
      }
    },
    toggleOrder: function() {
      this.order = this.order === 'asc' ? 'desc' : 'asc';
    },
  },
};
</script>

<style lang="scss">
.team-actions {
  margin-top: 20px;

  .button--grey:first-of-type {
    margin-left: 0;
  }
}
</style>
