 <!-- eslint-disable  -->
<template>
    <div class="cl-checklist" >
		<div class="checklist" :class="{'show': isOpen}">
      		<div class="topbar">
		      	<span class="cancel" @click="hide">取消</span>
		      	<span class="title">选择考场</span>
		      	<span class="confirm" @click="onConfirm">确定</span>
	      	</div>
	      	<div class="desc">你已选中<span>{{checkboxValue.length}}</span>个，最多可选<span>{{max}}</span>个</div>
		    <div class="list" ref = 'list'>
		      <!-- <div class="line-wrapper" data-val='1'>
			    <label for="1" class="line border-1px">
		          <div class="l">
		            <div class="title">科目二第07考点马路</div>
		            <div class="address">上海市宝山区保安公路2009号</div>
		          </div>
		          <div class="r"></div>
			    </label>
		        	<input type="checkbox" id="1" v-model="checkboxValue" @click="selectedItem($event)" style="display:none" value="1">
		    </div> -->

		    <div v-for="(item, index) in dataList" class="line-wrapper"  :data-val="item.label + '|' + item.value + '|'+  item.address">
		       <label :for="index" class="line border-1px">
		          <div class="l">
		             	<div class="title">{{item.label}}</div>
		             	<div class="address" v-if="item.address">{{item.address}}</div>
		           </div>
		           <div class="r"></div>
		       </label>
		       <input type="checkbox" :id="index" @click="selectedItem($event)"
		             v-model="checkboxValue" style="display:none" :value="item.label + '|' + item.value + '|'+  item.address" >
		    </div>
	      	<!-- <div class="line-wrapper" data-val='2'>
	        	<label for="2" class="line border-1px ">
	          	<div class="l">
		            <div class="title">科目二第07考点马路</div>
		            <div class="address">上海市宝山区保安公路2009号</div>
	          	</div>
	          	<div class="r"></div>
	        	</label>
	        	<input type="checkbox" id="2" v-model="checkboxValue" @click="selectedItem($event)" style="display:none" value="2">
	      	</div>
	      	<div class="line-wrapper" data-val='3'>
		        <label for="3" class="line border-1px">
		          <div class="l">
		            <div class="title">科目二第07考点马路</div>
		            <div class="address">上海市宝山区保安公路2009号</div>
		          </div>
		          <div class="r"></div>
		        </label>
	        	<input type="checkbox" id="3" v-model="checkboxValue" @click="selectedItem($event)" style="display:none" value="3">
      		</div> -->
			</div>
		</div>
		<!-- 蒙层 -->
		<div class="checklist-overlay"  v-if="isOpen" ></div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			checkboxValue: [],
			isOpen: false
		}
	},
	methods: {
		selectedItem(event) {
			const labelNode = event.target.previousElementSibling
			const classList = labelNode.classList
			classList.contains('selected') ? classList.remove('selected') : classList.add('selected')
		},
		show() {
			// 阻止手机虚拟键盘弹起
			document.activeElement.blur()
			this.isOpen = true
		},
		hide() {
			this.isOpen = false
		},
		onConfirm() {
			this.isOpen = false
			const checkboxValue = this.checkboxValue
			const res = []
			for(let i = 0; i<checkboxValue.length; i++) {
				const resObj = {}
				const item = checkboxValue[i].split('|')
				resObj.label = item[0]
				resObj.value = item[1]
				resObj.address = item[2]
				res.push(resObj)
			}
			// 数组对象res作为 on-change 事件的返回值参数
			this.$emit('on-change', res)
		}
	},
	  props: {
	    max: {type: Number,
	          default: 0
	        },
	    dataList: {
	    	type: Array,
	    	require: true
	    }
	  },
	  watch: {
		   checkboxValue (val) {
		       console.log(val)
		      const listDom = this.$refs['list']
		      const lines = listDom.querySelectorAll('.line-wrapper')
		      if (val.length === this.max) {
		        let item = null
		        for (let i = 0; i < lines.length; i++) {
		          item =lines[i]
					console.log(lines[i].dataset.val)
		          if (val.indexOf(lines[i].dataset.val) === -1) {
		            item.children[0].classList.add('disabled')
		            item.querySelector('input[type="checkbox"]').setAttribute('disabled', 'disabled')
		          }
		      }
		   } else {
		        let item = null
		        for (let i = 0; i <lines.length; i++) {
		          item =lines[i]
		          if (item.children[0].classList.contains('disabled')) {
		            item.children[0].classList.remove('disabled')
		            item.querySelector('input[type="checkbox"]').removeAttribute('disabled')
		          }
		        }
		      }
		   }
		}
 	}
</script>

