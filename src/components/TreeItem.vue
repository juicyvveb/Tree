<template>
    <li v-show="display" :class="{item:1, 'item__open': isOpen}">

      <div class="item-head">

        <h3 
        @click="clickListen()"
        :class="{'item-title__list': isList, 'item-title': 1}"
        :style="{color: isList ? style?.nodeColor : style?.subColor}"
        >
          {{parentNum}} {{isList ? model.name || 'Node' : model.name || 'item'}}
        </h3>

        <button :class="{'item-button': 1, 'item-button__open': isOpen, 'item-button__marker': 1}"  v-if="isList">
          <span></span>
        </button>
        
        <button 
          class="item-button item-button__del" 
          @click="$emit('remove'), display = false">
          <span :style="{backgroundColor: style?.delColor}"></span>
        </button>
      </div>
        <Transition name="appear">
          <ul v-show="isOpen && isList" class='item-list'>
            <TransitionGroup  name="list">
              <TreeItem v-for="(child, i) in model.children"
                :key="child"
                :parentNum="`${parentNum}.${i+1}`" 
                :model="child"
                @remove="remove(i)"
                :style="style"
              />
              <li @click="this.form = true" :key="1" class="item-adding" :style="{color: style?.addColor}">add item to {{parentNum}}</li>
            </TransitionGroup> 
          </ul>  
        </Transition>
      <Form v-if="form" @createStuff="createStuff" @close="form = false"/>
    </li>
</template>

<script>
import Form from './Form.vue';

export default {
  name: 'TreeItem',
  props: {
    model: Object,
    parentNum: String,
    style: Object,
  },
  data(){
    return {
      display: true,
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
    &__first{
      & > .item-head > .item-button__del{
        display: none;
      }
    }
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
        height: 16%;
        background: $red;
        transform: rotate(45deg);
        position: absolute;
        border-radius: 5px;
        &:before{
          content: '';
          width: 100%;
          height: 100%;
          position: absolute;
          top:0;
          // left: 0;
          transform: rotate(-90deg);
          background: inherit;
          border-radius: inherit;
        }
      }
      &__marker{
        margin-left: 5px;
        span{
          width:50%;
          position: relative;
          transform: translateX(-25%) rotate(45deg);
          transition: all .3s ease-in-out;
          background: black;
          &:before{
            top: 100%;
            left: 0;
            transform-origin: 105% 0% 0;
            transform: rotate(90deg);
            transition: all .3s ease-in-out;
          }
        }
      }
      &__open {
        span {
          transform: rotate(0);
          &:before{
            transform-origin: -20% 0% 0;
            transform: rotate(0);
            top: 0;
          }
        }
      }
    }
    &-list{
      width: 100%;
    }
    &-adding{
      @include text(15px, 700, $green);
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
  transform: translateY(-50px);
}

</style>