<template>
  <li>
    <h3 
      @click="clickListen()"
      :class="{list: isList, open: isOpen}"
      >{{core.name}} 
      </h3>
      <button class="del" @click="$emit('remove')">x</button>
    <ul v-show="isOpen && isList">
      <TreeItem v-for="(child, i) in model.children"
       :key="child" :model="child"
       @remove="remove(i)"/>
      <li @click="this.form = true">add item</li>
    </ul>
    <Form v-if="form" @createStuff="createStuff" @close="form = false"/>
  </li>

  <!-- <button @click="clickListen">click</button> -->
  <!-- <p>{{click2 - click1}}</p> -->
</template>

<script>
import Form from './Form.vue';

export default {
  name: 'TreeItem',
  props: {
    model: Object
  },
  data(){
    return {
      isOpen: false,
      core: this.model,
      click1: 0,
      click2: 0,
      form: false,
    }
  },
  computed:{
    isList(){
      return this.model.children 
    }
  },
  methods: {
    createStuff(name){
      if(!this.isList){
        return
      }else{
        this.core.children.push({name});
        this.form = false;
      }
    },
    changeType(){
      if(!this.isList){
        this.core.children = [];
        this.isOpen = this.form = false;
        console.log('change')
      }else{
        this.core.children = null
      }
    },
    clickListen(){
      if(!this.click1){
        this.click1 = new Date().getTime();
        setTimeout(() => {
          if(!this.click2){
            this.isOpen = !this.isOpen
            console.log('open');
            this.click1 = 0;
          }
        }, 200)
      }
      else{
        this.click2 = new Date().getTime();
        if(this.click2 - this.click1 < 250){
          this.changeType();
        }
        this.click1 = this.click2 = 0;
      }
    },
    remove(i){
      console.log(i)
      this.core.children.splice(i, 1)
    }
  },
  components: {
    Form
  }
}
</script>

<style lang="scss"  scoped>
* {
  text-align: left;
}
  h3.list{
    
    width: fit-content;
    color: blue;
    position: relative;
    text-transform: uppercase;
    &:after{
      content: '^';
      color: black;
      position: absolute;
      width: 10%;
      right: -10%;
      transition: all .3s ease-in-out;
    }
  }
  h3.list.open{
    &:after{
      transform: scale(1, -1);
    }
  }


  h3{
    display: inline-block;
    margin-right: 10%;
    margin-bottom: 5%;
    span {
      color: gray;
      font-size: 10px;
      text-decoration: underline;
    }
  }

  .del{
    display: inline;
  }
</style>