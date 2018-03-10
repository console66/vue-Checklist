<template>
  <div class="cl-div">
    <div class="center">checklist demo</div>
    <div class="choose">
      <input type="text" placeholder="请选择考场" @focus = "openChecklist">
    </div>
    <!-- 添加ref="checklist",再配合下面this.$refs就能访问子组件实例了 -->
    <checklist ref="checklist" :max='2' :data-list="data" @on-change="changeKaochangValue"></checklist>
    <p v-for="(item, index) in kaochangVal">{{item.label}}</p>
  </div>
</template>
<script>
   /* eslint-disable */ 
  import checklist from '../checklist/checklist.vue'
  export default {
    components: {
      checklist
    },
    methods: {
      openChecklist() {
        this.$refs.checklist.show()
      },
      changeKaochangValue(val) {
        this.kaochangVal = val
      }
    },
    data () {
        return {

            kaochangVal: null,
            data: [{
                label: '科目二第07考点马路',
                value: '101',
                address: '上海市宝山区宝安公路2009号'
              }, {
                label: '科目二第08考点沪松公路',
                value: '102',
                address: '上海市闵行区沪松公路565弄128号'
              }, {
                label: '科目二第09考点七宝',
                value: '103',
                address: '上海市闵行区沪松公路200号'
              }, {
                label: '科目二第09考点世纪公园世纪公园',
                value: '104',
                address: ''
              }, {
                label: '科目二第09考点世纪公园',
                value: '105',
                address: '上海市浦东新区世纪大道200号'
              }, {
                label: '科目二第09考点哈哈哈哈',
                value: '107'
              }, {
                label: '科目二第09考点合川路地铁站',
                value: '106',
                address: '上海市合川路地铁站2号出口'
              }]
         }
}
  }
</script>
<style scoped>
  .center{
    text-align: center;
    font-size: 18px;
  }

  .choose {
    text-align: left;
  }
</style>