
import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors())
const API_URL = 'https://magic-dashboard-api.herokuapp.com/api';
const PORT = process.env.PORT || 3001;

//SIGN IN
app.post('/login', bodyParser.json(), async function (req, res ) {
  await fetch( API_URL + '/v1/login', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "email" : req.body?.email,
        "password" : req.body?.password
      })
    })
    .then( response => {
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(response.status, { 'Content-Type': 'application/json' });
        return response.json() 
      })
    .then( imp => {
      res.write(JSON.stringify({ token: imp.token }));
    })
    .catch( error => {
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(error.status, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify({ message : error }));
    });
    
    res.end();
}).listen(PORT);


//just in case SIGN OUT
app.get('/logout', bodyParser.json(), async function (req, res ) {

  if( req.headers['authorization'] ){
    
    await fetch( API_URL + '/v1/logout', {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': req.headers['authorization']
      },
    }).then( response => {
      res.setHeader('Content-Type', 'application/json',);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify({ message: 'success' }));
    })
    .catch( error => {
      console.log({ message: error })
    })
  }
  else{
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ message: 'you are already logged out' }));
  }
  
  res.end();
})


//GET USERS LIST
app.get('/users', bodyParser.json(), async function (req, res ) {

  if( req.headers['authorization'] ){
    await fetch( API_URL + '/v1/users', {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': req.headers['authorization']
      },
    })
    .then( response => {
      res.setHeader('Content-Type', 'application/json',);
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.write(JSON.stringify(response))
    })
    .catch( error => {
      console.log({ message: error })
    })
  }
  else{
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ message: 'please before login' }));
  }
  
  res.end();
})


//GET USER BY ID
app.get('/users/view/:id', bodyParser.json(), async function (req, res ) {

  if( req.headers['authorization'] ){
    await fetch( API_URL + '/v1/users/view/' + req.params.id, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': req.headers['authorization']
      },
    })
    .then( response => {
      res.setHeader('Content-Type', 'application/json',);
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.write(JSON.stringify(response))
    })
    .catch( error => {
      console.log({ message: error })
    })
  }
  else{
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ message: 'please before login' }));
  }
  
  res.end();
})


//UPDATE USERS PROFILE
app.put('/users/update/:id', bodyParser.json(), async function (req, res ) {

  if( req.headers['authorization'] ){
    if( req.body.name && req.body.language &&
        req.body.status && req.body.min_bet &&
        req.body.max_bet && req.body.user_level  &&
        req.body.password && req.body.password_confirmation)
    {
      await fetch( API_URL + '/v1/users/view/' + req.params.id, {
        method: "PUT",
        headers: {
          'authority': 'localhost:5000',
          'Accept': 'application/json',
          'Authorization': req.headers['authorization'],
          'Content-Type': 'application/json',
          'origin': 'https://localhost:5000',
          'referer': 'https://localhost:5000'
        },
        body: JSON.stringify({
          "name" : req.body.name,
          "language_id": req.body.language,
          "status": req.body.status,
          "min_bet": req.body.min_bet,
          "max_bet": req.body.max_bet,
          "user_level": req.body.user_level,
          "password" : req.body.password,
          "password_confirmation" : req.body.password_confirmation
        })
      })
      .then( response => {
        res.setHeader('Content-Type', 'application/json',);
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify(response))
      })
      .catch( error => {
        console.log({ message: error })
      })
    }
  }
    
  else{
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ message: 'please before login' }));
  }
  
  res.end();
})

//DEPOSIT MONEY TO USER'S ACCOUNT
app.put('/deposits/store/:id', bodyParser.json(), async function (req, res ) {

  if( req.headers['authorization'] ){
    if( req.body.amount && req.body.notes )
    {
      await fetch( API_URL + '/v1/deposits/store', {
        method: "PUT",
        headers: {
          'authority': 'localhost:5000',
          'Accept': 'application/json',
          'Authorization': req.headers['authorization'],
          'Content-Type': 'application/json',
          'origin': 'https://localhost:5000',
          'referer': 'https://localhost:5000'
        },
        body: JSON.stringify({
          amount: req.body.amoun,
          notes: req.body.notes,
          user_id : req.params.id
        })
      })
      .then( response => {
        res.setHeader('Content-Type', 'application/json',);
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify(response))
      })
      .catch( error => {
        console.log({ message: error })
      })
    }
  }
    
  else{
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ message: 'please before login' }));
  }
  
  res.end();
})