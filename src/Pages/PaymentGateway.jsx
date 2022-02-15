import React, {useEffect, useState} from 'react'
import { useRef } from 'react';



const Paymentgateway = ({CheckoutAmount, pleaseSubscribeMe, plansExpiryDate, setSubscription_type, setCheckout}) => {
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState(null);
  

  const paypalRef = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Your description",
                amount: {
                  currency_code: "USD",
                  value: CheckoutAmount,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaid(true);
          setCheckout(false);
          console.log("Paykment Amount : "+CheckoutAmount);
          if(CheckoutAmount===349){
            pleaseSubscribeMe('Monthly', 349, plansExpiryDate);
            setSubscription_type('Monthly');
          }
          else if(CheckoutAmount===2349){
            pleaseSubscribeMe('Yearly', 2349, plansExpiryDate);
            setSubscription_type('Yearly');
          }
          console.log(order);
        },
        onError: (err) => {
          console.error(err);
        },
      })
      .render(paypalRef.current);
  }, []);

  if (paid) {
    return <button className="subscribe_btn subscribed">Subscribed</button>;
  }

  // If any error occurs
  if (error) {
    return <div style={{"color":"red"}}>Error Occurred in processing payment.! Please try again.</div>;
  }

  return (
    <div className="payment-div">
    <div>
      <div ref={paypalRef} />
    </div>
    </div>
  );
}

export default Paymentgateway;