<style scoped>
	.topbar {
		height: 30px;
		background-color: #d0000e;
		display: -webkit-flex;
		display: flex;
		justify-content: space-around;
		align-items: center;
		font-size: 16px;
		padding: 0 13px;
		border-bottom: 1px solid rgb(217,217,217)
	}

	.topbar .cancel {
		color: rgb(159,159,159);
	}

	.topbar .confirm {
			color: rgb(46,166,242);
		}
	.desc {
		padding: 10px 15px 0 0 ;
		font-size: 14px;
		text-align: right;
		color: #fff;
		background-color: #0d2e44;
	}

	.checklist {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 2000;
		width: 100%;
		background-color: #fff;
		-webkit-transition: all .5s;
	    transition: all .5s;
	    -webkit-transform: translateY(100%);
	    transform: translateY(100%);
	}
	.cl-checklist {
		overflow: hidden;
		
	}



	.checklist.show{
	    -webkit-transform: translateY(0%);
	    transform: translateY(0%);
	}

	.list {
		/*height: 300px;*/
		max-height: 300px;
		font-size: 14px;
		padding: 10px 13px;
		overflow-y: auto;
    -webkit-overflow-scrolling: touch; 
    overflow-scrolling: touch;
		/*background-color: #00b4ff;*/
	}

	.list .line {
		display: -webkit-flex;
		display: flex;
		justify-content: center;
		align-items: center;
		/*height: 50px;*/
		/*background-color:  #4caf50;*/
	}

	.list .line .l {
		display: -webkit-flex;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		width: 90%;
		/*background-color: #d0000e;*/
	}

	.list .line .l .address {
		color: rgb(159,159,159);
		position: relative;
		padding-left: 15px;
	}

	.list .line .l .address::before {
		content: '';
		display: inline-block;
		position: absolute;
		width: 15px;
		height: 15px;
		top: 2px;
		left: 0;
		background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAbCAYAAAB836/YAAABu0lEQVRIiaXUzU8TQRjH8U9fpAkXIZqItHghxEgietuD/gP84R420QSDcCDxIq6KaCoJYCuaeJhdu93OlILfpEnnmWd++7zMM63d3V0RuljHQ9xFr7SP8QNfUOBPlmUzB5tsYBtLkb0eHpS/JzjEcd2hs7W1Vf1v4TkeoxMLu0EHa0VRLBdFcTIYDEC75vCsjO6mbGCnWlSCg1uKVTzK83xAqGFHqFmMX3iP7+X6HjbF67ud5/nnLvomXaxziVcY1WxDfMQLLDf8e+i3sZaIbq8hVjHC28SZtTZWIhs/TdKM8S3xsZW2eLrjOWIVMcFeO2Ik1Kc1R6xltoYI1+Y8Yl8Sxi7Funinz9s4SRzaEa/vKp4mzpx0hSHfjGzewUt8EpoA98voUuUoujgT7tdqxKEl3NN+QqDOMMuys6opRwscuI4jJrP8VYjytgxLjanX5uA/BA+qh7YuOBQadFOKLMv+Zde82Ae4uoHYlUZmTcGx8KwvymGWZVNjGhu9DzhdQOy09J0iNct75qd+VfrMkBIcYX+O4L74a5MUJHT8OGI/Nuc2zBOEd7iorS9KW5LrBH/jjZDeCK9LW5K/QatiGcsSFOsAAAAASUVORK5CYII=");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: 0;

	}



	.list .line .r {
		width: 20px;
		height: 20px;
		/*background-color: #0d2e44;*/
		margin: 0 5px;
		-webkit-border-radius: 50%;
		border-radius: 50%;
		border: 1px solid #9e9e9e;
		/*background-color: #fff;*/
		position: relative;
		z-index: 0;
	}

	.list .line.selected .l .title {
		color: #1799fa;
	} 

	.list .line.selected .r {
		border: 1px solid #1799fa;
		background-color: #1799fa;
	} 

	.list .line.selected .r::before {
		content: "";
		position: absolute;
		top: 4px;
		left: 4px;
		width: 12px;
		height: 12px;
		background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAPCAYAAAALWoRrAAAA90lEQVQ4ja3TMSuFURgH8GeQRGIwy6BkUbIYlHwBu0Umi8VkMVlMJoMvIcNdDAYlJuULWCSESBSLwc9we/P2eu715t6nznKe//Or0zknEF1YS3jAHRa7Aa7iy0/ddAquVUC47ARcT8APLPwX3PC73jGPCPRiGSvoqwFuJuAb5opMoFFqnmCwDbiVgK+YLecCn5XQGYYScDsBXzBTzQb2k/A5hkvBnSTzhOnsRIEBHCdDFxjBbtJ7xFQGFmigH0fJ8HOyd4/JVmAZDc2bP0yQct1ioh1YRYvn1cg0XGP8LzBDC/igAl5hrA7YCg30YE/zl5xitC6I+AYJmBaJbbKurAAAAABJRU5ErkJggg==");
	    background-repeat: no-repeat;
	    background-size: contain;
	    background-position: center center;
		z-index: 1

	}

	.list .line.disabled .l .title{
    	color: #9e9e9e;
	}
	.list .line.disabled .r{
	    border: 1px solid #9e9e9e;
	    background-color: #9e9e9e;
	}

	/*适配一像素边框*/
	.border-1px {
		position: relative;
	}

	.border-1px::after {
	position: absolute;
	display: block;
	left: 0;
	bottom: 0;
	width: 100%;
	border-bottom: 1px solid rgb(217,217,217);
	content: '';
	}

	@media (-webkit-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5) {
		.border-1px::after {
		-webkit-transform: scaleY(0.7);
		transform: scaleY(0.7);
		}
	}

	@media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2) {
   		 .border-1px::after {
     	 -webkit-transform: scaleY(0.5);
     	 transform: scaleY(0.5);
    	}
	}

	.checklist-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1000;
		background-color: rgba(0, 0, 0, .5);
		transition: all .5s;
	}



</style>