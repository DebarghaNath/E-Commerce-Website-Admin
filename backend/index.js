import express from "express";
import mysql from "mysql2";
import cors from "cors";
import session from 'express-session';
import bodyParser from "body-parser";
import Joi from 'joi';
import cookieParser from "cookie-parser";


const app = express();
//var a;
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
    credentials: true,
    methods: ['POST', 'GET'],
    origin: "http://localhost:3001"
}));

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root@123",
    port: 3304,
    database:"store"
})

const schema = Joi.object({
    name: Joi.string()
        .required(),
    mobile_no: Joi.string()
        .required()
        .pattern(new RegExp('^[0-9]{10}$')), // Corrected regex pattern
    email: Joi.string()
        .required()
        .email(),
    user_name: Joi.string()
        .required(),
    password: Joi.string()
        .required(),
}).options({ abortEarly: false })



//console.log(validationResult.error ? validationResult.error.details : 'Valid input');

//app.use(bodyParser.json());
//--------------------------------------express-session----------------------------------------------

/*app.use(session(
    {
        
        secret:'secret@123',// secret is used to sign the session ID cookie,it is usually a string 
        saveUinitialized:true,// save the cookie withou verification
        resave:true,
        cookie:
        {
            name: 'connect.sid',
            path: '/',
            httpOnly:true,// https will get set by only using http request
            maxAge:3600000// milliseconds
        }

    }))*/

    app.use(session({
        secret:'secret@123',// secret is used to sign the session ID cookie,it is usually a string 
        saveUinitialized:false,// save the cookie withou verification
        resave:false,
        cookie:
        {
            secure: false,
            path: '/'
        }
    }))



//-----------------------------------------------------------------------------------------


