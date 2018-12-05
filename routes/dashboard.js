//var session = require('express-session');
module.exports={
dashboard: (req, res) => {
	var sessData = req.session;
    //console.log("hhhhhhh

	if(sessData.email1){
        let userimage=sessData.userimage1;
        console.log("userimage"+userimage);
        let logout="logout"
        res.render('dashboard.ejs', {
            title: "Welcome to app | dashboard page"
            ,message: '',
            session:sessData,
            logout:logout,
            login:'',
            userimage:userimage
        });
    }else{
    	//res.redirect('/login');
        let login="login"
        let userimage="";
        //let logout=""
        res.render('dashboard.ejs', {
            title: "Welcome to app | dashboard page"
            ,message: '',
            logout:'',
            login:login,
            userimage:userimage
        });
    }
    },
};