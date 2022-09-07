<template>
    <h3>Tree View</h3>
    <ul :class="{list: 1, 'list__open': open}" >
      <Item :model="item" 
      @click="open = !open"
      :parentNum="`${i+1}`" v-for="(item,i) in tree" :key="i"
      :style="selectedThem || {}"/>
    </ul>
    <div class="info">
      <div class="info-item">
        <span :style="{color: style?.addColor}"><span>*</span> double click - </span>
        <p :style="{color: style?.subColor}">change the type of list-item. A common item will become a Node, and a node will be a common item</p>
      </div>
    </div>
    <Them @changeThem="select"/>
    <h4>{{selectedThem || 'nothing'}}</h4>
</template>

<script>
import Item from './components/TreeItem.vue';
import Them from './components/Them.vue';

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
      open: false,
      selectedThem: '',
    }
  },
  components: {
    Item,
    Them
  },
  methods: {
    select(val){
      this.selectedThem = val
    }
  },
  computed: {
    style(){
      return this.selectedThem
    }
  },
  watch: {
    selectedThem(nw){
      if(nw?.bgColor){
        document.body.style.backgroundColor = nw.bgColor;
        return
      }
      document.body.setAttribute('style', '');
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
  padding: 30px;
}

.info {
  margin-top: 10%;
  &-item{
    span {
      @include text(15px, 500, gray);
      font-style: italic;
      span{
        @include text(20px, 500, $green);
      }
    }
    p{
      @include text(15px, 500, black);
      display: inline;
    }
  }
}





</style>
