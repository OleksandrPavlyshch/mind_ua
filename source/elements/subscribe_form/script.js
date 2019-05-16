$(function () {
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
        
    }
    
    var $subscribeForm = $('#subscribe_form'),
        $subscribeFormInput = $subscribeForm.find('.subscribe-email'),
        $subscribeCloseMessageIcon = $subscribeForm.find('.subscribe-message-close_icon'),
        $subscribeMessageText = $subscribeForm.find('.subscribe-message-text');
        subscribeFocusClass = 'is_focus',
        subscribeErrorClass = 'is_error',
        subscribeSendingClass = 'is_sending',
        subscribeSendedClass = 'is_sended',
        subscribeURL = 'https://mind.ua/ajax/subscription';

    var sendSubscribeRequest = function (data) {
        return $.ajax({
            url: subscribeURL,
            type: 'POST',
            data: data,
            contentType: 'text/plain',
            scriptAttrs: 'crossorigin'
        });
    }
    
    $subscribeForm.submit(function(e) {
        e.preventDefault();
        
        console.log(validateEmail($subscribeFormInput.val()));

        if (validateEmail($subscribeFormInput.val())){
            var data = $(this).serialize();
            $subscribeForm.addClass(subscribeSendingClass);
            sendSubscribeRequest(data)
                .done(
                    function(){
                        setTimeout(function () {
                            $subscribeMessageText.text('Вам надіслано листа для підтвердження');
                            $subscribeForm
                                .addClass(subscribeSendedClass)
                                .removeClass(subscribeSendingClass);
                        }, 1500);
                    }
                )
                .fail(
                    function () {
                        setTimeout(function () {
                            console.log('fail');
                            
                            $subscribeMessageText.text('Щось пішло не так!!!');
                            $subscribeForm
                                .addClass(subscribeSendedClass)
                                .removeClass(subscribeSendingClass);
                        }, 1500);
                    }
                );
        }
    });

    $subscribeCloseMessageIcon.click(function() {
        $subscribeForm.removeClass(subscribeSendedClass);
    });

    $subscribeFormInput.on('input', function (e) {
        var isValid = validateEmail(e.target.value);
       
        if (isValid) {
            console.log(isValid);   
            $subscribeForm.removeClass(subscribeErrorClass);
        }
    });

    $subscribeFormInput.focus(function() {
        $subscribeForm.addClass(subscribeFocusClass);
    });

    $subscribeFormInput.blur(function (e) {
        var val = e.target.value;
        var isValid = validateEmail(val);

        if (!val.length) {
            $subscribeForm
                .removeClass(subscribeFocusClass)
                .removeClass(subscribeErrorClass);
        } else {
            if (!isValid) {
                $subscribeForm
                    .addClass(subscribeErrorClass);
            } else {
                $subscribeForm
                    .removeClass(subscribeErrorClass);
            }
        }
    })
});
