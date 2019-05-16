$(function () {
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
        
    }
    var $subscribeForm = $('#subscribe_form'),
        $subscribeFormInput = $subscribeForm.find('.subscribe-email'),
        subscribeFocusClass = 'is_focus',
        subscribeErrorClass = 'is_error';
    
    $subscribeForm.submit(function(e) {
        e.preventDefault();
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
