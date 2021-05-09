const express = require("express");
const https = require("https");

const app = express();

//Using bod-parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//The public folder which holds the CSS
app.use(express.static("public"));
//Listening on port 3000 or process.env.PORT with heroku and if it goes well then logging a message saying that the server is running
app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running at port 3000");
});

app.get("/",function(req,res)
{
  res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req,res){
  const apikey = "433577d78bb242b38a5b340403532239";
  const ip = req.body.ip;

  const url = "https://vpnapi.io/api/" + ip + "?key=" + apikey +"";

  console.log(ip, url);

  https.get(url,function(response)
  {
    console.log(response.statusCode);
    const chunks = [];
    response.on('data', function (chunk) {
     chunks.push(chunk)
   })

   response.on('end', function () {
     const data = Buffer.concat(chunks)
     var deta = JSON.parse(data)
     var vpn = deta.security.vpn;
     var proxy = deta.security.proxy;
     var city = deta.location.city;
     res.send(`

       <!DOCTYPE html>
       <html lang="en">
       <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- displays site properly based on user's device -->

         <link rel="icon" type="image/png" sizes="32x32" href="images/favicon.ico">
         <link rel="stylesheet" href="css/styles.css">
         <!-- google fonts -->
         <link rel="preconnect" href="https://fonts.gstatic.com">
       <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Lexend+Deca&display=swap" rel="stylesheet">

         <title>VPN & Proxy Detection</title>
       </head>
       <body>
         <div class="main-container">

           <div class="grid">
             <div class=" left" >
               <!-- <img class="img" src="public/images/img.jpg" alt="img"> -->

               <form action="/" class="" method="POST">
                 <h1 class=""><span class="clr-dark-purple">VPN</span> & <span class="clr-dark-purple">Proxy</span> Detection.</h1>
                 <h2>Test to see if an IP address is either a VPN, Proxy, or a TOR node</h2>

                 <input type="text" name="ip"  class="css-input" placeholder="Enter IP Address" required autofocus> <br>
                 <div class="container-one">
           <button type="submit">
           Test
             <div class="fill-one"></div>
           </button>
         </div>

                 <h3><span style="margin-right:1.3em"><span style="color:#301b3f;">VPN:</span> ${vpn}</span><span style="margin-right:1.3em;"><span style="color:#301b3f;">Proxy:</span> ${proxy}</span> <span><span style="color:#301b3f;">City:</span> ${city}</span></h3>
               </form>

               </div>


           </div>

         </div>



         <div class="attribution">
           Made by <a href="https://onewaynoo.github.io/personal-site/">Ankit</a>.
         </div>
       </body>
       </html>

`);

     console.log(vpn,proxy,city);
   })
 })
 });
// <h3><span style="margin-right:1.3em"><span style="color:#301b3f;">VPN:</span> ${vpn}</span><span style="margin-right:1.3em;"><span style="color:#301b3f;">Proxy:</span> ${proxy}</span> <span><span style="color:#301b3f;">City:</span> ${city}</span></h3>
