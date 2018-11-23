module.exports={
admindashboard: (req, res) => 
{

	   let sessData = req.session;
	   console.log(sessData);
        let logout="logout";
        if(sessData.email && sessData.usertype==1){
        res.render('admin/dashboard', {
            title: "Welcome to app | it's your dashboard"
            ,message: '',
            login:'',
            logout:'',
            errors:''
            });
}else{
    	res.redirect('/admin/login');
}
},


//code for userlist
userlist: (req,res) =>{

let authsession=req.session;
if(authsession.email && authsession.usertype==1){
    let userlisting="SELECT * FROM registration";
    db.query(userlisting,(err,result)=>{
        console.log(result);
        res.render('admin/userlist',{
        title: "Welcome to app | it's your dashboard",
        message: '',
        userlist:result,
        login:'',
        logout:'',
        errors:''
  }); 
    });
   
}else{
  res.redirect('/admin/login');  
}
},

//end

/*code for user activation*/
useractive:(req,res) =>{

var id=req.body.data;
let useractive="UPDATE registration SET status=1 WHERE id="+id+"";
db.query(useractive,(err,result)=>{
if(err){
return res.status(500).send(err);
}else{
    var data={
        'success':1,
        'error':0,

    }
    res.json(data);
}
});
},
/*end*/

};
     