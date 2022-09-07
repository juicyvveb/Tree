<template>
    <Transition name="fade">
    <li v-show="display" :class="{item:1, 'item__open': isOpen}">
      <div class="item-head">
        <h3 
        @click="clickListen()"
        :class="{'item-title__list': isList, 'item-title': 1}"
        >
          {{parentNum}} {{isList ? model.name || 'Node' : model.name || 'item'}}
        </h3>
        <span :class="{marker: 1, 'marker__open': isOpen}" v-if="isList"></span>
        <button 
        class="item-button item-button__del" 
        @click="$emit('remove'), display = false">
          <span></span>
        </button>
      </div>
        <Transition name="appear">
          <ul v-show="isOpen && isList" :class="{'item-list': 1}">
          <TransitionGroup  name="list" >
            <TreeItem v-for="(child, i) in model.children"
            :key="child"
            :parentNum="`${parentNum}.${i+1}`" 
            :model="child"
            @remove="remove(i)"
            />
          <li @click="this.form = true" :key="1" class="item-adding">add item to {{parentNum}}</li>
          </TransitionGroup> 
          </ul>  
        </Transition>
      <Form v-if="form" @createStuff="createStuff" @close="form = false"/>
    </li>
  </Transition>
</template>

<script>
import Form from './Form.vue';

export default {
  name: 'TreeItem',
  props: {
    model: Object,
    parentNum: String,
  },
  data(){
    return {
      display: true,
      isOpen: false,
      core: this.model,
      click1: 0,
      click2: 0,
      form: false,
      name: '',
    }
  },
  computed:{
    isList(){
      return this.model.children 
    },
    background(){
      function getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }
      return `rgba(${getRandom(1,250)}, ${getRandom(1,350)}, ${getRandom(1,350)}, 0.8)`
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
      this.core.children.splice(i, 1);
    }
  },
  components: {
    Form
  }
}
</script>

<style lang="scss"  scoped>
@import '../assets/scss/main.scss';

  .item{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 3% 0 3% 7%;
    position: relative;
    &-head{
      display: flex;
      align-items: center;
      padding: 2%;
      padding-left: 0;
      .item-title{
        width: fit-content;
        &__list{
        color: $blue;
        text-transform: uppercase;
        }
      }
      .marker{
          width: 10px;
          height: 10px;
          background: linear-gradient(to bottom left, black 50%, $bg 50%);
          display: block;
          margin-left: 20px;
          transform:rotate(-45deg);
          position: relative;
          align-self: center;
          transition: all .3 ease-in-out;
        &__open{
          transform: rotate(135deg);
        }
      }
    }
    
    &-button {
      @include flexCenter;
      width: 25px;
      height: 25px;
      margin-left: 20px;
      background: none;
      border: none;
      // border-radius: 5px;
      position: relative;
      span {
        display: block;
        // margin: auto;
        width: 80%;
        height: 15%;
        background: rgb(241, 94, 94);
        transform: rotate(45deg);
        position: absolute;
        border-radius: 5px;
        &:before{
          content: '';
          width: 100%;
          height: 100%;
          position: absolute;
          top:0;
          left: 0;
          transform: rotate(-90deg);
          background: inherit;
          border-radius: inherit;
        }
      }
    }
    &-list{
      width: 100%;
    }
    &-adding{
      @include text(15px, 700, rgb(12, 148, 30), 2.5);
    }
  }

  //height-change Transition
  .item{
    height: auto;
    max-height: 60px;
    transition: all .5s ease-in-out;
    overflow: hidden;
    &__open{
      max-height: 100%;
    }
  }
 
 

@media (min-width: $laptop){
    
}
//transition




.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from {
  transform: scale(.7);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.list-leave-active {
  position: absolute;
}


.appear-move,
.appear-enter-active,
.appear-leave-active {
  transition: all 0.5s ease;
}
.appear-enter-from,
.appear-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

</style>