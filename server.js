const express = require('express');
const app = express();


var session = require('express-session'); 

app.use(session({ secret: 'happy jungle', 
                  resave: false, 
                  saveUninitialized: false, 
                  cookie: { maxAge: 60000 }}))
                  


    
    
app.get('/', function (req, res)
{
  result = {'Songs':currentSongs};
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("<head>"
            +"<link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\""
            +"integrity=\"sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T\" crossorigin=\"anonymous\">"
            +"<script src=\"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js\""
            +"integrity=\"sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM\""
            +"crossorigin=\"anonymous\"></script>"
            +"<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js\"></script>"  
            +"<style>" 
            +"body{background-color: #2f4353;"
            +"background-image: linear-gradient(315deg, #2f4353 0%, #d2ccc4 74%)};"
            +"p{color:red;}"
            +"h1{color:green;"
            +"font-size:3vw;}");
  res.write("</style></head><body><div style=\"width: 100%; overflow: hidden;\"><div style=\"width: 600px; float: left;\">");
  // Left Side
  res.write("<h1>Session Music Array Worker   --- Jason Smith</h1>");
  //res.write("<h3>Hosted from : " + req.headers.host + "</h3>");
  res.write("<p>Use /add to add a new song to session collection.</p>");
  res.write("<p>Use /sort to sort current session  music inventory.</p>");
  res.write("<p>Use /remove to remove a song from session music inventory.</p>");
  res.write("<p>Use /clear to clear current session music inventory.</p>");
  res.write("<p>Current Tracks :</p>");
  res.write(JSON.stringify(result));
  res.write("</div><div style=\"margin-left: 620px;\">");
  // Right Side
  res.write("<div class=\"container\"<div class =\"table-responsive\">");
  res.write("<table class=\"table table-bordered table-striped\" id =\"song_table\"><tr><th>Current Inventory</th></tr></table></div></div>");
  res.write("</div></div>");
  res.write("</body><script>");
  res.write("table = document.getElementById(\"song_table\");");
  res.write("var cell;");
  let i = 1;
  for(var x  in currentSongs){
    res.write("cell = table.insertRow("+i+");");
    res.write("cell.innerHTML ='"+currentSongs[x]+"';");
    i++;
  }
  res.write("</script>");
  res.end('');
});                  
app.get('/add', function (req, res)
{
  try
  {
    if (req.query.song == undefined)
    {
      throw Error("No songs entered"); 
    }
    else if(Array.isArray(req.query.song))
    {
      for(let i =0;i < req.query.song.length;i++)
      {
        currentSongs.push(req.query.song[i]);
      }
    }
    else
    {
      currentSongs.push(req.query.song);      
    }
    res.redirect('/');
  }
  catch (e)
  {
    result = {'error' : e.message};
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(result));
    res.end('');  
  }
});
app.get('/sort', function (req, res)
{
  try
  {
  if(currentSongs.length == 0)
    throw Error("Nothing to sort");
  else
  {
    currentSongs.sort();
    res.redirect('/');
  }
  }
  catch (e)
  {
    result = {'error' : e.message};
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(result));
    res.end('');  
  }  
}); 
app.get('/remove', function (req, res)
{
  try
  {
    if (req.query.song == undefined)
    {
      throw Error("No songs entered"); 
    }
    else if(Array.isArray(req.query.song))
    {
      var aMatch = false;
      for(let i = 0;i<req.query.song.length;i++)
      {
        for (let j=currentSongs.length-1; j>=0; j--) 
        {
          if (currentSongs[j] === req.query.song[i])
          {
             currentSongs.splice(j, 1);
             aMatch=currentSongs.includes(req.query.song[i]);
          }
        }
      }
    }
    else{
        for (let j=currentSongs.length-1; j>=0; j--) 
        {
          if (currentSongs[j] === req.query.song)
             currentSongs.splice(j, 1);
        }    
    }
    if(!aMatch)
      throw Error("No songs qualify for removal")
    else  
      res.redirect('/');
  }
  catch (e)
  {
    result = {'error' : e.message};
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(result));
    res.end('');
  }
});
app.get('/clear', function (req, res)
{
  try
  {
  if(currentSongs.length == 0)
    throw Error("Nothing to clear");
  else
  {
    currentSongs = [];
    res.redirect('/');
  }
  }
  catch (e)
  {
    result = {'error' : e.message};
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(result));
    res.end('');  
  }  
}); 

app.listen(process.env.PORT,  process.env.IP, startHandler())
let result = {};
let currentSongs = [];   

function startHandler()
{
  console.log("Server listening at ", process.env.IP);
}


