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
  res.write("<h1>Session Music Array Worker   --- Jason Smith</h1>");
  res.write("<h3>Hosted from : " + req.headers.host + "</h3>");
  res.write("<p>Use /add to add a new song to session collection.</p>");
  res.write("<p>Use /sort to sort current session  music inventory.</p>");
  res.write("<p>Use /remove to remove a song from session music inventory.</p>");
  res.write("<p>Use /clear to clear current session music inventory.</p>");
  res.write("<p>Current Tracks :</p>");
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
    currentSongs.clear();
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





