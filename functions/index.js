const functions = require('firebase-functions');
//build backend express app and launch on cloud
const express=require("express")
const cors=require("cors");//security
const stripe=require("stripe")('sk_test_51Hrq7ZBTzQtvtPPEZ02QKp5Ks3Z4yRceouxFqMj93XXWUzyWcPK1I64t3IEXlwHdMixbGxE41tff1n1oCN2wG5oL00k2UVwHCx')
//API
//App config
const app=express();
//Middlewares
app.use(cors({origin:true}));
app.use(express.json());

//API routes
app.get('/',(request,response)=>response.status(200).send('hello world'))
app.get('/baks',(request,response)=>response.status(200).send('yo world'))
app.post('/payments/create',async (request,response)=>{
    const total=request.query.total;
    console.log('payment request received boom',total)
    const paymentIntent=await stripe.paymentIntents.create({
        amount:total, //subunits of currency
        currency:"usd",
    })
    //OK-created
    response.status(201).send({
        clientSecret:paymentIntent.client_secret,

    })
})
//Listen command
exports.api=functions.https.onRequest(app)