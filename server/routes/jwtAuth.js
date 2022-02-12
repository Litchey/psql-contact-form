

const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorize = require("../middleware/authorize");



//registering 

router.post("/register", validInfo, async (req, res) => {
try {
    // 1. Destructure the res.body(name, email, password)
    const { name, email, password, storetype, productlist } = req.body;

    //2. check if user exist (if user exist, then throw error)

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
        email
    ]);


    if(user.rows.length !== 0) {
        return res.status(401).send("User already exist");
    }

    // 3. bcrypt the users passwords 

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(password, salt);

     
    // 4. Enter the user inside the database

     const newUser = await pool.query(
        "INSERT INTO users (user_name, user_email, user_password, user_storetype, user_productlist) VALUES ($1, $2, $3, $4, $5) RETURNING *", 
        [name, email, bcryptPassword, storetype, productlist]
    );
    // res.json(newUser.rows[0]);



    // 5. Generating the jwt token

    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ token });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});


    // login 

    router.post("/login", validInfo, async (req, res) => {
      try {

        // 1. destructure the req.body

        const {email, password} = req.body;

        // 2. check whether the user doesn't exists (if exists throw error)

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [ 
            email
        ]);

        if(user.rows.length === 0) {
            return res.status(401).json("Password or email is invalid");
        }

        // 3. check whether the incoming password is same as in the database 

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
        
        if(!validPassword) {
            return res.status(401).json("Password or email is invalid");
        }


        // 4. provide the jsonwebtokens
        
        const token = jwtGenerator(user.rows[0].user_id);

        res.json({ token });


     } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');  
        }
    });

    router.get("/is-verify", authorize, async (req, res) => {
        try {
            res.json(true);
        } catch (error) {
            
            console.error(error.message);
            res.status(500).send('Server error');  
            }
    });


module.exports = router;



