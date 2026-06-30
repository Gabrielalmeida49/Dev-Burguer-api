
import Stripe from 'stripe';
import * as Yup from 'yup';

// import stripeConfig from '../../../config/stripe.js';

// || stripeConfig.secretKey





const calculateOrderAmount = (items) => {
    const total = items.reduce((acc, current) => {
        return current.price * current.quantity + acc
    }, 0)

    return total
}

class CreatePaymentIntentController {
    async store(request, response) {

                const schema = Yup.object({
                    products: Yup.array()
                        .required()
                        .of(
                            Yup.object({
                                id: Yup.number().required(),
                                quantity: Yup.number().required(),
                                price: Yup.number().required(),
                            }),
                        ),
                });

                try {
			schema.validateSync(request.body, { abortEarly: false, strict: true });
		} catch (err) {
			return response.status(400).json({ error: err.errors });
		}
        
        const { products } = request.body
        const amount = calculateOrderAmount(products);

        const stripe = new Stripe(process.env.DB_SECRETKEY )


               try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency: 'brl',
                automatic_payment_methods: {
                    enabled: true,
                },
            });

            return response.json({
                clientSecret: paymentIntent.client_secret,
                dpmCheckerLink: `https://stripe.com{paymentIntent.id}`
            });
        } catch (stripeError) {
            return response.status(500).json({ error: stripeError.message });
        }
    }

      
 
    }


        
export default new CreatePaymentIntentController();

















    //   const paymentIntent = await stripe.paymentIntents.create({
    //         amount,
    //         currency: 'brl',
    //         automatic_payment_methods: {
    //             enabled: true,
    //         },
    //     });

    //     response.json({
    //         clientSecret: paymentIntent.client_secret,
    //         dpmCheckerLink: `https://stripe.com{paymentIntent.id}`
    //     });

