module.exports={
adminlogin: (req, res) => {
    console.log("jj");
	var sessData = req.session;
	console.log(sessData);
        let login="login";
        res.render('admin/login.ejs', {
            title: "Welcome to app | please add your details"
            ,message: '',
            login:login,
            logout:'',
            errors:''
        });
    },
    //code for admin login
    adminsubmit: (req, res) =>{
    		//console.log("success gggg");
    		var sessData = req.session;	console.log(sessData);
    		let email=req.body.username;
    		let password =md5(req.body.password);
    		req.checkBody('username', 'user email is required').notEmpty();
            req.checkBody('password', 'password is required').notEmpty();
            let errors = req.validationErrors();
            //console.log(errors);
            if(errors){

            	res.render('admin/login.ejs',{
            	 success: req.session.success,
            	 errors:errors,
            	});
            	req.session.errors = null; 
            }else{

            let usernameQuery = "SELECT * FROM `registration` WHERE email = '" + email + "' AND password='"+password+"' AND type=1";
            console.log("SELECT * FROM `registration` WHERE email = '" + email + "' AND password='"+password+"' AND type=1");
			db.query(usernameQuery,(err,result)=>{
			if(err){
			return res.status(500).send(err);
			}else{
				//console.log(result.length);
                if(result.length==1){
                    sess=req.session;
                console.log(sess);
                let id=result[0].id;
                let email=result[0].email;
                let type=result[0].type;
                sess.userid=id;
                sess.email=email;
                sess.usertype=type;
               // console.log(sess);
                if(sess.email && sess.usertype==1){
                    res.redirect('/admin/dashboard');
                    /*res.render('admin/dashboard.ejs',{
                        title:"welcome admin",
                        login:'',
                        logout:''
                    });*/
                }
                }else{
                    console.log("you are not registered");
                    res.render('admin/login.ejs', {
                    title: "Welcome to app | please add your details"
                    ,message: 'your email or password is invalid',
                    login:'',
                    logout:'',
                    errors:''
                });
                }
				

				}
			});

            }
			
    	    
    },
    //end
};