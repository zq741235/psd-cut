

var tplpath = './template/normal/' ; //模板路径
var cfg = {

	'prefix' :'np',//代码前缀
	'imgFile' :'./tree.psd', //要切的图片，可以这里设置  或者 node index.js **.psd
	'tpl' :{
		'css' : tplpath + 'style.txt', //样式模板，可自定义
		'html' : tplpath + 'html.txt' //HTML模板，可自定义
	},
	
	'outpath' : './build/' //文件输出位置

}  

module.exports =  cfg ;