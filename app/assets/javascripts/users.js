/* global $, Stripe, */

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
      theBtn.val("Processing").prop('disabled', true);
      
      //collect credit card field.
      var ccNum = $("#card_number").val(), 
        cvcNum = $("#card_code").val(),
        expMonth = $("#card_month").val,
        expYear = $("#card_year").val;
        
        
      //Use Stripe JS Library to Check for Card Errors
      var error = false;
      theBtn.prop('disabled', false).val("Sign Up");
        if(!Stripe.card.validateCardNumber(ccNum)){
          error = true;
          alert("The Credit Card is Not Valid.")
          //if there are errors do not send to stripe
          //validate credit card number
          
        }
        
        if(!Stripe.card.validateExpiry(expMonth, expYear)){
          error = true;
          alert("The Credit Card Expiration Date is Not Valid.")
          //if there are errors do not send to stripe
          //validate credit card number
          
        }
        if(!Stripe.card.validateCVC(cvcNum)){
          error = true;
          alert("The Credit Card CVV Number is Not Valid.")
          //if there are errors do not send to stripe
          //validate credit card number
          
        }else{
          
          //send card info to stripe.
          Stripe.createToken({
            number: ccNum,
            cvc: cvcNum,
            exp_month: expMonth,
            exp_year: expYear
    
            }, stripeResponseHandler);
        }
      
      return false;
    });
  
    
    
    //stripe sends back card token.
    function stripeResponseHandler(status, response){
      
      //get token from response
      var token = response.id;
      
      //inject card token as hidden field into user registration form.
    theForm.append($('<input type="hidden" name="user[stripe_card_token]">').val(token) );
    
    //submit form to rails app.  
    theForm.get(0).submit()
    
    }
    
});
