const clientOneToManySample = '../data/ClientOneToManySample/';
const sgOneToManySample = '../data/SgOneToManySample/';
const clientOneToOneMatchingSampleData = '../data/ClientOneToOneMatchingSampleData/';
const sgOneToOneMatchingSampleData = '../data/SgOneToOneMatchingSampleData/';
const fs = require('fs');
const LineByLineReader = require('line-by-line');
const path = require('path');
const matchingModel = require( "../models/matching.model" );

const dirs = [

  { company:'client' , path:clientOneToManySample},
  { company:'sg' , path:sgOneToManySample},
  { company:'client' , path:clientOneToOneMatchingSampleData},
  { company:'sg' , path:sgOneToOneMatchingSampleData}
];


const readDirectory = (dir) =>{
  fs.readdir(dir.path, (err, files) => {
    files.forEach(file => {
      readData(file,dir.path,dir.company);
    });
  });
}

const readData = (file,dir,company) =>{
  let  filePath = path.join(__dirname, `${dir}${file}`);
  let  record = {};
  let  firstline = true;

  lr = new LineByLineReader(filePath);

  lr.on('error', function (err) {
    // 'err' contains error object
  });

  lr.on('line', function (line) {

    lr.pause();
    if(firstline){
      firstline=false
      lr.resume();
    }else if (line.includes('-}')){
      lr.resume();
    }else{
      let temp = line.substring(1);
      let keyIndex = temp.search(':');
      let key = line.substring(0,keyIndex+1);
      let value = line.substring(keyIndex+2);
      record[key]=value;
      lr.resume();
    }

  });

  lr.on('end', function () {
    // All lines are read, file is closed now.
    record.company=company;
    let dataRecord = new matchingModel(record);

    dataRecord.save( (err, data) => {
      if (err) return console.error(err);
      console.log(dataRecord[':20'] + " saved to swiftData collection.");
    });
  });
};

dirs.forEach((dir) =>{
  readDirectory(dir);
})
