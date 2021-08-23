const mysql = require('mysql');

//connectionPool
const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
   });
   
//view users
exports.view = (req,res) => {
   pool.getConnection((err, connection) => {
       if (err) throw err;
       console.log('connected as ID ' + connection.threadId);

        //user the connection
        connection.query('SELECT * FROM Student', (err, rows) => {
            // when done with the connection, release it
            connection.release();

            if(!err){
                let removeUser = req.query.removed;
                res.render('home', { rows, removeUser });
            } else{
                console.log(err);
            }
            console.log('the data from user table: \n', rows);
        });
   });
}

//find from search
exports.find = (req,res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected as ID ' + connection.threadId);
        let searchTerm = req.body.search;
 
         //user the connection
         connection.query('SELECT * FROM Student WHERE first_name LIKE ? || last_name LIKE ? || ID LIKE ? || Room LIKE ?', [ '%' + searchTerm + '%' , '%' + searchTerm + '%' , '%' + searchTerm + '%' , '%' + searchTerm + '%' ], (err, rows) => {
             // when done with the connection, release it
             connection.release();
 
             if(!err){
                 res.render('home', { rows });
             } else{
                 console.log(err);
             }
             console.log('the data from user table: \n', rows);
         });
    });
} 

exports.form = (req,res) => {
    res.render('add-user');
}

//Add User
exports.create = (req,res) => {
const { ID ,first_name, last_name,Contact,Room,Address,Comment} = req.body;

   pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log('connected as ID ' + connection.threadId);

     //user the connection
     connection.query('INSERT INTO Student SET ID = ?, first_name = ? ,last_name = ?,Contact = ? ,Room = ? , Address =?, Comment = ?',  [ID, first_name, last_name,Contact,Room,Address,Comment], (err, rows) => {
         // when done with the connection, release it
         connection.release();

         if(!err){
             res.render('add-user',{rows, alert:'Student Information added Successfully'});
         } else{
             console.log(err);
         }
         console.log('the data from user table: \n', rows);
     });
});
}

//Edit (localhost:5000/edituser/1)
exports.edit= (req,res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected as ID ' + connection.threadId);
 
         //user the connection
         connection.query('SELECT * FROM Student WHERE ID = ?',[req.params.ID], (err, rows) => {
             // when done with the connection, release it
             connection.release();
 
             if(!err){
                 res.render('edit-user', { rows });
             } else{
                 console.log(err);
             }
             console.log('the data from user table: \n', rows);
         });
    });
}

//update
exports.update= (req,res) => {
    const { ID ,first_name, last_name,Contact,Room,Address,Comment} = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected as ID ' + connection.threadId);
         //user the connection
         connection.query('UPDATE Student SET ID = ?, first_name = ? ,last_name = ?,Contact = ? ,Room = ? , Address =?, Comment = ? WHERE ID =?',  [ID, first_name, last_name,Contact,Room,Address,Comment, req.params.ID], (err, rows) => {
             // when done with the connection, release it
             connection.release();
 
             if(!err){

                pool.getConnection((err, connection) => {
                    if (err) throw err;
                    console.log('connected as ID ' + connection.threadId);
             
                     //user the connection
                     connection.query('SELECT * FROM Student WHERE ID = ?',[req.params.ID], (err, rows) => {
                         // when done with the connection, release it
                         connection.release();
             
                         if(!err){
                             res.render('edit-user', {rows, alert:`Data of ID:${ID} has been updated successfully`});
                         } else{
                             console.log(err);
                         }
                         console.log('the data from user table: \n', rows);
                     });
                });

            } else{
                 console.log(err);
             }
             console.log('the data from user table: \n', rows);
         });
    });
}

//delete
exports.delete= (req,res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected as ID ' + connection.threadId);
 
         //user the connection
         connection.query('DELETE FROM Student WHERE ID = ?',[req.params.ID], (err, rows) => {
             // when done with the connection, release it
             connection.release();
             
             if(!err){
                 let removeUser= encodeURIComponent('Record succesfully removed');
                 res.redirect('/?removed' + removeUser);
             } else{
                 console.log(err);
             }
             console.log('the data from user table: \n', rows);
         });
    });
}

//view
exports.viewall = (req,res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected as ID ' + connection.threadId);
 
         //user the connection
         connection.query('SELECT * FROM Student WHERE ID =?' , [req.params.ID], (err, rows) => {
             // when done with the connection, release it
             connection.release();
 
             if(!err){
                 res.render('view-user', { rows });
             } else{
                 console.log(err);
             }
             console.log('the data from user table: \n', rows);
         });
    });
 }