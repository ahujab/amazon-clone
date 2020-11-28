import React,{useState,useEffect} from 'react'
import CheckoutProduct from './CheckoutProduct';
import './Payment.css'
import CurrencyFormat from "react-currency-format";
import { useStateValue } from './StateProvider'
import {useHistory, Link} from "react-router-dom"
import {CardElement, useStripe,useElements} from "@stripe/react-stripe-js";
import { getBasketTotal } from './reducer';
import axios from './axios';
import {db} from './firebase';

function Payment(){
    const [{basket,user},dispatch]=useStateValue();
    const history = useHistory();
    const [succeeded,setSucceeded]=useState(false)
    const [processing,setProcessing]=useState(null)
    const [error,setError]=useState(null)
    const [disabled,setDisabled]=useState(true)
    const stripe=useStripe();
    const[clientSecret,setClientSecret]=useState(true)
    const elements=useElements();
    const handleSubmit=async (event)=>{
        //do stripe stuff
        event.preventDefault();
        setProcessing(true)
        //const payload=await stripe
        const payload=await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:elements.getElement(CardElement)
            }
        }).then(({paymentIntent})=>{
            //nosql data bases
            db
             .collection('users')
             .doc(user?.uid)
             .collection('orders')
             .doc(paymentIntent.id)
             .set({
                 basket:basket,
                 amount:paymentIntent.amount,
                 created:paymentIntent.created
             })
            //paymentIntent=payment confirmation
            setSucceeded(true);
            setError(null);
            setProcessing(false)
            dispatch({
                type:'EMPTY_BASKET'
            })

            history.replace('/orders')
    
        });
        

    }
    const handleChange=event=>{
        //listen for changes in cardelement
        //and displays any errors as customer types their card details
        setDisabled(event.empty) //if event is empty set disabled to true
        setError(event.error? event.error.message:"")
    }
    useEffect(() => {
        //generate secret stripe key which allows us to charge customer
        const getClientSecret=async()=>{
            const response=await axios({
                //stripe expects total in currencies subunits
                //one dollarr=100 cents
                method:'post',
                url:`/payments/create?total=${getBasketTotal(basket)*100}`
                
            });
            console.log(response.data+"hi")
            setClientSecret(response.data.clientSecret);

        }
        getClientSecret();
     }, [basket])

     console.log('secret is>>>',clientSecret)
    return (

        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout(
                        <Link to="/checkout">{basket?.length} items</Link>
                    )
                </h1>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery address</h3>
                    </div>
                    <div className="payment__address">
                    <p>{user?.email}</p>
                    <p> 7 price Road</p>
                    <p> Boston, MA</p>
                </div>
                </div>
                <div className="payment__section">
                <div className="payment__title">
                    <h3>Review items and delivery</h3>
                </div>
                <div className="payment__items">
                    {basket.map(item=>(
                        <CheckoutProduct
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating} 
                    />
                    ))} 
                </div>
            </div>
            <div className="payment__section">
            <div className="payment__title">
                    <h3>Payment Method</h3>
                </div>
                <div className="payment__details">
                    
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/>
                        <div className="payment__priceContainer">
                            <CurrencyFormat
                            renderText={(value)=>(
                                <h3>Order Total: {value}</h3>
                            )}
                            decimalScale={2}
                            value={getBasketTotal(basket)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                            />
                            <button disabled={processing || disabled || succeeded}>
                            <span>{processing ?<p>Processing</p>:"Buy Now" }</span>
                            </button>
                        </div>

                        {/* {errors} */}
                        {error && <div>{error}</div>}
                    </form>
                </div>
            </div>
        </div>
    </div>)
}
export default Payment