/*const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: 'root',
    password: 'root@123',
    port: 3304,
    database: "testing"
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed: ', err);
        return;
    }
    console.log('Database connected successfully');
    connection.release();
});

app.get("/", (req, res) => {
    return res.json("Hello")


    /*const q = "SELECT * FROM customer_details";
    db.query(q, (err, data) => {
        if (err) 
            return res.json(err);
        return res.json(data);
    });*/

    /*const n ='AKASH';//req.body.user_name;
    const p = '2004976';//req.body.password
    const q = "SELECT * FROM login_detail WHERE user_name=? and password=?";

    db.query(q,[n,p],(err, data) => {
        if (err)
            return res.json(err);
        console.log(data[0].id)
        //req.session.user_id = "gh";
        return res.json(data[0].user_name);
    });*/
    
    /*{
        const n ='AKASH';
        const p = '2004976'
        const q = "SELECT * FROM login_detail WHERE user_name= ? and password = ? ";

    db.query(q,[n,p],(err, data) => {
        if (err)
            return res.json(err);
        return res.json(data);
    });*/

    /*
    const q = "SELECT * FROM login_detail WHERE user_name= 'AKASK' and password = '2004976'";
    
    db.query(q,(err, data) => {
        if (err)
            return res.json(err)//return res.json(err);
        else if(!res.json(data.length))
            return req.json(false)
        else
            return res.json(data);
    });
    const n = 'AKASH'
    const p = '2004976'
    const q = "SELECT * FROM login_detail WHERE user_name= ? and password =?"
    db.query(q,[n, p],(err, data) => {
        if (err)
            return res.json(err);
        else if(data.length==0)
            return false;
        else    
            return true;
    });
});

app.get("/c", (req, res) => {
    const q = "SELECT * FROM customer_details";
    db.query(q, (err, data) => {
        if (err) 
            return res.json(err);
        return res.json(data);
    });
});

app.post("/l", (req, res) => {
    const q = "SELECT * from customer_details WHERE ID = (?)";
    const values = 
    [
        req.body.id
    ]

    console.log(req.body.id);
    db.query(q, [values], (err, data) => {
        if (err) 
            return res.json(err);
        return res.json(data);
    });
});
app.post("/edit",(req,res)=>
    {
        var err_ar = [];
        const q1 = "SELECT `customer_mobile` FROM customer_details WHERE id != (?)";
        //console.log(req.body.id);
        db.query(q1,req.body.id,(err,data)=>
            {
                if (err) 
                    return res.json(err);
                else
                {
                    var mob_arr = [];
                    for(var i=0; i<data.length; i++)
                    {
                        mob_arr.push(data[i].customer_mobile)
                    }
                    //console.log(mob_arr.includes(req.body.mobile_no))
                    
                    if(mob_arr.includes(req.body.mobile_no))
                    {
                        err_ar.push
                        ({
                            mobile_no : "Mobile No already exist"
                        })
                    }
                    if(err_ar.length)
                    {
                            //console.log("HELLO")
                        console.log(err_ar);
                        return res.json([{err_ar}]);
                    }
                    else
                    {
                        const q = "UPDATE customer_details SET `customer_name` = ?,`customer_mobile` =? WHERE id = ? and u_id = ?";
                        const values = 
                        [
                            req.body.user_name,
                            req.body.mobile_no,
                            req.body.id,
                            req.session.user_id
                        ]

                        //console.log(values);
                        db.query(q, values, (err, data) => 
                        {
                            if (err) 
                                return res.json(err);
                             return res.json(true);
                
                        })
                    }
                }
                
            })
    });
app.post("/", (req, res) => {
    //a = req.session;
    req.session.save();
    const n = req.body.user_name;
    const p = req.body.password
    const q = "SELECT * FROM login_detail WHERE user_name=? and password=?";

    db.query(q,[n,p],(err, data) => {
        if (err){
            return res.json(0);
        }else if(data.length == 0){
            return res.json(1);
        }else{
        req.session.user_id =data[0].id;//data[0].id;
        console.log(req.session.user_id)
        req.session.isLoggedIn = true;
        
        //console.log("Session value set:", data[0].id);
        return res.json(2)
        //return res.json(data);
        }
    });
});
app.get('/checkSession', (req, res) => {
    console.log("Session value set checksession:", req.session.user_id);
    //if (a.cookie.maxAge>0) 
    if(req.session.isLoggedIn)
    {
      return res.json({ isLoggedIn: true, user: req.session.user_id });
    } else {
      return res.json({ isLoggedIn: false });
    }
  });
  
app.post("/d", (req, res) => {
    const q = "DELETE FROM customer_details WHERE id = ?";
    const values = [req.body.c_id];
    console.log(values);
    db.query(q, values,(err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.get('/Logout',(req,res)=>
    {
        //console.log(req.session.user_id);
       //a.cookie.maxAge = 0;
        req.session.destroy(err=>
            {
                if(err)
                    {
                        return res.json({ success: false, message: 'Logout failed' });
                    }
                else {
                        return res.json({ success: true, message: 'Logout successful' });
                    }
            })
    })


app.get("/dashboard", (req, res) => 
{
    const U_ID = req.session.user_id;
    const q = "SELECT * FROM customer_details WHERE u_id =? ";
    db.query(q,[U_ID], (err, data) => {
        if (err) 
            return res.json(err);
        return res.json(data);
    });
});
app.post("/Register",(req,res)=>
    {
        const q = "INSERT INTO login_detail (`name`, `mobile_no`,`email`,`user_name`,`password`) VALUES (?)";
        const val = [
            req.body.name,
            req.body.mobile_no,
            req.body.email,
            req.body.user_name,
            req.body.password
        ];
        const validationResult = schema.validate({
            name: req.body.name,
            mobile_no: req.body.mobile_no,
            email:req.body.email,
            user_name: req.body.user_name,
            password: req.body.password
        });
        //console.log(validationResult.error ? validationResult.error.details : 'Valid input');
        //console.log(validationResult);
        //console.log(val);
        var err_ar = [];
        if(validationResult.error==undefined)
        {
            //return res.json(true);
            //console.log('hi');
            db.query("SELECT mobile_no, email, user_name from login_detail",(err,data)=>
            {
                
                if (err) 
                    return res.json(err);
                
                var mob_arr = [];
                var email_arr = [];
                var un_arr = [];
                for(var i=0; i<data.length; i++)
                {
                    mob_arr.push(data[i].mobile_no)
                    email_arr.push(data[i].email)
                    un_arr.push(data[i].user_name)
                }
                //console.log(mob_arr.includes(req.body.mobile_no))
                
                if(mob_arr.includes(req.body.mobile_no))
                {
                    err_ar.push
                    ({
                        mobile_no : "Mobile No already exist"
                    })
                }
                if(email_arr.includes(req.body.email))
                {
                    err_ar.push
                    ({
                        email : "Email already exist"
                    })
                }
                if(un_arr.includes(req.body.user_name))
                {
                    //console.log("HERE");
                    err_ar.push(
                    {   
                        user_name : "User_name already exist"
                    })
                }
                if(err_ar.length)
                {
                    //console.log("HELLO")
                    console.log(err_ar);
                    return res.json([{err_ar}]);
                }
                else
                {
                    console.log("here");
                    db.query(q,[val],(err,data)=>{
                        if (err) 
                            return res.json(err);
                        return res.json(true);
        
                    })
                }
            });
            
        }
        else
        {
            
            //console.log(validationResult.error)
            for(var i = 0; i < validationResult.error.details.length; i++){
                var key = validationResult.error.details[i].context.label;
                err_ar.push({
                    [key] : validationResult.error.details[i].message
                })
                //err_ar[validationResult.error.details[i].context.label]= validationResult.error.details[i].message;
            }
            console.log(err_ar)
            return res.json([{err_ar}])
        }
        
    });
app.post("/add",(req,res)=>
    {
        var err_ar = [];
        const q1 = "SELECT `customer_mobile` FROM customer_details";
        //console.log(req.body.id);
        db.query(q1,req.body.id,(err,data)=>
            {
                if (err) 
                    return res.json(err);
                else
                {
                    var mob_arr = [];
                    for(var i=0; i<data.length; i++)
                    {
                        mob_arr.push(data[i].customer_mobile)
                    }
                    //console.log(mob_arr.includes(req.body.mobile_no))
                    
                    if(mob_arr.includes(req.body.mobile_no))
                    {
                        err_ar.push
                        ({
                            mobile_no : "Mobile No already exist"
                        })
                    }
                    if(err_ar.length)
                    {
                            //console.log("HELLO")
                        console.log(err_ar);
                        return res.json([{err_ar}]);
                    }
                    else
                    {
                        const q = "INSERT INTO customer_details (`u_id`,`customer_name`,`customer_mobile`) VALUES (?)";
                        const values = 
                        [
                            req.session.user_id,
                            req.body.user_name,
                            req.body.mobile_no,  
                        ]

                        //console.log(values);
                        db.query(q, [values], (err, data) => 
                        {
                            if (err) 
                                return res.json(err);
                             return res.json(true);
                
                        })
                    }
                }
                
            })
    })
*/
app.get("/feed",(req,res)=>
    {
       const q = "SELECT* FROM images";
        db.query(q,(err,data)=>
            {
                return res.json(data);
            })
    })
