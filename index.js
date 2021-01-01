const glob = require('glob');

const dirname="../../IF AIRPORTS57D91B4C-B772-493D-8F1B-22699D0CA6DD"
glob(dirname + '/**/*.dat', {}, (err, files)=>{
  console.log(files)
})

