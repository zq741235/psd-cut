

var tplpath = './template/normal/' ; //模板路径
var cfg = {

	'prefix' :'tree',//代码前缀
	'nameType' : 'index',//图层名称， np-0,np-1...可选值 index|layer(图层名称),
	'imgFile' :'./tree.psd', //要切的图片，可以这里设置  或者 node index.js **.psd

	'tpl' :{
		'css' : tplpath + 'style.txt', //样式模板，可自定义
		'html' : tplpath + 'html.txt' //HTML模板，可自定义
	},
	
	'outpath' : './build/' //文件输出位置

}  

module.exports =  cfg ;