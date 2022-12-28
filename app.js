const express = require("express");
//var express = require('express');
const session = require('express-session');


var path = require('path');
//var app = express();
const app = express();


const PORT = process.env.PORT || 3030;


var fs=require('fs');
const { NOTFOUND } = require('dns');



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({secret:'mySecret',resave: false,saveUninitialized:false}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
var MongoClient=require('mongodb').MongoClient;



const url ='mongodb://127.0.0.1:27017';
 app.get('/',function(req,res){
   res.render('login',{notUser:""});
 })
app.get('/home',function(req,res){
  if(typeof req.session.username =='undefined'){
    console.log(req.session.username);
    res.render('login',{notUser:""});
    
  }
  else{
    console.log(req.session.username);
    res.render('home',{notAvailable:""});
    
  }
  
});
app.get('/registration',function(req,res){
  res.render('registration');
});
app.get('/inca',function(req,res){
  if(typeof req.session.username =='undefined'){
    
    res.render('login',{notUser:""});
    
  }
  else{
    res.render('inca',{inExists:""});
    
  }

})
app.get('/annapurna',function(req,res){
  if(typeof req.session.username =='undefined'){
    
    res.render('login',{notUser:""});
    
  }
  else{
    res.render('annapurna',{inExists:""});
    
  }
  
})
app.get('/wanttogo',function(req,res){
  if(typeof req.session.username =='undefined'){
    
    res.render('login',{notUser:""});
    
  }
  else{
   
    MongoClient.connect(url,function(err,result){
      if (err) throw err;
      var db=result.db('myDB');
     db.collection('myCollection').findOne({username: req.session.username},function(err, result){
      if (err) throw err;
      console.log(result.travels)
      res.render('wanttogo',{array:result.travels});
    
     
      
     })
      
      
    })

    
  }
  
})
app.get('/paris',function(req,res){
  if(typeof req.session.username =='undefined'){
    
    res.render('login',{notUser:""});
    
  }
  else{
    res.render('paris',{inExists:""});
    
  }
  
})
app.get('/rome',function(req,res){
  if(typeof req.session.username =='undefined'){
    
    res.render('login',{notUser:""});
    
  }
  else{
    res.render('rome',{inExists:""});
    
  }
  
})
app.get('/bali',function(req,res){
  if(typeof req.session.username =='undefined'){
    
    res.render('login',{notUser:""});
    
  }
  else{
    res.render('bali',{inExists:""});
    
  }
  
})


app.get('/login',function(req,res){
  res.render('login',{notUser:""})
})
var travels=["santorini","bali","inca","annapurna","paris","rome"];
app.post('/search', function(req,res){
  var output=[];
  var typed=req.body.Search.toLowerCase();
  

  
  for (let i=0; i<travels.length ; i++){
    if (travels[i].includes(typed))
    output.push(travels[i]);
  }
  if (output.length==0) {
    let alert = require('alert');
    alert("this search is not available"); 
  }

  else{
   res.render('searchresults',{output: output});
  }  

       
}); 


app.post('/login', function(req, res) {


  var username =req.body.username;
  var password =req.body.password;
  //req.session.username=username;


      if(username=='admin' && password=='admin'){
        req.session.username= username; //hena fe moshkelet el session
        res.username=username;
        console.log(req.sessionID);
      res.render('home',{notAvailable:""});}
      else {res.render('login',{notUser:"Sorry incorrect username or password"});

      }
      

  
  

});
app.post('/execsantorini',function(req,res){
  MongoClient.connect(url,function(err,result){
    if (err) throw err;
    var db=result.db('myDB');
   db.collection('myCollection').findOne({username: req.session.username},function(err, result){
    var x=JSON.stringify(result.travels)
    if(result.travels.includes('santorini')){
      res.render('santorini',{inExists:"this element already exists"});
    }
    else{
      db.collection('myCollection').updateOne({username: req.session.username }, { $push: {travels: 'santorini'}})
    }
    
   })
    
    //db.collection('User').updateOne({username: req.session.username }, { $push: {travels: 'santorini'}})
  })
})
app.post('/execbali',function(req,res){
  MongoClient.connect(url,function(err,result){
    if (err) throw err;
    var db=result.db('myDB');
   db.collection('myCollection').findOne({username: req.session.username},function(err, result){
    var x=JSON.stringify(result.travels)
    if(result.travels.includes('bali')){
      res.render('bali',{inExists:"this element already exists"});
    }
    else{
      db.collection('myCollection').updateOne({username: req.session.username }, { $push: {travels: 'bali'}})
    }
    
   })
    
    //db.collection('User').updateOne({username: req.session.username }, { $push: {travels: 'santorini'}})
  })
})
app.post('/execparis',function(req,res){
  MongoClient.connect(url,function(err,result){
    if (err) throw err;
    var db=result.db('myDB');
   db.collection('myCollection').findOne({username: req.session.username},function(err, result){
    var x=JSON.stringify(result.travels)
    if(result.travels.includes('paris')){
      res.render('paris',{inExists:"this element already exists"});
    }
    else{
      db.collection('myCollection').updateOne({username: req.session.username }, { $push: {travels: 'paris'}})
    }
    
   })
    
    //db.collection('User').updateOne({username: req.session.username }, { $push: {travels: 'santorini'}})
  })
})
app.post('/execrome',function(req,res){
  MongoClient.connect(url,function(err,result){
    if (err) throw err;
    var db=result.db('myDB');
   db.collection('myCollection').findOne({username: req.session.username},function(err, result){
    var x=JSON.stringify(result.travels)
    if(result.travels.includes('rome')){
      res.render('rome',{inExists:"this element already exists"});
    }
    else{
      db.collection('myCollection').updateOne({username: req.session.username }, { $push: {travels: 'rome'}})
    }
    
   })
    
    //db.collection('User').updateOne({username: req.session.username }, { $push: {travels: 'santorini'}})
  })
})
app.post('/execinca',function(req,res){
  MongoClient.connect(url,function(err,result){
    if (err) throw err;
    var db=result.db('myDB');
   db.collection('myCollection').findOne({username: req.session.username},function(err, result){
    var x=JSON.stringify(result.travels)
    if(result.travels.includes('inca')){
      res.render('inca',{inExists:"this element already exists"});
    }
    else{
      db.collection('myCollection').updateOne({username: req.session.username }, { $push: {travels: 'inca'}})
    }
    
   })
    
    //db.collection('User').updateOne({username: req.session.username }, { $push: {travels: 'santorini'}})
  })
})
app.post('/execannapurna',function(req,res){
  MongoClient.connect(url,function(err,result){
    if (err) throw err;
    var db=result.db('myDB');
   db.collection('myCollection').findOne({username: req.session.username},function(err, result){
    var x=JSON.stringify(result.travels)
    if(result.travels.includes('annapurna')){
      res.render('annapurna',{inExists:"this element already exists"});
    }
    else{
      db.collection('myCollection').updateOne({username: req.session.username }, { $push: {travels: 'annapurna'}})
    }
    
   })
    
    //db.collection('User').updateOne({username: req.session.username }, { $push: {travels: 'santorini'}})
  })
})
app.post('/register', function(req, res) {
  var username =req.body.username;
  var password =req.body.password;
  if(username.length==0 || password.length==0){
    let alert = require('alert');
    alert("some fields are empty please register again"); 
    res.render('registration');
  }
  else{
  MongoClient.connect(url,function(err,result){
    if (err) throw err;
    var db=result.db('myDB');
    db.collection('myCollection').findOne({username :req.body.username},function(err,result){
      if(result!=null){
      res.render('login',{notUser:"this user alrady exist"});}
      else { const Account={
        "username" :req.body.username,
        "password" :req.body.password, "travels" :new Array()};
          
      db.collection('myCollection').insertOne(Account);
      //req.sesion.console.log= true; 
    
      res.render('login',{notUser:"successful registration"});;
      }
      
    });
   
  })}
});
app.get('/hiking',function(req,res){
  if(typeof req.session.username =='undefined'){
    
    res.render('login',{notUser:""});
    
  }
  else{
    res.render('hiking')
    
  }
 
})
app.get('/islands',function(req,res){
  if(typeof req.session.username =='undefined'){
    console.log(req.sessionID);
    
    res.render('login',{notUser:""});
    
  }
  else{
    res.render('islands')
    
  }
  
})
app.get('/cities',function(req,res){
  if(typeof req.session.username =='undefined'){
    
    res.render('login',{notUser:""});
    
  }
  else{
    res.render('cities')
    
  }
 
})
app.get('/santorini',function(req,res){
  if(typeof req.session.username =='undefined'){
    
    res.render('login',{notUser:""});
    
  }
  else{
    res.render('santorini',{inExists:""});
    
  }
 
})

app.listen(3000);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});