<template>
  <div>
    <team-member v-bind="member"></team-member>
    <a :href="`mailto:${member.email}`" class="button--green">Send me an email!</a>
    <nuxt-link to="/team" class="button--grey">Back to Team</nuxt-link>
  </div>
</template>

<script>
import TeamMember from '~/components/TeamMember';

export default {
  components: {TeamMember},
  asyncData({params, payload, store}) {
    if (payload) {
      return {member: payload};
    } else {
      if (!store.getters.getMemberById(params.id)) {
        return store.dispatch('FETCH_MEMBERS').then(() => {
          return {
            member: store.getters.getMemberById(params.id),
          };
        });
      }
    }
    return {
      member: store.getters.getMemberById(params.id),
    };
  },
};
</script>

<style>

</style>
