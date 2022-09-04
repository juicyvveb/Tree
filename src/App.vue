<template>
  <h3>list</h3>
    <ul class="list">
      <Item :model="item" :parentNum="`${i+1}`" v-for="(item,i) in tree" :key="i"/>
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
      name: ''
    },
    {
      name: '',
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

<style lang="scss" scoped>
@import './assets/scss/main.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}



.list{
  padding: 0;
  width: 100%;
  background:$bg;
  transition: all .3s ease-in-out;
}
.list-move{
  transition: all .3s ease-in-out;
}


</style>
