import styles from "./Tutorial.module.css";
import checkoutInfo from "../assets/images/checkout_information.png";
import checkoutPayment from "../assets/images/checkout_payment.png";

export default function Tutorial() {
  return(
    <div className={styles["Tutorial"]}>
      <main className={styles["main"]}>
        <div className={styles["Instructions"]}>
        <h2>Tutorial</h2>
        <p>Fit City was designed to be a standalone fake e-commerce website.  To get started, sign up for a new account and start buying products.</p>
        <p>If you don't want to create a new account, you can sign in with the credentials:</p>
        <b>username: user1@gmail.com or user2@gmail.com</b>
        <b>password: Password1234!</b>
        <p>Or, sign up and login with your email and password of choice. If you sign up with a real email, you will receive a confirmation email indicating that you have been activated as customer for the store fitcitydev.</p>
        <p>Please note that being activated as a customer for the store means that your email is saved by the store. If you wish your customer account to be unactivated, please email me anytime at <a href="mailto: info@kevin.sangabriel.io">info@kevinsangabriel.io</a>.</p>
        <b><i>Note: Your email is saved for mock purposes. The fitcitydev Shopify store is not operational and only used entirely for entertainment.</i></b>
        <h2>Payments</h2>
        <p>You can play around with purchasing products by adding items to your cart and checking out.</p>
        <img className={styles["img"]} src={checkoutInfo}/>
        <p>For the contact information, enter the email you want your order confirmation sent to. For shipping address, entering a fake address will work.</p>
        <img className={styles["img"]} src={checkoutPayment}/>
        <p>On the checkout page, place a mock order by enter a credit card number of "1" for a successful transaction, or "2" for a failed transaction.</p>
        <p>Enter any date in the future for the date and any 3-digit number for the CVV</p>
        <b><i>Important: Ensure that the contact information you enter is yours. Placing an order will send order confirmation emails to the contact information you supply.</i></b>
        </div>
      </main>
    </div>
  )
}