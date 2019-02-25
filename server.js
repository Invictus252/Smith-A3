const express = require('express');
const app = express();
let session = require('express-session'); 

app.use(session({ secret: 'happy jungle', 
                  resave: false, 
                  saveUninitialized: false, 
                  cookie: { maxAge: 60000 }}))

app.get('/', function (req, res)
{
  result = {'Songs':currentSongs};
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("<div align='center' style='width:100%;'><div align='center' style='width: 80%;border:solid black 2px;'>");
  res.write("     <h1>Session Music Array Worker</h1>");
  res.write("     <p>Use /add?song= to add a new song to session collection.</p>");
  res.write("     <p>Use /remove?song= to remove a song from  music inventory.</p>");
  res.write("     <p>Use /sort to sort current music inventory.</p>");
  res.write("     <p>Use /clear to clear current music inventory.</p>"
           +"</div></div><br><br>"); 
  res.write(JSON.stringify(result));
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
            aMatch=currentSongs.includes(req.query.song[i]);
            currentSongs.splice(j, 1);
          }
        }
      }
    }
    else{
        for (let j=currentSongs.length-1; j>=0; j--) 
        {
          if (currentSongs[j] === req.query.song){
            aMatch=currentSongs.includes(req.query.song);
            currentSongs.splice(j, 1);
          }  
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
  console.log("You are listening from ", process.env.IP,"@",process.env.PORT);
}


