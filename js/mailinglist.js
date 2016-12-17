(function () {
    'use strict';

    var formElement = document.getElementById('mailinglist-form');
    var successMessageElement = document.getElementById('mailinglist-success');
    var errorMessageElement = document.getElementById('mailinglist-error');
    var normalButtonLabelElement = document.getElementById('mailinglist-button-label-normal');
    var pendingButtonLabelElement = document.getElementById('mailinglist-button-label-pending');

    var setDisabledStatus = function (disabled) {
        var i;
        var inputs = formElement.getElementsByTagName('input');
        var buttons = formElement.getElementsByTagName('button');

        for (i = 0; i < inputs.length; i++) {
            inputs[i].disabled = disabled;
        }

        for (i = 0; i < buttons.length; i++) {
            buttons[i].disabled = disabled;
        }
    };

    var setSubmitButtonLabel = function (pending) {
        normalButtonLabelElement.style.display = pending ? 'none' : 'inline';
        pendingButtonLabelElement.style.display = pending ? 'inline' : 'none';
    };

    formElement.addEventListener('submit', function (event) {
        event.preventDefault();

        setDisabledStatus(true);
        setSubmitButtonLabel(true);

        var req = new XMLHttpRequest();
        req.open('POST', formElement.action, true);
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    successMessageElement.style.display = 'block';
                } else {
                    errorMessageElement.style.display = 'block';
                    setDisabledStatus(false);
                    setSubmitButtonLabel(false);
                }
            }
        };
        req.send(new FormData(formElement));

        return false;
    });

    pendingButtonLabelElement.style.display = 'none';
}());
