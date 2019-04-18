const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
const port=process.env.port || 3000;
var app=express();
hbs.registerPartials(__dirname+'/views/partials')

app.use(express.static(__dirname+'/public'));
app.use((req,res,next)=>{
    var log=new Date().toString();
    console.log(`${log}: ${req.method}: ${req.url}`)
    fs.appendFileSync('server-log.txt',log,(err)=>{
        if(err) throw Error;
        console.log('The "data to append" was appended to file!');
    });
    next();
})
// ______________________
// helper taking argument
// hbs.registerHelper('ScreemIT',(text)=>{
//     return text.toUpperCase()
// });
// _____________________
app.set('View engine','hbs');
app.get('/',(req,res)=>{
    res.send('<h1>Hello From Express</h1>');
    res.send({
        name:'Ahmed',
        Likes:[
            'football',
            'biking'
        ]
    })
})
app.get('/home',(req,res)=>{
    res.render('home.hbs',{
        pageTitle:'Home Page Using Dynamic Way',
        Footer:'This is the footer of the page'
    })
})
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'hello From Dynamic property',
        CurentlyDate:new Date().getFullYear()
    });
});
app.listen(port,()=>{
    console.log(`service up Running Now ${port}`);
});
