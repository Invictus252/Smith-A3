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
  //-----------------------------------------
  // External Styles/Scripts & CSS Injection
  //-----------------------------------------  
  res.write("<head>"
            +"<link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'"
            +"integrity='sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T' crossorigin='anonymous'>"
            +"<script src='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js'"
            +"integrity='sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM'"
            +"crossorigin='anonymous'></script>"
            +"<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js'></script>"  
            +"<style>"
            +"div{line-height:normal;}"
            +"body{background-color: #2f4353;"
            +"background-image: linear-gradient(315deg, #2f4353 0%, #d2ccc4 74%);}"
            +"p{color:navy;"
            +"font-size:1vw;}"
            +"h1{color:navy;"
            +"font-size:3vw;}"
            +"#song_num{width:15%;}"
            +"#right_pic{-webkit-transform: scaleX(-1);"
            +"transform: scaleX(-1);}"
            +"th,td{text-align:center;}</style></head><body>");
  //---------------------
  // Left Side
  //---------------------            
  res.write("<div style='width: 100%; overflow: hidden;border-bottom:outset 1px;'>"
           +" <div style='width: 400px; float: left;margin-left:2%;margin-right:2%;border-right:outset 1px;'>");

  res.write("   <div align='center'><h1>Session Music Array Worker&nbsp;&nbsp;<img src='https://media.giphy.com/media/523yM06ZjOTxPCRoLw/giphy.gif' width='80' height='60'></h1>");
  res.write("     <p>Use /add?song= to add a new song to session collection.</p>");
  res.write("     <p>Use /remove?song= to remove a song from  music inventory.</p>");
  res.write("     <p>Use /sort to sort current music inventory.</p>");
  res.write("     <p>Use /clear to clear current music inventory.</p>"
           +"    </div>"
           +"<hr>"); 
  res.write("   <div><h6 align ='center'>"
           +"    <img src='https://media.giphy.com/media/1zKA4ewDFV0QK44Arr/giphy.gif' width='80' height='60'>&nbsp;&nbsp;JS Control&nbsp;&nbsp;"
           +"    <img id='right_pic' src='https://media.giphy.com/media/1zKA4ewDFV0QK44Arr/giphy.gif' width='80' height='60'></h6>"
           // Buttons SRT|CLR
           +"    <div style='margin-right:3.5%;' align='right'>"
           +"     <a style='width:47px;margin-right:7px;' class='btn btn-primary btn-sm' href='/sort' role='button'>SRT</a>"
           +"     <a style='width:47px;' class='btn btn-danger btn-sm' href='/clear' role='button'>CLR</a>"
           +"    </div>"
           +"   </div>"
           // Forms ADD|REMOVE
           +"   <div style='margin-right:1px;margin-top:5px;'> <form  name='add' action='/add?song=' onsubmit='return validateAddForm()' method='get'>"
           +"    <label class='form-control-sm' for='add_song_name'>Enter song to add: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>"
           +"    <input class='form-control-sm' id='add_song_name' type='text' name='song'>"
           +"    <input class='btn btn-primary btn-sm' type='submit' value='ADD'></form>");
  res.write("     <form  name='remove' action='/remove?song=' onsubmit='return validateRmForm()' method='get'>"
           +"    <label class='form-control-sm' for='rm_song_name'>Enter song to remove: </label>"
           +"    <input class='form-control-sm' id='rm_song_name' type='text' name='song'>"
           +"    <input class='btn btn-danger btn-sm' type='submit' value='RMV'></form>"
           +"   </div>"
           +" </div>"); 
  //---------------------
  // Right Side
  //---------------------
  res.write(" <div style='margin-left: 420px;'>"
           +"   <div class='container' style='top: 10px;'  >"
           +"     <div align='center'>");
  res.write("       <table class='table table-bordered table-dark' style='align:top; width:90%;' id ='song_table'><caption>Song Bank</caption>"
           +"       <tr>"
           +"        <th id='song_num'>#</th>"
           +"        <th id='song_title'>Title</th>"
           +"        </tr>"
           +"       </table>"
           +"     </div>"
           +"   </div>"
           +" </div>"
           +"</div>");
  res.write("</body>");
  res.write(JSON.stringify(result));
  res.write("<script>");
  res.write("table = document.getElementById('song_table');");
  res.write("var cell,cell2,row;");
  let i = 1;
  let y =1;
  for(var x  in currentSongs){
    res.write("row = table.insertRow("+i+");");
    res.write("cell= row.insertCell(0);");
    res.write("cell2= row.insertCell(1);");
    res.write("cell.innerHTML ='"+y+"';");
    res.write("cell2.innerHTML ='"+currentSongs[x]+"';");
    i++;
    y++;
  }
  res.write("function validateAddForm() {"
  +"var x = document.forms['add']['song'].value;"
  +"if (x == '') {"
  +"alert('Song must be filled out');"
  +"return false;}};");
  res.write("function validateRmForm() {"
  +"var x = document.forms['remove']['song'].value;"
  +"if (x == '') {"
  +"alert('Song must be filled out');"
  +"return false;}};");
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
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("<link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'>");
    res.write("<style>body{background-color: #2f4353;background-image: linear-gradient(315deg, #2f4353 0%, #d2ccc4 74%);}</style>");
    res.write(JSON.stringify(result));
    res.write("<br><br><a class='btn btn-secondary btn-lg btn-block' href='/' role='button'>Main Console</a>");
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
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("<link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'>");
    res.write("<style>body{background-color: #2f4353;background-image: linear-gradient(315deg, #2f4353 0%, #d2ccc4 74%);}</style>");
    res.write(JSON.stringify(result));
    res.write("<br><br><a class='btn btn-secondary btn-lg btn-block' href='/' role='button'>Main Console</a>");
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
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("<link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'>");
    res.write("<style>body{background-color: #2f4353;background-image: linear-gradient(315deg, #2f4353 0%, #d2ccc4 74%);}</style>");
    res.write(JSON.stringify(result));
    res.write("<br><br><a class='btn btn-secondary btn-lg btn-block' href='/' role='button'>Main Console</a>");
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
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("<link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'>");
    res.write("<style>body{background-color: #2f4353;background-image: linear-gradient(315deg, #2f4353 0%, #d2ccc4 74%);}</style>");
    res.write(JSON.stringify(result));
    res.write("<br><br><a class='btn btn-secondary btn-lg btn-block' href='/' role='button'>Main Console</a>");
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


