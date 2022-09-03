<template>
    <Transition name="fade">
    <li v-show="del" >
      <h3 
        @click="clickListen()"
        :class="{list: isList, open: isOpen}"
        >{{parentNum}} {{core.name}} <span class="marker" v-if="isList">[{{isOpen?'-':'+'}}]</span>
        </h3>
        <button class="del" @click="$emit('remove'), del = false">x</button>
        <Transition name="listTr">
        <ul  v-show="isOpen && isList">
        <!-- <TransitionGroup tag="ul" class="block" name="item" v-show="isOpen && isList"> -->
          <TreeItem v-for="(child, i) in model.children"
          :key="child"
          :parentNum="`${parentNum}.${i+1}`" 
          :model="child"
          @remove="remove(i)"
          
          />
        <li @click="this.form = true">add item</li>
        </ul>
        <!-- </TransitionGroup> -->
      </Transition>
      <Form v-if="form" @createStuff="createStuff" @close="form = false"/>
    </li>
  </Transition>
</template>

<script>
import Form from './Form.vue';
import remove from '../assets/js/remove';
export default {
  name: 'TreeItem',
  props: {
    model: Object,
    parentNum: Number,
  },
  data(){
    return {
      del: true,
      isOpen: false,
      core: this.model,
      click1: 0,
      click2: 0,
      form: false,
      removing: false
    }
  },
  computed:{
    isList(){
      return this.model.children 
    },
    
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
      new Promise(res => {
        this.removing = true;
        res(i)
      })
      .then(() => {
        remove('.removing')
        this.core.children.splice(i, 1)
      })
    }
  },
  components: {
    Form
  }
}
</script>

<style lang="scss"  scoped>
  @import '../assets/scss/main.scss';
* {
  text-align: left;
}
  h3.list{
    
    width: fit-content;
    color: blue;
    position: relative;
    text-transform: uppercase;
  }

  h3{
    display: inline-block;
    margin-right: 10%;
    margin-bottom: 5%;
    .marker{
      @include text(20px, 700, rgb(76, 191, 27));
    }
  }

  .del{
    display: inline;
  }

  // .fade-move,
// .fade-enter-from,
// .fade-leave-to{
//   transform: translateX(20px);
//   opacity: 0;
// }

// .fade-enter-active,
// .fade-leave-active{
//   transition: all .3s ease-in-out;
//   // position: absolute;
// }
// .listTr-enter-from,
// .listTr-leave-to{
//   transform: translateX(-50px);
//   opacity: 0;
// }


// .listTr-enter-active,
// .listTr-leave-active{
//   transition: all .2s ease-in-out;
// }
.block {
  position: relative;
}
.item-move {
  transition: all .8s ease;
}
.item-enter-active,
.item-leave-active{
  position: absolute;
}

.item-enter-from {
  transform: translate(-50px);
}
.item-leave-to{
  transform: translateX(50px);
}

</style>