import PubSub from 'pubsub-js';

export default class ErrorHandler{
    handle(response){
        if (response.status === 400){
            new ValidationHandler().handle(response);
        } else {
            PubSub.publish('flash-message-error', 'Something went wrong during POST');
        }
    }
}

class ValidationHandler{
    handle(response){
        var errors = response.responseJSON.errors;

        errors.map(function(error){
            console.log(error);
            PubSub.publish("flash-validation-error", error);
        });
    }
}
