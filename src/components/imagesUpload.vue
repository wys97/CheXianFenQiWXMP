<template>
    <div>	
		<!--<div id="picture" class="mui-popover mui-popover-action mui-popover-bottom" style="left: 0;z-index: 11113; ">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell" style="padding: 18px 15px;">
					<label for="img-upload-camera" style="position: relative;display: inline-block; width: 100%;height: 100%;">
						<a href="#">拍照</a>
					</label>
				</li>
				<li class="mui-table-view-cell" style="padding: 0;background-color: #fff;">
					<label for="img-upload-camera" style="position: relative; display: inherit; width: 100%;height: 100%;padding: 18px 0;background-color: red;">
						相册
					</label>
				</li>
			</ul>
			<ul class="mui-table-view" style="background-color: #fff;">
				<li class="mui-table-view-cell" style="padding: 15px 15px;">
					<a href="#picture"><b>取消</b></a>
				</li>
			</ul>
		</div>-->
		<!--<input type="file" style="display: none;" id="img-upload" multiple accept="image/*" capture="camera" @change="uploadImg($event)"/>-->
		<input type="file" style="visibility: hidden;" :id="imgId" multiple accept="image/*" :capture="camera" @change="uploadImg($event)"/>			
    </div>
</template>
<script>
	import { $resError,$subError } from '@/utils/muiAlert'
	export default{
        name:"image-html5-upload",
        data () {
		    	return {
		    		camera:'', 
		      		imgSrc:'',
		      		someData:[],
		      		imgArr:[]
		    	}
		  	},
        props:{
            imgNumLimit:{//一次最多可以上传多少张照片
                type:Number,
                default:1
            },
            imgId:{
            	type:String,
            	dafault:'add'
            }
        },
        mounted: function() { //挂载结束状态
        	var u = navigator.userAgent;
		    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		    if(isAndroid){
		    	this.camera = 'camera'
		    }else{
		    	this.camera = null
		    }
		},
        methods:{
            uploadImg: function(e){ 
                let tag = e.target;
                let fileList = tag.files;
                let imgNum = fileList.length;
                let _this = this;
                _this.imgArr = [];//图片数据清零
                if(this.imgArr.length + imgNum > this.imgNumLimit){
//                 	alert('一次最多上传'+this.imgNumLimit+'张图片！');
                   	mui.alert('一次最多上传'+_this.imgNumLimit+'张图片！', function() {
					});
                    return;
                }
                var Orientation;
                for(let i=0;i<imgNum;i++){
                    EXIF.getData(fileList[i], function(){
                        Orientation = EXIF.getTag(fileList[i], 'Orientation');
                    });
                    let reader = new FileReader();
                    reader.readAsDataURL(fileList[i]);
                    reader.onload = function(){
                        var oReader = new FileReader();
                        oReader.onload = function(e) {
                            var image = new Image();
                            image.src = e.target.result;
                            image.onload = function() {
                                var expectWidth = this.naturalWidth;
                                var expectHeight = this.naturalHeight;
                                if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
                                    expectWidth = 800;
                                    expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
                                } else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
                                    expectHeight = 1200;
                                    expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
                                }
                                var canvas = document.createElement("canvas");
                                var ctx = canvas.getContext("2d");
                                canvas.width = expectWidth;
                                canvas.height = expectHeight;
                                ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
                                var base64 = null;
                                //修复ios上传图片的时候 被旋转的问题
                                if(Orientation != "" && Orientation != 1){
                                    switch(Orientation){
                                        case 6://需要顺时针（向左）90度旋转
                                            _this.rotateImg(this,'left',canvas);
                                            break;
                                        case 8://需要逆时针（向右）90度旋转
                                            _this.rotateImg(this,'right',canvas);
                                            break;
                                        case 3://需要180度旋转
                                            _this.rotateImg(this,'right',canvas);//转两次
                                            _this.rotateImg(this,'right',canvas);
                                            break;
                                    }
                                }
                                base64 = canvas.toDataURL("image/jpeg", 1);
                                /*if(fileList[i].size / 1024000  > 1){
                                     _this.imgScale(base64, 4)
                                }else{
                                    
                                }*/
//                              _this.imgArr.push({"src": base64});
//                              _this.imgSrc = _this.imgArr[0].src;
//                              _this.someData.length = 0;
//                              _this.someData.push({'url':_this.imgArr[i].src});//64位的图
                                
                				_this.$emit('child-say',[fileList[i],base64,_this.imgId]);
                				_this.changeShow();
                            };
                        };
                        oReader.readAsDataURL(fileList[i]);
                    }
                }
            },
            imgScale: function(imgUrl,quality){
                let img = new Image();
                let _this = this;
                let canvas = document.createElement('canvas');
                let cxt = canvas.getContext('2d');
                img.src = imgUrl;
                img.onload = function(){
                    //缩放后图片的宽高
                    let width = img.naturalWidth/quality;
                    let height = img.naturalHeight/quality;
                    canvas.width = width;
                    canvas.height = height;
                    cxt.drawImage(this, 0, 0, width, height);
                    _this.imgArr.push({"src": canvas.toDataURL('image/jpeg')});
                    _this.imgSrc = _this.imgArr[0].src;
                    _this.someData.length = 0;
                    _this.someData.push({'url':_this.imgArr[0].src}) ;//64位的图片
                    _this.$emit('child-say',fileList[0]);
                    _this.changeShow();
                }
            },
            rotateImg:function (img, direction,canvas) {//图片旋转
                var min_step = 0;
                var max_step = 3;
                if (img == null)return;
                var height = img.height;
                var width = img.width;
                var step = 2;
                if (step == null) {
                    step = min_step;
                }
                if (direction == 'right') {
                    step++;
                    step > max_step && (step = min_step);
                } else {
                    step--;
                    step < min_step && (step = max_step);
                }
                var degree = step * 90 * Math.PI / 180;
                var ctx = canvas.getContext('2d');
                switch (step) {
                    case 0:
                        canvas.width = width;
                        canvas.height = height;
                        ctx.drawImage(img, 0, 0);
                        break;
                    case 1:
                        canvas.width = height;
                        canvas.height = width;
                        ctx.rotate(degree);
                        ctx.drawImage(img, 0, -height);
                        break;
                    case 2:
                        canvas.width = width;
                        canvas.height = height;
                        ctx.rotate(degree);
                        ctx.drawImage(img, -width, -height);
                        break;
                    case 3:
                        canvas.width = height;
                        canvas.height = width;
                        ctx.rotate(degree);
                        ctx.drawImage(img, -width, 0);
                        break;
                }
            },
            changeShow:function(){
            	/*var oDiv = document.getElementsByClassName("mui-backdrop-action")[0];  
                var opicture = document.getElementById("picture");  
				oDiv.parentNode.removeChild(oDiv);
				opicture.style.display="none";*/
            }
        }
    }
</script>
<style scoped>
	.img_box{
		position: relative;
		height: 1rem;
		width: 1.2rem;
		line-height: 1rem;
		text-align: center;
		border: 1px dashed #cdcdcd;
		border-radius: .1rem;
		overflow: hidden;
	}
	.s_img{
		position: absolute;
		z-index: 2;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-repeat: no-repeat;
		background-size:100% 100% ;
		
	}
	.img_box i{
		position: absolute;
		z-index: 1;
		top: 50%;
		transform: translateX(-50%) translateY(-50%);
		-webkit-transform: translateX(-50%) translateY(-50%);
		font-weight: 900;
		font-size: .9rem;
		color: #cdcdcd;
		align-content: center;
	}
	.img_box img{
		width: 100%;
	}
</style>
