<template>
  <div class="thems">
    <div class="thems-item" v-for="(them,i) in themsArr" :key="i"  >
      <input 
        type="radio"
        :id="them"
        :value="them"
        v-model="select"    
      >
      <label 
        :for="them"
        :class="{label: 1, 'label__active': select == them}"
        :style="{backgroundColor: utils[them]?.bgColor}"><span>{{them}}</span></label>
    </div>
  </div>
  
</template>

<script>
import {themes} from '../assets/js/utils';

export default {
  data(){
    return {
      thems: 'rhythm frigid peace marinette',
      select: '',
      utils: themes
    }
  },
  watch: {
    select(nw){
      this.$emit('changeThem', this.utils[nw])
    }
  },
  computed: {
    themsArr(){
      return this.thems.split(' ');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';

.thems {
  @include flexCenter;
  justify-content: flex-end;
  &-item{
    margin-left: 5%;
    input{
      display: none;
    }
    .label {
      &__active{
        &:before{
          transform: translateY(-40%);
          box-shadow: 0px 0px 5px 3px;
        }
      }
      &:before {
        content: '';
        display: block;
        width: 30px;
        height: 30px;
        border: 1px solid black;
        background-color: inherit;
        transition: all .3s ease-in-out;
      }
      span {
        display: none;
      }
    }
  }
}
</style>