const matchingModel = require( "../models/matching.model" );
const fs = require('fs');
let distinctContractData = [];
let distinctValueData = [];
let distinctExchangeRate = [];
let count =0;
const getDistinctContractData =()=>{
          matchingModel
              .distinct( ":30T" )
              .exec( ( err, data ) => {
                  if( data ) {
                    distinctContractData = data;
                    getDistinctValueData();
                  }else {
                     console.log(err);
                  }
              } );
}

const getDistinctValueData =()=>{
          matchingModel
              .distinct( ":30V" )
              .exec( ( err, data ) => {
                  if( data ) {
                    distinctValueData = data;
                    //getDistinctExchangeRate();
                    processMetaData(distinctContractData,distinctValueData)
                  }else {
                     console.log(err);
                  }
              } );
}

const getDistinctExchangeRate =()=>{
          matchingModel
              .distinct( ":36" )
              .exec( ( err, data ) => {
                  if( data ) {
                    distinctExchangeRate = data;
                    console.log(distinctContractData);
                    console.log(distinctValueData);
                    console.log(distinctExchangeRate);
                     processMetaData(distinctContractData,distinctValueData)
                    //getData(distinctContractData[0],distinctValueData[0],distinctExchangeRate[0]);
                  }else {
                     console.log(err);
                  }
              } );
}

