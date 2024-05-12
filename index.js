require("dotenv").config()
const express =require("express")
const app =express()
const bodyParser =require("body-parser")
const ejs =require("ejs")
const mongoose =require("mongoose")
const session =require("express-session")
const passport =require("passport")
const passportLocalMongoose=require("passport-local-mongoose")
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.set("view engine", "ejs");  
app.use(session({
    secret:process.env.SECRET,
    maxAge: new Date(Date.now() + 3600000),
httpOnly: true,
cookie: { path: '/', httpOnly: true, maxAge:36000000},
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO);
    } catch (error) {
      console.log(error);
      process.exit();
    }
  }
  const userchema= new mongoose.Schema({
    name:String,
    password:String,
  })
userchema.plugin(passportLocalMongoose);
const User = new mongoose.model("User",userchema)
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const Resault= new mongoose.model("Resault",{
    "degree":Number,
    "name":String,
    "sub":String,
})

app.get("/",(req,res)=>{
    if(req.isAuthenticated()){
        Resault.find({name:req.user.username}).then((found)=>{
            res.render("index",{photo:req.user.username,exam1:found} )
        }
        )
    }else{
        res.sendFile(__dirname+"/login.html" )
    }
})


app.get("/exam1",(req,res)=>{
    if(req.isAuthenticated()){
        res.render("exam1")
    }else{
        res.sendFile(__dirname+"/login.html" )
    }
})

app.post("/exam1",(req,res)=>{
const resault = new Resault({
    "degree":req.body.deg,
    "name":req.user.username,
    "sub":"exam1",
})
resault.save()
res.redirect("/")
})

app.get("/logout",(req,res)=>{
    req.logout(req.user, err => {
      if(err) return next(err);
      res.redirect("/");
    });
  })
// app.post("/signup",(req,res)=>{
//     console.log(req.body)
//     const newuser = new User({
//       username:req.body.username
//     })
//       User.register(newuser,req.body.password,(err,user)=>{
//           if(err){
//             console.log(err)
//             res.send("user name is already exist")
//           }else{
//             passport.authenticate("local")(req,res,()=>{
//               res.redirect("/")
//             } )
//           }
//         }) 
//   })


  app.post("/login",(req,res)=>{
    passport.authenticate('local',
    (err, user, info) => {
      if (err) {
        console.log(err)
        return next(err);  // default express error handler - unauthorized 
      }
  
      if (!user) {
        res.send("check your email or password")
        console.log(err)
        // return res.redirect('/signup'); // you can redirect user to signup page if needed
      }else{
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }else{
          if(req.isAuthenticated){            
              return res.redirect('/');
          }else{  
            res.sendFile(__dirname+"/login.html")
        }
      }  });
    }
    })(req, res);
}) 

  connectDB().then(() => {
    app.listen( process.env.PORT||3000, () => {
        console.log("listening");
    })
}) 
