<template>
  <div class="container" @click.self="$emit('close')">
    <div class="form">
      <input type="text" class="form-input" v-model="name" @click="name = ''">
      <button @click="submit()" class="form-button">add</button>
    </div>
  </div>
</template>

<script>
  //
export default {
  data(){
    return {
      name: 'new stuff'
    }
  },
  methods: {
    submit(){
      this.$emit('createStuff', this.name || 'new stuff')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss'; 
  .container{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(228, 228, 228, 0.8);
    @include flexCenter;
    z-index: 10;
    .form{
      height: 8%;
      background: yellow;
      @include flexCenter;
      flex-wrap: wrap;
      align-items: stretch;
      &-input, &-button{
        width: 100%;
        border: none;
        padding: 0;
        margin: 0;
        @include text(15px, 700, rgb(194, 193, 193))
      }
      &-input{
        font-weight: 500;
        padding-left: 5%;
      }
      &-input:focus{
        color: black;
      }
      &-button{
        color: white;
        background: rgb(69, 209, 69);
        text-align: center;
      }
    }
  }
</style>