app.post("/login", (req, res) => {

        req.session.save();
        const n = req.body.user_name;
        const p = req.body.password
        const q = "SELECT * FROM  master_login WHERE user_name=? and password=?";
    
        db.query(q,[n,p],(err, data) => {
            if (err)
                {
                    return res.json(0);
                }
            else if(data.length == 0)
                {
                    return res.json(1);
                }
            else
            {
                req.session.user_id =data[0].id;
                console.log(req.session.user_id)
                req.session.isLoggedIn = true;
                return res.json(2);
            }
        });
    });
app.get('/checkSession', (req, res) =>
{
console.log("Session value set checksession:", req.session.user_id);
if(req.session.isLoggedIn)
{
    return res.json({ isLoggedIn: true, user: req.session.user_id });
} else {
    return res.json({ isLoggedIn: false });
}
});
app.get("/", (req, res) => {
return res.json("WELCOME HERE")
})
app.listen(3000, () => {
console.log("HELLO 1");
});
app.get('/Logout',(req,res)=>
{
req.session.destroy(err=>
    {
        if(err)
            {
                return res.json({ success: false, message: 'Logout failed' });
            }
        else {
                return res.json({ success: true, message: 'Logout successful' });
            }
    })
})
app.get('/brandtable',(req,res)=>
{

const q = "SELECT * FROM master_brands";
db.query(q,(err,data)=>
{
    if(err)
    {
        console.log("HERE");
        return res.json(false);
    }
    else
    {

        return res.json(data);
    }
}) 
})
app.get('/brandtype',(req,res)=>
{

const q = "SELECT * FROM master_product_category ";
db.query(q,(err,data)=>
    {
        if(err)
        {

            console.log("error")
            return res.json(false);
        }
        else
        {
            console.log(data);
            return res.json(data);
        }
}) 
})
app.get('/sub',(req,res)=>
{
    console.log("HERE");
    const q = "SELECT * FROM master_product_sub_category ";
    db.query(q,(err,data)=>
        {
            if(err)
            {

                return res.json(false);
            }
            else
            {

                return res.json(data);
            }
    }) 
})
app.post("/brand", (req,res)=>
{
var err_arr=[];
db.query("SELECT brand_name from master_brands",(err,data)=>
    {
        
        if (err) 
            return res.json(err);
        

        var cur=[]
        for(var i=0; i<data.length; i++)
        {
            cur.push(data[i].brand_name);
        }
        //console.log(mob_arr.includes(req.body.mobile_no))
        
        if(cur.includes(req.body.data))
        {
            console.log("hello")
            err_arr.push
            ({
                name : "Brand Name already exist"
            })
        }
        console.log(err_arr.length)
        if(err_arr.length!=0)
            {

                return res.json(err_arr);
            }
        const q = "INSERT INTO master_brands (`brand_name`) VALUES (?)";
        console.log(req.body.data);
        db.query(q,req.body.data,(err,data)=>
            {
                if(err)
                {
                    return res.json(false);
                }
                else
                {
                    return res.json(true);
                }
            }) 
    })
})
app.post("/d",(req,res)=>
    {
        const q = "SELECT * FROM master_product_sub_category WHERE category_id=(?)";
        console.log(req.body.data);
        db.query(q,req.body.data,(err,data)=>
            {
            if(err)
                {
                    console.log(err)
                }
            else
            {
                console.log("data=>",data)
                return res.json(data);
            }
            })

    })
