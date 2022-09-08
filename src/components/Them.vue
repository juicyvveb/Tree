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
        :class="{label: 1, 'label__active': select == them, 'label__default': them=='default'}"
        :style="{backgroundColor: themes[them]?.bgColor}"><span>{{them}}</span></label>
    </div>
  </div>
  
</template>

<script>
import {themes} from '../assets/js/utils';

export default {
  data(){
    return {
      select: 'default',
      themes,
    }
  },
  watch: {
    select(nw){
      this.$emit('changeThem', themes[nw])
    }
  },
  computed: {
    themsArr(){
      return Object.keys(themes);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';

.thems {
  @include flexCenter;
  align-items: stretch;
  margin-top: 10%;
  &-item{
    margin-left: 3%;
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
      &__default{
        &:before{
          background-color: white !important;
        }
      }
      &:before {
        content: '';
        display: block;
        min-width: 5vw;
        min-height: 5vw;  
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

@media (min-width: $laptop) {
  .thems {
  
  &-item{
    
    .label { 
      &__active{
        &:before{
          transform: translateY(-20%);
        }
      }
      &:before {
        
        min-width: 3vw;
        min-height: 3vw;  
        
      }
      span {
        display: none;
      }
    }
  }
  }
}
</style>