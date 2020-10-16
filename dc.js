//엄격한 코드 검사
'use strict';

/************* include library **************/
var express = require('express');
var mysql   = require('mysql');
var api     = express();


/************* Routing **************/
//api Index
api.get('/', (req, res, next) => {


var dbInfo = {

    host: 'ls-712a3de0f216372c332622b5ed5c6f22fe2f67bd.cu0xyssgzj43.ap-northeast-2.rds.amazonaws.com',
    port: '3306',
    user: 'dbmasteruser',
    password:'buackr!!##',
    database: 'BU',
    multipleStatements: true
}


var connection = mysql.createConnection({
    host : dbInfo.host,
    user : dbInfo.user,
    password : dbInfo.password,
    database : dbInfo.database
});

    connection.connect();
    connection.query('SELECT * FROM sensor_data ', function (error, results, fields) {
        if (error) {
            console.log(error);
        }

        console.log(results);
    });
    connection.end();    
    res.send("Welcome is API Fucntion");
});

/************* Routing **************/
//api Index

// get
api.get('/hello2', (req, res, next) => {
    var pId = "0";
    if(req.query.id !== null && req.query.id !== undefined){
        pId = req.query.id;
    }


    res.send("510호 강의실 시설 좋아요"+ pId);
});
// post
api.post('/hello', (req, res, next) => {
    var pId = "0";
/*
    name ,
    number 
*/
    console.log("body.id = "+req.body.id);
    if(req.body.id !== null && req.body.id !== undefined){
        pId = req.body.id;
    }    
    res.send("백석대학교 :"+ pId + "정보는? ");
});

api.post('/insSensor', (req, res, next) => {

    var sensorType = req.body.sensorType;// "";
    var sensorValue = req.body.sensorValue;//"";
    var userId = req.body.userId; //"";
    
    var sql = " insert into sensor_data (sensor_type, sensor_value, sensor_user, ins_date) values ";
    sql += " ('"+ sensorType +"', "+ sensorValue +", '"+ userId +"', now() , now()) ";
    console.log(sql);
    connection.connect();

    console.log("init start");
    connection.query(sql , function(error, results, fields){

        console.log(error);
        console.log(results);
        res.send(results);
    })

});

//Query String
// ex) http://localhost/api/echo?param1=123&param2=321
api.get('/query_echo', (req, res, next) => {
    res.send(req.query);
});


module.exports = api;
