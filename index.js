const glob = require('glob');
const readline = require('readline');
const fs = require('fs');


let myRunwayDbase =
[{
  icao:"init",
  rwys:
  [{rwy:0,lat:0,lon:0}]
}];

/*
let initel=myRunwayDbase.filter(el=>el.icao=="init");
initel[0].rwys.push({rwy:18,lat:1,lon:1})
initel[0].rwys.push({rwy:9,lat:2,lon:3})
*/

//myAirports.filter(element=>element.icao==icao)

//console.log(JSON.stringify(myRunwayDbase,null,1))
//myRunwayDbase.push({icao:"test",rwy:28,lat:32.2,lon:-117.1})

//console.log(JSON.stringify(myRunwayDbase,null,1))
//myRunwayDbase.push({icao:"test2",rwy:27,lat:32.2,lon:-117.1})

/* multiple runway cinfig
1   4357 1 0 FVBU J M NKOMO INTL
100 45.11 2 0 0.25 0 2 0 13 -20.01623553  028.61510829    0   58 3 10 0 0 31 -20.02623202  028.63752506    0   67 2 0 0 0
100 29.87 2 0 0.25 0 0 0 02 -20.01524389  028.61815034    0    0 2 0 0 0 20 -20.00314659  028.61988006    0    0 2 0 0 0
110 1 0.00 0.0000 New Taxiway 308
*/

//const dirname="../../IF AIRPORTS57D91B4C-B772-493D-8F1B-22699D0CA6DD/src/Zimbabwe";

//const dirname="../../IF AIRPORTS57D91B4C-B772-493D-8F1B-22699D0CA6DD/src/United States";

const dirname="../../IF AIRPORTS57D91B4C-B772-493D-8F1B-22699D0CA6DD/src";

// remove "   //    " from the line below 
glob(dirname + '/**/*.dat', {}, (err, files)=>

{
  //console.log(files)
  let file;
  for(file of files)
  {
  try 
  {
    let data = fs.readFileSync(file, 'utf8');
    //console.log(data)
    let spl=data.split("\n");
    let icaostr;
    let rwynum;
    let rwylatnum;
    let rwylonnum;
    let temp;
    let finished=false;
    for (i=0;i<spl.length && !finished;i++)
    {
      //console.log(spl[i]);
      str = spl[i].replace(/ {2,}/g,' ');
      let linesplit= str.split(" ");
      //console.log(linesplit)
      switch (linesplit[0])
      {
        case "1":
        icaostr=linesplit[4];
        temp={icao:icaostr,rwys:[]}
        //console.log(linesplit)
        break;
        
        case "100":
        //console.log(linesplit)
        if (linesplit.length>=20)
        {
          temp.rwys.push({rwy: linesplit[8],lat: Number(linesplit[9]).toFixed(6),lon: Number(linesplit[10]).toFixed(6)});
          temp.rwys.push({rwy: linesplit[17],lat: Number(linesplit[18]).toFixed(6),lon: Number(linesplit[19]).toFixed(6)});
        }
        break;
        
        case "110":
        if (temp!=undefined && temp.rwys.length>0) 
        {
          //console.log(icaostr)
          myRunwayDbase.push(temp);
        }
        //if (temp.rwys.length==1)
        //  console.log(data)
        finished=true;
        break;
      }
    }
  } 
  catch (err) 
  {
    console.log("Error in: "+file)
    console.error(err)
  }
  }
  console.log("Completed")
  fs.writeFileSync("RunwayDB.json",JSON.stringify(myRunwayDbase))
})
