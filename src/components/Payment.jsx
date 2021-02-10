import React, { Component } from 'react'
import { Button } from "react-materialize";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";
const apiEndPoint = process.env.REACT_APP_API_URL + "/payment";
class Payment extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }
    makePayment = async (token, tournament) => {
        console.log(token);
        const body = {
            token,
            tournament
        };
        console.log("ali")
        try {
            const res = await axios.post(apiEndPoint, body)
            toast.dark("your payment has been done");
            console.log(res);
        }
        catch (error) {
            toast.dark(error);
        }
    };
    render() {
        //tournament state via props
        const { tournament } = this.props;
        return (
            <>
                <StripeCheckout
                    stripeKey="pk_test_51I7MxrImK1h8PcwnbtRyHBfGKSDYjDV4pVpdjnrWhAH2pzfpwxLGt2vQSMzcE0zxeKHGWaaCSfmgV31DJQEYExKJ00Gu4g3a98"
                    token={(e) => this.makePayment(e, tournament)}
                    name={tournament.name} // tournament name here added
                    amount={tournament.entryfee * 100}// tournamnet entry fee here 
                // shippingAddress
                // billingAddress
                >
                    <Button
                        className="green mr-4"
                    >
                        pay
                  </Button>
                </StripeCheckout>
            </>
        );
    }
}

export default Payment;