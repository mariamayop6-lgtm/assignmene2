//1
//const path =require('node:path');
//let x="/home/user/project/index.js"
//const filename=path.basename(x);
//const dirname=path.dirname(x);
//console.log(filename);
//console.log(dirname);



//2
//const path =require('node:path');
//function getFileName(filepath){
  //   return path.basename(filepath);
//}
//const result1=getFileName('/user/files/report.pdf');
//console.log(result1);



///3
//const path =require ("node:path")
  //   function creatmypath(pathObj){
    //      return path.format (pathObj);
     //}
     //const myObj={dir:"/foldr",name:"app",ext:".js"};
     //const result2=creatmypath(myObj);
     //console.log(result2);



////4
//const path =require("node:path");
//function getextension(fileN){
  //   return path.extname(fileN);
//}
//const result3=getextension("/docs/readme.md");
//console.log(result3);



/////5
//const path=require("node:path");
//function parsespath(parseN){
 //    return path.parse(parseN);
//}
//const result4 =parsespath("/home/app/main.js");
//console.log(result4);



//////6
//const path =require("node:path");
//function checkpath(checkN){
  // return path.isAbsolute(checkN);
//}
//const result5=checkpath("/home/user/file.txt");
//console.log(result5);



///////7
//const path=require("node:path");
//function segpath(joinN){
  // return path.join(joinN);
//}
//console.log(segpath("/src"+ "/components"+ "/app.js"));



////////8
//const path=require("node:path");
//let name =("/home/user/project/src/index.js")
//function getthe(__basename,__filename){
  //   return path.resolve(__basename,__filename);
//}
//console.log(getthe(name,"index.js"));



/////////9
//const path=require("node:path");

//function towpath(path1,path2){
  // return path.join(path1,path2);
//}
//console.log(towpath("/folder1","folder2/file.txt"));



//////////10
//const fs = require("node:fs");
//const path = require("node:path");
//const delet="/path/to/file.txt";
//function deleteasync(delet) {
  //  fs.unlink(delet, (err) => {
    //    err && console.log(err);});

      //      console.error("an error occurred while deleting", err.message);
        //    return;
        //}
       // console.log(`the file ${path.basename(delet)} is deleted.`);



//deleteasync("./file.txt");

///////////////11

//const fs = require("node:fs");

//function createDirSync(dirPath) {
  //  if (!fs.existsSync(dirPath)) {
    //    fs.mkdirSync(dirPath);
      //  console.log(`Directory '${dirPath}' created successfully.`);
//} else {
  //      console.log(`Directory '${dirPath}' already exists.`);
    //}
//}
//createDirSync("./myFolder");

///////////12
//const fs = require("node:fs");

//function writeAsync(filePath, content) {
  //  fs.writeFile(filePath, content, "utf8", (err) => {
    //    if (err) {
      //      console.error("Error writing file:", err.message);
        //    return;
        //}
        //console.log("File saved successfully.");
    //});
//}

//writeAsync("./output.txt", "Hello World");

/////////////13

//const fs = require("node:fs");

//function appendAsync(filePath, content) {
  //  fs.appendFile(filePath, content, "utf8", (err) => {
    //    if (err) {
      //      console.error("Error appending to file:", err.message);
        //    return;
        //}
        //console.log("Content appended successfully.");
    //});
//}

//appendAsync("./output.txt", "\nAppended text content.");

/////////////////////////14

//const fs = require("node:fs");

//function checkExists(targetPath) {
  //  return fs.existsSync(targetPath);
//}

//console.log(checkExists("./output.txt")); // true / false

/////////////////////15
//const fs = require("node:fs");

//function readDirAsync(dirPath) {
  //  fs.readdir(dirPath, (err, files) => {
    //    if (err) {
      //      console.error("Error reading directory:", err.message);
        //    return;
        //}
        //console.log("Files in directory:", files);
    //});
//}

//readDirAsync(".");

////////////////////////16
//const fs = require("node:fs");

//function renameSync(oldPath, newPath) {
  //  try {
    //    fs.renameSync(oldPath, newPath);
      //  console.log("File renamed successfully.");
    //} catch (err) {
      //  console.error("Error renaming file:", err.message);
    //}
//}

//renameSync("./output.txt", "./renamed_output.txt");

///////////////////////////17

//const fs = require("node:fs");

//function readInChunks(filePath) {
  //  const readableStream = fs.createReadStream(filePath, { encoding: "utf8" });

    //readableStream.on("data", (chunk) => {
      //  console.log("--- New Chunk Received ---");
        //console.log(chunk);
    //});

    //readableStream.on("error", (err) => {
      //  console.error("Error reading stream:", err.message);
    //});
//}

//readInChunks("./big.txt");

////////////////////////18

//const fs = require("node:fs");

//function copyFileUsingStreams(source, dest) {
  //  const readStream = fs.createReadStream(source);
    //const writeStream = fs.createWriteStream(dest);

    //readStream.pipe(writeStream);

    //writeStream.on("finish", () => {
      //  console.log("File copied using streams");
    //});

    //readStream.on("error", (err) => console.error("Read Error:", err.message));
    //writeStream.on("error", (err) => console.error("Write Error:", err.message));
//}

//copyFileUsingStreams("./source.txt", "./dest.txt");

//////////////////////////////19

//const fs = require("node:fs");
//const zlib = require("node:zlib");
//const { pipeline } = require("node:stream");

//function compressFile(source, dest) {
  //  const readStream = fs.createReadStream(source);
    //const gzipStream = zlib.createGzip();
    //const writeStream = fs.createWriteStream(dest);

    //pipeline(readStream, gzipStream, writeStream, (err) => {
     //   if (err) {
      //      console.error("Pipeline failed:", err.message);
        //} else {
          //  console.log("File compressed successfully");
        //}
    //});
//}

//compressFile("./data.txt", "./data.txt.gz");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////