<template>
  <div class="thems">
    <div class="thems-item" v-for="(them,i) in themsArr" :key="i"  >
      <input 
        type="radio"
        :id="them"
        :value="them"
        v-model="select"    
      >
      <label :for="them" >{{them}}</label>
    </div>
  </div>
  
</template>

<script>
export default {
  data(){
    return {
      thems: 'rhythm frigid peace marinette',
      select: '',
      utils: {
        rhythm: {
          name: 'rhythm',
          bgColor: '#85a2cc',
          nodeColor: '#fdf98d',
          subColor: '#fdffea',
          delColor: '#e94b2c',
          addColor: '#d3eafa'
        }
      }
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