/* global $, Stripe, stripeResponseHandler */

//jquery document ready.
$(document).on('turbolinks:load', function(){
  var theForm = $("#pro_form");
  var theBtn = $("#form-signup-btn");

    //set stripe public key.
    Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content'));
    
    //when user clicks form submit button
    theBtn.click(function(event){
    //prevent default submission from form.
      event.preventDefault()
      
      //collect credit card field.
      var ccNum = $("#card_number").val(), 
        CVV = $("#card_code").val(),
        expMonth = $("#card_month").val,
        expYear = $("#card_year").val;
        
      //send card info to stripe.
      Stripe.createToken({
        number: ccNum,
        cvc: CVV,
        exp_month: expMonth,
        exp_year: expYear
  
      }, stripeResponseHandler);
    });
  
    
    
    //stripe sends back card token.
    //inject card token as hidden field into user registration form.
    //submit form to rails app.  
    
});
