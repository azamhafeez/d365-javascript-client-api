var ClientApiExamples = window.ClientApiExamples || {};

ClientApiExamples.Notifications = (function () {
    "use strict";

    var FORM_MESSAGE_ID = "client-api-example";
    var CONTROL_MESSAGE_ID = "client-api-example-control";

    function showFormMessage(executionContext, message, level) {
        var formContext = executionContext.getFormContext();
        formContext.ui.setFormNotification(message, level || "INFO", FORM_MESSAGE_ID);
    }

    function clearFormMessage(executionContext) {
        executionContext.getFormContext().ui.clearFormNotification(FORM_MESSAGE_ID);
    }

    function showFieldMessage(executionContext, message) {
        var control = executionContext.getFormContext().getControl("new_exampletext");
        if (control) {
            control.setNotification(message, CONTROL_MESSAGE_ID);
            control.setFocus();
        }
    }

    function clearFieldMessage(executionContext) {
        var control = executionContext.getFormContext().getControl("new_exampletext");
        return control ? control.clearNotification(CONTROL_MESSAGE_ID) : false;
    }

    return {
        showFormMessage: showFormMessage,
        clearFormMessage: clearFormMessage,
        showFieldMessage: showFieldMessage,
        clearFieldMessage: clearFieldMessage
    };
}());
