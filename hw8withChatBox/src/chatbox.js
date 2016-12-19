
const express = require('express')
var http = require('http').Server(express);
var io = require('socket.io')(http);


const sendChatBox = (req, res) =>
{
  
    res.sendfile('chatbox.html');

}

const chatAuth = (req, res) =>
{
   if(loggedInUserCount>1)
   {
    res.send({result:"success"})
   }
   else
   {
    res.send({result:"fail"})
   }

}

module.exports = app => 
{
     app.get('/chatAuth', chatAuth);

     app.get('/chatbox', sendChatBox);
      
}
