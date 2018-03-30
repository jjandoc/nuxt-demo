<template>
  <transition-group tag="ul" name="member-list">
    <li v-for="item in members" :key="item.id">
      <nuxt-link :to="{name: 'team-id', params: {id: item.id}}">
        {{ item.firstName }} {{ item.lastName }}, {{ item.title }}, {{ item.office }}
      </nuxt-link>
    </li>
  </transition-group>
</template>

<script>
export default {
  props: ['members'],
};
</script>

<style>
.member-list-move {
  transition: transform .5s ease-out;
}
</style>
