<template>
    <div class="home">
        <img class="home__img" src="../assets/logo.png">
        <span class="home__title">ZAPLANUJ|PRZYJEDŹ|ZWIEDZAJ</span>
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
    flex-flow: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    &__img {
        max-width: 360px;
    }

    &__title {
        font: $h3;
        text-align: center;
        color: $grey;
    }
}
</style>
