<template>
  <h3>list</h3>
    <ul>
  <!-- <TransitionGroup name="item"> -->
    <Item :model="item" :parentNum="i+1" v-for="(item,i) in tree" :key="i"/>
  <!-- </TransitionGroup> -->
  </ul>
</template>

<script>
import Item from './components/TreeItem.vue';

const tree = [{
  name: 'hdvd dvead',
  children: [
    {
      name: 'head_1_1'
    },
    {
      name: 'head_1_2'
    },
    {
      name: 'head_1_3',
      children: [
        {
          name: 'head_1_3_1'
        },
        {
          name: 'head_1_3_2'
        },
        {
          name: 'head_1_3_3',
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
          name: 'head_1_3_3',
          children: [
            {
              name: 'sub_1_1'
            },
            {
              name: 'sub_1_1'
            },
            {
              name: 'sub_1_1'
            },
            {
              name: 'sub_1_1'
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
      tree
    }
  },
  components: {
    Item
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}



</style>
