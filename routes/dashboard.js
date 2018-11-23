//var session = require('express-session');
module.exports={
dashboard: (req, res) => {
	var sessData = req.session;
    console.log(sessData);
	if(sessData.email1){
        let logout="logout"
        res.render('dashboard.ejs', {
            title: "Welcome to app | dashboard page"
            ,message: '',
            session:sessData,
            logout:logout,
            login:''
        });
    }else{
    	//res.redirect('/login');
        let login="login"
        //let logout=""
        res.render('dashboard.ejs', {
            title: "Welcome to app | dashboard page"
            ,message: '',
            logout:'',
            login:login
        });
    }
    },
};