<template>
  <div class="member-profile">
    <h1>Ahoy! My name is {{ firstName }} {{ lastName }}</h1>
    <p> I am a "{{ title }}" in the {{ office }} office.</p>
  </div>
</template>

<script>
export default {
  props: ['firstName', 'lastName', 'title', 'office'],
};
</script>

<style>

</style>
