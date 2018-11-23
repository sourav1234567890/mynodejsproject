module.exports = {
	registration: (req, res) => {
        let login="login";
        res.render('registration.ejs', {
            title: "Welcome to app | please add your details"
            ,message: '',
            login:login,
            logout:'',
            errors:''
        });
    },
    registrationpage: (req, res) => {
    	let message = '';
        //let errors='';
        var email=req.body.useremail;
    	let first_name = req.body.first_name;
    	let last_name =req.body.last_name;
    	let password =md5(req.body.password);
        //code for registration form submit

         req.checkBody('useremail', 'email is required').notEmpty();
         req.checkBody('first_name', 'first name is required').notEmpty();
         req.checkBody('last_name', 'last name is required').notEmpty();
         req.checkBody('password', 'password is required').notEmpty();
         req.checkBody('confirm_password', 'confirm password is required').notEmpty();
          let errors = req.validationErrors();
          console.log(errors);
          if(errors){
            res.render('registration.ejs',{
            title:"Welcome to app | please login",
            message:'',
            logout:'',
            login:'login',
            success: req.session.success,
            errors:errors,

        });
             req.session.errors = null;  

            }else{
                let confirmpassword=md5(req.body.confirm_password);
        if(password!=confirmpassword){
            console.log("password missmatch");
             message = 'password missmatch';
                res.render('registration.ejs', {
                    message,
                    title: "Welcome to Socka | Add a new player",
                    login:'',
                    logout:'logout',
                    errors:''
                });
        }else{
            let usernameQuery = "SELECT * FROM `registration` WHERE email = '" + email + "'";
            db.query(usernameQuery,(err,result)=>{
                 if (err) {
                return res.status(500).send(err);
            }
            if(result.length>0){
                message = 'Useremail already exists';
                res.render('registration.ejs', {
                    message,
                    title: "Welcome to app | please sign up first",
                    login:'',
                    logout:"logout",
                    errors:''
                });
            }else{
                let query = "INSERT INTO `registration` (first_name, last_name, password,email,type) VALUES ('" +
                            first_name + "', '" + last_name + "', '" + password + "','"+ email +"',2)";
                            db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            message="registration successfully";
                            res.render('registration.ejs', {
                            message,
                            title: "Welcome to Socka | Add a new player",
                            login:'login',
                            logout:'',
                            errors:''
            });
                        });
            }

            });
             
        }

            }
        //end
        //let newpassword=md5(password);
        //console.log(newpassword);
    	
    },
    login: (req,res) =>{
        var sessData = req.session;
        if(sessData.email1){
           // res.redirect('/dashboard');
           let logout="logout";
           res.render('dashboard.ejs',{
            title:"Welcome to app | please login",
            message:'',
           logout:logout,
            login:''
        });  
        }else{
            let login="login";
          res.render('login.ejs',{
            title:"Welcome to app | please login",
            message:'',
            logout:'',
            login:login,
            success: req.session.success,
            errors: req.session.errors,

        });
         req.session.errors = null;  
        }
        
    },
    loginsubmit: (req,res) =>{
        // res.writeHead(200, {'Content-Type': 'application/xhtml+xml; charset=utf-8'});
       // console.log(req.body);
        let email=req.body.email;
        let password=md5(req.body.password);
        //let errors='';
        //new code for express validator
           req.checkBody('email', 'email is required').notEmpty();
            req.checkBody('password', 'password is required').notEmpty();
            let errors = req.validationErrors();
            console.log(errors);
            if(errors){
            res.render('login.ejs',{
            title:"Welcome to app | please login",
            message:'',
            logout:'',
            login:'login',
            success: req.session.success,
            errors:errors,

        });
             req.session.errors = null;  
            }
        //end
        else
        {
        let usernameQuery = "SELECT * FROM `registration` WHERE email = '" + email + "' AND password = '"+ password +"'";
        db.query(usernameQuery,(err,result)=>{
            if(result.length>0){
                console.log(result[0].status);
                if(result[0].status==0){
                    //console.log("hhhh");
                    message="you are not approved by admin please wait for admin approval";
                    res.render('login.ejs',{
                    title:"Welcome to app | please login",
                    message,
                    login:"login",
                    logout:'',
                    errors:'',
                });

                }else{
                    console.log("true");
                  console.log(result);
                console.log("username is verified");
                console.log(result);
                let id=result[0].id;
                let email=result[0].email;
                sess=req.session;
                sess.email1=email;
                sess.usrid=id;
                if(sess.email1){
                res.redirect('/dashboard');
                console.log("all logs");
                }  
                }
                
                }else{
                message="you are not registered please register first";
                res.render('login.ejs',{
                title:"Welcome to app | please login",
                message,
                login:"login",
                logout:'',
                errors:'',
            });
            }

        });
        }
    },
    logout:(req,res) =>{
        
        var sessData = req.session;
        req.session.destroy();
        
        console.log(sessData);
        req.session = null; 
        res.redirect('/login');
    },
};
//var sess;
//global.sess=sess;