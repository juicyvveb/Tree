<template>
    <h3 class="title" :style="{color: style?.addColor}">Tree View</h3>
    <Them @changeThem="select"/>
    <div class="info">
      <div class="info-item">
        <span :style="{color: style?.addColor}"><span>*</span> double click - </span>
        <p :style="{color: style?.subColor}">change the type of list-item. A common item will become a Node, and a node will be a common item</p>
      </div>
    </div>
    <ul class="list" >
      <Item 
        :model="item" 
        :parentNum="`${i+1}`" v-for="(item,i) in tree" :key="i"
        :style="selectedThem || {}"
        class="item__first"
      />
    </ul>
    
</template>

<script>
import Item from './components/TreeItem.vue';
import Them from './components/Them.vue';
import {tree} from './assets/js/utils';


export default {
  name: 'App',
  data(){
    return {
      tree,
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
  position: relative;
  .title {
    text-align: center;
    text-transform: uppercase;
  }
  .list{
    margin-top: auto;
  }
  .info {
  margin-top: 10%;
  &-item{
    span, p {
      @include text(15px, 500, gray);
      font-style: italic;
      span{
        @include text(20px, 500, $green);
      }
    }
      p{
        color: black;
        font-style: normal;
        display: inline;
      }
    }
  }
}

body{
  background: $bg;
  margin: 0;
  padding: 30px;
}

@media (min-width: $desktop) {
  #app {
  .list{
    width: 50%;
    margin: auto;
    overflow: hidden;
  }

  .info {
  margin-top: 3%;
  text-align: center;
  
    &-item{
        text-align: center;
      }
    }
  }

  body {
    text-align:center;
    padding: 30px 15%;
  }
}





</style>
