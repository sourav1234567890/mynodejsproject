module.exports = {
    getHomePage: (req, res) => {
        var sessData = req.session;
        console.log("souravtest"+sessData);
        console.log(sessData);
        if(sessData.email1){
            /*let query = "SELECT * FROM `players` ORDER BY id ASC";*/ // query database to get all the players
             //let query = "SELECT * FROM `registration` ORDER BY id DESC";
             let query="SELECT registration.id,registration.first_name,registration.last_name,userimage.image FROM registration LEFT JOIN userimage ON registration.id=userimage.userid"
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            console.log(result);
            res.render('index.ejs', {
                title: "Welcome to Socka | View Players"
                ,players: result,
                login:'',
                logout:"logout"
            });
        });
        }else{
          res.redirect('/login');
        }
        
    },
};
