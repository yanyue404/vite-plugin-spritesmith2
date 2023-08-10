<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Hello Vue 3 + Vite" />
    <h2>templateFunction option icons</h2>

    <ul>
      <li class="i-icon-ic-buy"></li>
      <li class="i-icon-ic-data"></li>
      <li class="i-icon-ic-payment"></li>
      <li class="i-icon-ic-safe"></li>
      <li class="i-icon-ic-search"></li>
      <li class="i-icon-ic-transition"></li>
    </ul>
    <h2>retina option icons</h2>
    <ul class="icon">
      <li class="ic-buy"></li>
      <li class="ic-data"></li>
      <li class="ic-payment"></li>
      <li class="ic-safe"></li>
      <li class="ic-search"></li>
      <li class="ic-transition"></li>
    </ul>
    <ul class="icon-retina">
      <li class="ic-buy"></li>
      <li class="ic-data"></li>
      <li class="ic-payment"></li>
      <li class="ic-safe"></li>
      <li class="ic-search"></li>
      <li class="ic-transition"></li>
    </ul>
  </div>
</template>

<script setup>
import HelloWorld from './components/HelloWorld.vue';

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style lang="scss">
@import './sprite/style/sprite.scss';
@import './sprite/style/sprite_normal.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.icon {
  @include sprites($spritesheet-sprites);
}
.icon-retina {
  @include retina-sprites($retina-groups);
}
</style>
