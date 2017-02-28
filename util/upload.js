'use strict';

const fs = require('fs');
const path = require('path');

const postFile = (fileKeyValue, req, data) => {
  let boundaryKey = Math.random().toString(16);
  let enddata = '\r\n----' + boundaryKey + '--';

  let files = new Array();
  for (let i = 0; i < fileKeyValue.length; i++) {
   let content = "\r\n----" + boundaryKey + "\r\n" + "Content-Type: application/octet-stream\r\n" + "Content-Disposition: form-data; name=\"" + fileKeyValue[i].urlKey + "\"; filename=\"" + path.basename(fileKeyValue[i].urlValue) + "\"\r\n" + "Content-Transfer-Encoding: binary\r\n\r\n";
   let contentBinary = new Buffer(content, 'utf-8');//当编码为ascii时，中文会乱码。
   files.push({contentBinary: contentBinary, filePath: fileKeyValue[i].urlValue});
  } 
  let contentLength = 0;
  for (let i = 0; i < files.length; i++) {
   let stat = fs.statSync(files[i].filePath);
   contentLength += files[i].contentBinary.length;
   contentLength += stat.size;
  }
  
  let fileValueContent = [];
  if(data){
    for(let i in data){
      let _filekey  = "\r\n----" + boundaryKey + "\r\n" + "Content-Disposition: form-data; name=\""+i+"\" \r\n\r\n"  
              + data[i];  
      let _fileBinary = new Buffer(_filekey, 'utf-8');  
      fileValueContent.push(_fileBinary);  
      contentLength += _fileBinary.length;  
    }
  }

  req.setHeader('Content-Type', 'multipart/form-data; boundary=--' + boundaryKey);
  req.setHeader('Content-Length', contentLength + Buffer.byteLength(enddata));  
  for(let i =0;i<fileValueContent.length;i++){  
    req.write(fileValueContent[i]);  
  } 
  // 将参数发出
  let fileindex = 0;
  let doOneFile = function(){
   req.write(files[fileindex].contentBinary);
   let fileStream = fs.createReadStream(files[fileindex].filePath, {bufferSize : 4 * 1024});
   fileStream.pipe(req, {end: false});
   fileStream.on('end', function() {
     fileindex++;
     if(fileindex == files.length){      
      req.end(enddata);
     } else {
      doOneFile();
     }
   });
  };
  if(fileindex == files.length){
    req.end(enddata);
  } else {
    doOneFile();
  }      
}

module.exports = {
	postFile
}