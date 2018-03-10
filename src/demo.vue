<template>
	<div class="cl-div">
		<div class="center">checklist demo</div>
		<div>
			<input type="text" placeholder="请选择考场" @focus="openChecklist">
		</div>
		<checklist :max="2"></checklist>
	</div>
</template>
<script type="text/javascript">
	  import checklist from './checklist.vue'
	  export default {
	    components: {
	      checklist
	    },
	    openChecklist(){
	    	this.$refs['checklist'].show()
	    }
	  }
</script>
<style scoped>
	.center{
		text-align: center;
		font-size: 18px;
	}
</style>