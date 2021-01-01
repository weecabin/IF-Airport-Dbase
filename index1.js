const glob = require('glob');
const readline = require('readline');
const fs = require('fs');
​

//const dirname="../../IF AIRPORTS57D91B4C-B772-493D-8F1B-22699D0CA6DD/src";//"/Zimbabwe/FV76";

let myRunwayDbase =
[{
  icao:"test",
  rwy:10,
  lat:32.1,
  lon:-117
}];

myRunwayDbase.push({icao:"test",rwy:28,lat:32.2,lon:-117.1})

console.log(JSON.stringify(myRunwayDbase,null,1))
myRunwayDbase.push({icao:"test2",rwy:27,lat:32.2,lon:-117.1})


glob(dirname + '/**/*.dat', {}, (err, files)=>
{
  console.log(files)
  /*
  for (i=0;i<files.length;i++)
  {
    let myInterface = readline.createInterface(
    {
      input: fs.createReadStream(files[1])
    });

    var finished=false;
    while(!finished)
    {
      myInterface.on('line', function (line) 
      {
        let split = line.split(" ");
        console.log(split);
      })
      .on('close', function(line) 
      {
         finished=true;
      });
    }
  }*/
})
