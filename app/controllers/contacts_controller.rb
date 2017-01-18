class ContactsController < ApplicationController
    
    # GET Request to /contact-us
    #Show new contact form
    def new
        @contact = Contact.new
    end
    # POST request /contacts
    def create
        # Mass assignment of form fields into Contact Object
        @contact = Contact.new(contact_params)
        if @contact.save
            # Store form fields via parameters, into variables
            name = params[:contact][:name]
            email = params[:contact] [:email]
            body = params[:contact][:comments]
            #Plug variables into Contact Mailer
            #email method and send email
            ContactMailer.contact_email(name, email, body).deliver
            #Send success message when message is sent
            flash[:success] = "Message Sent"
            redirect_to new_contact_path
        else
            #Store errors to Flash Hash...
            #...and redirect to new action
            flash[:danger] = @contact.errors.full_messages.join(", ")
            redirect_to new_contact_path
        end
    end
        private
        #To collect data from forms we need to use
        #strong parameters and whitelist the form fields
            def contact_params
                params.require(:contact).permit(:name, :email, :comments)
            end
end
