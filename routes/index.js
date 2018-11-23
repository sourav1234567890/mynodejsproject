module.exports = {
    getHomePage: (req, res) => {
        var sessData = req.session;
        if(sessData.email1){
            /*let query = "SELECT * FROM `players` ORDER BY id ASC";*/ // query database to get all the players
             let query = "SELECT * FROM `registration` ORDER BY id DESC";
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
