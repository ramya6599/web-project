const express = require('express')

const app = express()
app.use(express.json())

const port = process.env.PORT || 8080

const users = [
 {
   "id" : 1,
   "name" : "Alejandra Romero",
   "gender" : "male",
   "image" : "https://randomuser.me/api/portraits/women/62.jpg"
 },
 {
   "id" : 2,
   "name" : "Olivia Morris",
   "gender" : "female",
   "image" : "https://randomuser.me/api/portraits/women/31.jpg"
 }
]

// api server

// get all users
app.get("/api/users", function(req, res){
 res.status(200).json(users);
})

function getUserById(uid){
 for(var i=0; i<users.length; i++)
 {
   if(uid == users[i].id)
     return i;
 }
 return -1;
}

// get user by id
app.get("/api/users/:id", function(req, res)
{
 var uid = req.params.id;
 var userid = getUserById(uid);

 if(userid == -1)
 {
   res.status(404).json({"message" : "user not found"})
 }
 res.status(200).json(users[userid])
})
//get random users
app.get("/api/randomuser",function(req,res){
  var n=users.length;
  const randomid=Math.floor(Math.random()*n);
  res.status(200).json(users[randomid])
})
var newuserid=users.length+1;
//post:add a new user
app.post("/api/users",function(req,res){
  if(!req.body.name||!req.body.gender||!req.body.image)
    return res.json({"message":"name,gender and image is required"}) 
let user=req.body;
//console.log(user)
user.id=newuserid;
newuserid++;
users.push(users)
res.status(200).json({"message":"added successfully"});
})
//put:update user details oof given id
app.put("/api/users/:id",function(req,res){
  var userid=getUserById(req.params.id);
  if(userid==-1)
    return res.json({"message":"user not found"})
  if(req.body.name)
    users[userid].name=req.body.name;
  if(req.body.gender)
    users[userid].name=req.body.gender;
  if(req.body.image)
    users[userid].name=req.body.image;
  return res.status(200).json({"message":"user details updated","user":users[userid]})

})
app.delete("/api/users/:id",function(req,res){
  var userid=getUserById(req.params.id);
  if(userid==-1)
    return res.json({"message":"user not found"})
  users.splice(userid,1);
  res.status(200).json({"message":"User deleted successfully"})
})
app.use(express.static("frontend")) // web server

app.listen(port, function (){
 console.log("my app is running at http://localhost:"+port)
})
