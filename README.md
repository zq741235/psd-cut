
# psd-cut




## 使用说明

psd-cut 并不是完全自动化，它会把PSD图层一个个切出来，因为我们要切的东西也许不在一个图层上面，需要手动合并一些图层，然后命名（如果你需要直接生成`CSS`和`html`的话）.

接下来试试吧：

##安装依赖包 
	npm install
## example 

	node index.js 




## 配置说明

    //cfg.js
    
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
    

