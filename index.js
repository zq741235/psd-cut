 var PSD = require('psd');
 var fs = require('fs');
 var Mustache = require('mustache'); 

var gulp = require('gulp');
var sass = require('gulp-sass');//为了编译sass, 不需要的话可以不引


 var config = require('./cfg');
 var _util = {
     deleteFolderRecursive: function(path) {
         var _this = this;
         if (fs.existsSync(path)) {
             fs.readdirSync(path).forEach(function(file, index) {
                 var curPath = path + '/' + file;
                 if (fs.lstatSync(curPath).isDirectory()) { // recurse
                     _this.deleteFolderRecursive(curPath);
                 } else { // delete file
                     fs.unlinkSync(curPath);
                 }
             });
             fs.rmdirSync(path);
         }
     },
     buildJSON: function(list) {
         return {
             "block-list": list
         }
     },
     stringObj: function(obj, seprator) {
         var strs = [],
             result;
         for (var key in obj) {
             strs.push(key + ':' + obj[key]);
         }
         result = strs.join(seprator);
         return result + seprator;
     }

 }

 var file = process.argv[2] || config.imgFile;


 var cssList = [],

     prefix = config.prefix,

     cssTPL = fs.readFileSync(config.tpl.css).toString(),

     htmlTPL = fs.readFileSync(config.tpl.html).toString(),

     outpath = config.outpath;

  fs.existsSync(outpath) || fs.mkdirSync(outpath);

 cutPSD();

 function cutPSD() {
     var start = new Date();
     console.log(file)

     //var filterReg = new RegExp("[^A-z]");

     var pathName = file.slice(0, -4);

     var path = outpath + pathName;
     var imgPath = path;


     //文件系统创建 file system creation
     fs.existsSync(path) && _util.deleteFolderRecursive(path);
     fs.existsSync(path) || fs.mkdirSync(path);
     fs.existsSync(imgPath) || fs.mkdirSync(imgPath);

     PSD.open(file).then(function(psd) {

         psd.tree().descendants().forEach(function(node, i) {
             if (node.isGroup()) {
                 return true;
             }
             if (node.visible()) {

                 cssList.push({
                     "prefix": prefix,
                     "name": node.get("name"),
                     "top": node.get("top"),
                     "left": node.get("left"),
                     "width": node.get("width"),
                     "height": node.get("height")
                 });


                 node.saveAsPng(imgPath + "/" + prefix + '-' + node.name + ".png").catch(function(err) {
                     console.log(err.stack);
                 });

             }
         });

     }).then(function() {

         var blockJSON = _util.buildJSON(cssList.reverse());


         fs.writeFile(path + '/block.scss', Mustache.render(cssTPL, blockJSON) ,(err) => {
           if (err) throw err; 
            console.log('样式生成完毕！' + ((new Date()) - start) + "ms");

            gulp.src(path + '/block.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(path));

         });
        


         fs.writeFileSync(path + '/block.html', Mustache.render(htmlTPL, blockJSON));

         console.log('页面生成完毕！' + ((new Date()) - start) + "ms");

         console.log("Finished in " + ((new Date()) - start) + "ms");
     }).catch(function(err) {
         console.log(err.stack);
     });
 }