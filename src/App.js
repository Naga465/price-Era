// var fs = require("fs");
// var pdfreader = require("pdfreader");



// fs.readFile("sample.pdf", (err, pdfBuffer) => {
//   // pdfBuffer contains the file content
//   new  pdfreader.PdfReader().parseBuffer(pdfBuffer, function(err, item){
//     if (err)
//       callback(err);
//     else if (!item)
//       callback();
//     else if (item.text)
//       console.log(item.text);
//   });
// });


var Tesseract = require('tesseract.js');
var fs = require('fs');
var json2xls = require('json2xls');
const readline = require('readline');


// var filename = '1.jpg'

// Tesseract.recognize(filename)
//   .progress(function  (p) { console.log('progress', p)  })
//   .catch(err => console.error(err))
//   .then(function (result) {
//     console.log(result.text)
//     // process.exit(0)
//     fs.writeFile('temp.txt', result.text, function(err, data){
//         if (err) console.log(err);
//         console.log("Successfully Written to File.");
//     })
//         // process.exit(0)

//   })

  var i = 0;
  const rl = readline.createInterface({
    input: fs.createReadStream('temp.txt'),
    crlfDelay: Infinity
  });
   
  rl.on('line', (line) => {
    getValue(line,i);
    i = i+1;
// 
     
  });
  
  var trackPoint = ["Turbine Details"
                   ,"Nacelle ID"
                   ,"Name of Turbine & No "
                   ,"Turbine Make"
                   ,"Type of Turbine"
                   ,"Date of Commissioning"
                   ,"NAME OF THE CUSTOMER'S SITE incharge",
                   ,"Generator make and sl No",
                   ,"Gear Box Make & Sl No",
                   ,"Yaw Motor Make and Sl No"
                   ,"HYD"
                   ,"Brake system Make & Sl. No"
                   ,"Hub System Make & Sl No"
                   ,"Control Panel Sl No"
                   ,"Blade Make & Sl No"
                   ,"Transformer Make & Sl No"
                   ,"Year of Manufacturing"
                   ,"Anemometer"
                   ,"Wind Vane"
                   ,"Pull Chord"
                   ,"Vibration Switch"

                   ]
 var data = {
     table :[]
 };

  function getValue(str1){
      var str = str1.toUpperCase()
    if(str.search(":") != -1){
        let idValue = str.substring(str.search(":")+1,str.length);
        let id = str.substring(0,str.search(":")+1);
        data.table.push({key:id,value:idValue});
        // console.log(key,value);
       }

      trackPoint.map(function(element){
        // console.log("line",str);
    //    console.log(element.toUpperCase());
    
        if(str.search(element.toUpperCase()) != -1){
            
            var t = str.search(element.toUpperCase());
            data.table.push({key:element,value:str.substring(t+element.length,str.length)})

            }
     

        });

        var json = JSON.stringify(data);
        fs.writeFile('output.json',json,'utf8',function(res,err){
            if(err)
            console.log("some went wrong");
            // var xls = json2xls(json.table);
            // });

            // fs.writeFileSync('data.xlsx',xls,'binary');
        });
    
  }
//   console.log(stack);

  