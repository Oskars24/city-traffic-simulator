<template>
  <div class="home">
    <img class="home--img" src="../assets/logo.png">
  </div>
</template>

<script>

export default {
  name: 'home',
}
</script>

<style lang="scss" scoped>
.home {
    display: flex;
    justify-content: center;
    width: 100%;

    &--img {
      max-width: 100%;
    }
}
</style>
