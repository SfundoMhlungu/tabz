#!/usr/bin/env node

/**
 * tabz
 * cli for tabz-js
 *
 * @author Sfundo Mhlungu <https://github.com/SfundoMhlungu>
 */

// const init = require('./utils/init');
import init from "./utils/init.js";
// const cli = require('./utils/cli');
import cli from "./utils/cli.js";
// const log = require('./utils/log');
import log from "./utils/log.js"
// const compiler = require("petal-js");
import {lexer, parser} from "petal-compiler";
import path from "path";
import fs from "fs";
// console.log(lexer, parser)

const input = cli.input;
const flags = cli.flags;
const { clear, debug, build, bin } = flags;

let all = []
let initial = true

async function readALL(dir){
    let files = []
    
    
    const items = fs.readdirSync(dir, {withFileTypes: true});
    
    for(const item of items){
       if(item.isDirectory()){
          files = [...files, ...await readALL(`${dir}/${item.name}`)]
       }else{
         files.push(`${dir}/${item.name}`)
       }
    
 
 
    }
  return files
}


async function ParseAll(files){
  let parsed = {}
  
  files.forEach(f => {
       
       let fil = fs.readFileSync(f, {encoding:'utf8', flag:'r'})
       // let parentDir = path.basename(path.dirname(f))
       // let fileName = path.basename(f).split(".")[0]
       let n = path.basename(path.dirname(f)) + "_" + path.basename(f).split(".")[0]
       
       // console.dir(fil, {depth: null})
        const l = new lexer(n, fil, debug)
        const lex = l.lex() 
        
        parsed[n] = parser(lex, n)
  })
  
  return parsed

}


(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);
  if(build === ""){
     log("build flag cannot be empty, please pass -b and a path to a file or folder")
     return
  }
  


 // all = [build]
 let allFiles = await readALL(build);
  
  ParseAll(allFiles).then(p => {
          fs.writeFileSync(bin + "/bundled.js",`const bundled_views = ${JSON.stringify(p, null, 2)}`,'utf-8', (err) => console.log(err))
  
  
  })
  
  // allFiles.forEach(file => {
  
  // })  
  
  
	debug && log(flags);
})();
