<template>
    <h3>Tree View</h3>
    <ul :class="{list: 1, 'list__open': open}" >
      <Item :model="item" 
      @click="open = !open"
       :parentNum="`${i+1}`" v-for="(item,i) in tree" :key="i"/>
    </ul>
</template>

<script>
import Item from './components/TreeItem.vue';

const tree = [{
  name: '',
  children: [
    {
      name: ''
    },
    {
      name: 'named'
    },
    {
      name: 'named',
      children: [
        {
          name: ''
        },
        {
          name: ''
        },
        {
          name: '',
          children: [
            {
              name: 'sub'
            },
            {
              name: 'sub'
            }
          ]
        },
        {
          name: 'named',
          children: [
            {
              name: ''
            },
            {
              name: 'named'
            },
            {
              name: ''
            },
            {
              name: 'named'
            }
          ]
        },
      ]
    }
  ]
}]

export default {
  name: 'App',
  data(){
    return {
      tree,
      open: false
    }
  },
  components: {
    Item
  },
  methods: {
    show(){
      console.log('fdf')
    }
  }
}
</script>

<style lang="scss">
@import './assets/scss/main.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  h3 {
    text-align: center;
  }
}
body{
  background: $bg;
  margin: 0;
  padding: 0;
  padding-top: 20px;
}






</style>
