var ClientApiExamples = window.ClientApiExamples || {};

ClientApiExamples.Validation = (function () {
    "use strict";

    var MESSAGE_ID = "example-validation";

    function onSave(executionContext) {
        var formContext = executionContext.getFormContext();
        var eventArgs = executionContext.getEventArgs();
        var errors = validate(formContext);

        if (errors.length > 0) {
            eventArgs.preventDefault();
            formContext.ui.setFormNotification(errors.map(function (error) { return error.message; }).join(" "), "ERROR", MESSAGE_ID);
            focusFirstInvalidControl(formContext, errors[0].fieldName);
        } else {
            formContext.ui.clearFormNotification(MESSAGE_ID);
        }
    }

    function validate(formContext) {
        var errors = [];
        var dateAttribute = formContext.getAttribute("new_exampledate");
        var conditionAttribute = formContext.getAttribute("new_exampleboolean");
        var textAttribute = formContext.getAttribute("new_exampletext");
        var dateValue = dateAttribute ? dateAttribute.getValue() : null;
        var isRequired = conditionAttribute ? conditionAttribute.getValue() === true : false;
        var textValue = textAttribute ? textAttribute.getValue() : null;

        if (dateValue && dateValue.getTime() < new Date().setHours(0, 0, 0, 0)) {
            errors.push({ fieldName: "new_exampledate", message: "The example date cannot be in the past." });
        }
        if (isRequired && (!textValue || !textValue.trim())) {
            errors.push({ fieldName: "new_exampletext", message: "Enter example text before saving." });
        }
        return errors;
    }

    function focusFirstInvalidControl(formContext, logicalName) {
        var control = formContext.getControl(logicalName);
        if (control) {
            control.setFocus();
        }
    }

    return { onSave: onSave, validate: validate };
}());