const processMetaData = (distinctContractData,distinctValueData) =>{
  distinctContractData.forEach(contractDate =>{
    distinctValueData.forEach(valueDate=>{
        getData(contractDate ,valueDate);
    })
  })
}
let call=0;
const getData = (contractDate ,valueDate) =>{
  matchingModel
      .find({":30T":contractDate , ":30V":valueDate} )
      .exec( ( err, data ) => {
          if( data ) {
            if (data.length>0) {
              performCalculation1(data);
            }else{
              console.log(`no data ${call++}`);
            }
          }else {
             console.log(err);
          }
      } );
}
const performCalculation1 = (data) =>{
  let uniqueRates =  [...new Set(data.map(item => item[':36']))];
  uniqueRates.forEach(value=>{
      let tempData = data.filter(obj=>obj[':36']===value);
      performCalculation(tempData);
  })
}
const performCalculation = (data) =>{

let sg = data.filter(sgValue=>sgValue.company === 'sg');
let client = data.filter(clientValue=>clientValue.company === 'client');
// console.log(sg);
// console.log(client);

  //one to many && one to one
  sg.forEach((value,index)=>{
    let split=value[":32B"].split(" ");
    let sgCurrency = split[0];
    let sgAmount = parseFloat(split[1]);
    let clientArray = [];
    //console.log('sg '+sgCurrency);
    for (let i = 0; i < client.length; i++) {
    let clientCurrency = client[i][":33B"].split(" ")[0];
    if (client[i]["status"]) {
      break;
    }
    if (clientCurrency===sgCurrency) {
      clientArray.push(i);
      //console.log('client '+clientCurrency);
    }
  }
    // console.log('+---+');
    // console.log(sgAmount);
    // console.log(clientArray);
    // console.log(client[0][":33B"]);
    // console.log(client[1][":33B"]);
    // console.log(client[2][":33B"]);
    // console.log('-----');
    let clientAmount = 0;
    let oneToOne = false;
    let oneToMany = false;
    for (let i = 0; i < clientArray.length; i++) {
      //console.log(client[i][":33B"]);

      let tempClientAmount = parseFloat(client[clientArray[i]][":33B"].split(" ")[1]);

      if(tempClientAmount===sgAmount){
        console.log("matched one to one  ");
        oneToOne=true;
        console.log(sgAmount);
        console.log(tempClientAmount);
        //upated status in client , sg array
        sg[index].status='matched';
        sg[index].matchRef=client[clientArray[i]][':20'];
        client[clientArray[i]].status='matched';
        client[clientArray[i]].matchRef=sg[index][':20'];
        break;
      }

      if(clientAmount===sgAmount){
        console.log("matched - clientArray- partial ");
        oneToMany=true;
        console.log(sgAmount);
        console.log(clientAmount);
        //upated status in client , sg array
        sg[index].status='matched';
        sg[index].matchRef=client[clientArray[i]][':20'];
        for (var j = i; j >=0; j--) {
          client[clientArray[j]].status='matched';
          client[clientArray[i]].matchRef=sg[index][':20'];
        }
        break;
      }
      clientAmount = clientAmount+ tempClientAmount;
    }

    if(clientAmount===sgAmount && (!oneToOne || !oneToMany)){
      console.log("matched - clientArray - full");
      console.log(sgAmount);
      console.log(clientAmount);
      sg[index].status='matched';
      sg[index].matchRef=client[clientArray[0]][':20'];
        for (let i = 0; i < clientArray.length; i++) {
          client[clientArray[i]].status='matched';
          client[clientArray[i]].matchRef=sg[index][':20'];
        }
    }
  })


//many to one && one to one
  client.forEach((value,index)=>{
    let split=value[":33B"].split(" ");
    let clientCurrency = split[0];
    let clientAmount = parseFloat(split[1]);
    let sgArray = [];
    //console.log('sg '+sgCurrency);
    for (let i = 0; i < sg.length; i++) {
    let sgCurrency = sg[i][":32B"].split(" ")[0];
    if (sg[i]["status"]) {
      break;
    }
    if (clientCurrency===sgCurrency) {
      sgArray.push(i);
      //console.log('client '+clientCurrency);
    }
  }
    // console.log('+---+');
    // console.log(sgAmount);
    // console.log(clientArray);
    // console.log(client[0][":33B"]);
    // console.log(client[1][":33B"]);
    // console.log(client[2][":33B"]);
    // console.log('-----');
    let sgAmount = 0;
    let oneToOne = false;
    let oneToMany = false;
    for (let i = 0; i < sgArray.length; i++) {
      //console.log(client[i][":33B"]);

      let tempSgAmount = parseFloat(sg[sgArray[i]][":32B"].split(" ")[1]);

      if(tempSgAmount===clientAmount){
        console.log("matched one to one  ");
        oneToOne=true;
        console.log(clientAmount);
        console.log(tempSgAmount);
        //upated status in client , sg array
        client[index].status='matched';
        client[index].matchRef=sg[sgArray[i]][':20'];
        sg[sgArray[i]].status='matched';
        sg[sgArray[i]].matchRef=client[index][':20'];
        break;
      }

      if(sgAmount===clientAmount){
        console.log("matched - clientArray- partial ");
        oneToMany=true;
        console.log(sgAmount);
        console.log(clientAmount);
        //upated status in client , sg array
        client[index].status='matched';
        client[index].matchRef=sg[sgArray[i]][':20'];
        for (var j = i; j >=0; j--) {
          sg[sgArray[j]].status='matched';
          sg[sgArray[i]].matchRef=client[index][':20'];
        }
        break;
      }
      sgAmount = sgAmount+ tempSgAmount;
    }

    if(sgAmount===clientAmount && (!oneToOne || !oneToMany)){
      console.log("matched - clientArray - full");
      console.log(sgAmount);
      console.log(clientAmount);
      client[index].status='matched';
      client[index].matchRef=sg[sgArray[i]][':20'];
        for (let i = 0; i < clientArray.length; i++) {
          sg[sgArray[i]].status='matched';
          sg[sgArray[i]].matchRef=client[index][':20'];
        }
    }
  })
let fullData= sg.concat(client);
  for (var i = 0; i < fullData.length; i++) {

    if (!fullData[i].status) {
      fullData[i].status='notMatched';
    }
    matchingModel
      .findOneAndUpdate({"_id":fullData[i]["_id"]}, fullData[i], {new: true}, (err,doc)=>{
        if (err) {
        console.log("update error - matched -update");
        }

       console.log(`done ${count++}`);
      })
  }
}
getDistinctContractData();