app.post("/submit",(req,res)=>
    {

        const q = "INSERT INTO product_details (`product_name`,`product_brand`,`product_category`,`product_sub_category`,`product_price`,`product_image`,`product_stock_count`,`product_discount`) VALUES (?,?,?,?,?,?,?,?)";
        const value = 
        [
                req.body.finalval[0].product_name,
                req.body.finalval[0].product_brand,
                req.body.finalval[0].product_category,
                req.body.finalval[0].product_sub_category,
                req.body.finalval[0].product_price,
                req.body.finalval[0].product_image,
                req.body.finalval[0].product_stock_count,
                req.body.finalval[0].product_discount
              
        ]
        db.query(q,value,(err,data)=>
            {
                if(err)
                    {
                        console.log(err)
                    }
                else
                {
                    
                    db.query("INSERT INTO images (`name`,`color`,`file`) values (?,?,?)",[req.body.finalval[0].product_name,"white", `./images/${req.body.finalval[0].product_image}`],(err,data)=>
                        {
                            if(err)
                                {
                                    console.log(err)
                                }
                            else
                            {
                                
                                console.log("DONE")
                            }
                        })
                }
            })
    })
app.get("/subtype",(req,res)=>
{
const q = "SELECT * FROM master_product_category";
db.query(q,(err,data)=>
{
if(err)
    {
        console.log("ERROR IN BACKEND")
    }
else
{
    console.log("data=>",data)
    return res.json(data);
}
})
})
app.post("/subtype",(req,res)=>
{


    db.query("SELECT * FROM master_product_category",(err,data)=>
    { 
        var flag = 0;
        if(err)
    {
        console.log("ERROR IN BACKEND")
    }
    else
    {
        for(let i=0;i<data.length;i++)
            {
                
                if(data[i].category_id==req.body.data.id)
                    {
                        flag=1;
                    }
            }    
    }
    if(flag==0)
        {
            console.log("ERROR IN BACKEND")
            return res.json("1");
        }
    else
    {
        
        db.query("SELECT * FROM master_product_sub_category",(err,data)=>
            { 
            var flag = 0;
            if(err)
            {
                console.log("ERROR IN BACKEND")
            }
            else
            {
                for(let i=0;i<data.length;i++)
                    {
                        
                        if(data[i].subcategory_name==req.body.data.name)
                            {
                                flag=2;
                            }
                    }    
                    if(flag==2)
                    {
                        console.log("ERROR IN BACKEND")
                        return res.json("2");
                    }
                    else
                    {
                        console.log("I REACHED 2");
                        console.log("I REACHED 3");
                        const q = "INSERT INTO master_product_sub_category (`category_id`, `subcategory_name`) VALUES (?, ?)";
                        const value = [
                        req.body.data.id,
                        req.body.data.name,
                        ];
                        console.log(req.body.data.id)
                        db.query(q,value,(err,data)=>
                        {
                        if(err)
                        {
                        console.log("ERROR IN BACKEND")
                        console.log(false);
                        }
                        else
                        {
                        return res.json(data);
                        }
                        })
                                }
                        }})
    }
})
})

    
app.post("/type", (req,res)=>
{

    var err_arr=[];
    db.query("SELECT category_name from master_product_category",(err,data)=>
        {   
            if (err) 
            {
                console.log(err)
                return res.json(err);
            }
        console.log("data=>" , data);
            var cur=[]
            for(var i=0; i<data.length; i++)
            {
                cur.push(data[i].category_name);
            }
            if(cur.includes(req.body.type))
            {

                err_arr.push
                ({
                    type: "Type already exist"
                })
            }

            if(err_arr.length!=0)
                {
    
                    return res.json(err_arr);
                }
            const q = "INSERT INTO master_product_category (`category_name`) VALUES (?)";
            console.log(req.body.type);
            db.query(q,req.body.type,(err,data)=>
                {
                    if(err)
                    {
                        return res.json(false);
                    }
                    else
                    {
                        return res.json(true);
                    }
                }) 
        })
        
    
})

/*

*/