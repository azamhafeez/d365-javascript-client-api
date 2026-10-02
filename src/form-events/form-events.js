var ClientApiExamples = window.ClientApiExamples || {};

ClientApiExamples.FormEvents = (function () {
    "use strict";

    var TEXT_FIELD = "new_exampletext";
    var BOOLEAN_FIELD = "new_exampleboolean";
    var DATE_FIELD = "new_exampledate";
    var LOOKUP_FIELD = "new_examplelookup";
    var MESSAGE_ID = "example-text-validation";

    function onLoad(executionContext) {
        var formContext = executionContext.getFormContext();
        var textAttribute = formContext.getAttribute(TEXT_FIELD);
        var formType = formContext.ui.getFormType();

        if (textAttribute) {
            textAttribute.addOnChange(onExampleTextChange);
        }

        // Form type can be used to vary initialization without retaining formContext.
        console.debug("Client API example initialized for form type " + formType + ".");
    }

    function onExampleTextChange(executionContext) {
        var formContext = executionContext.getFormContext();
        var source = executionContext.getEventSource();
        var textValue = source && source.getValue ? source.getValue() : null;
        var hasValue = typeof textValue === "string" && textValue.trim().length > 0;
        var booleanAttribute = formContext.getAttribute(BOOLEAN_FIELD);
        var dateAttribute = formContext.getAttribute(DATE_FIELD);
        var dateControl = formContext.getControl(DATE_FIELD);
        var lookupAttribute = formContext.getAttribute(LOOKUP_FIELD);
        var textControl = formContext.getControl(TEXT_FIELD);

        if (booleanAttribute) {
            booleanAttribute.setValue(hasValue);
            booleanAttribute.setSubmitMode("dirty");
        }
        if (dateControl) {
            dateControl.setVisible(hasValue);
        }
        if (dateAttribute) {
            dateAttribute.setRequiredLevel(hasValue ? "required" : "none");
        }
        if (!hasValue && lookupAttribute) {
            lookupAttribute.setValue(null);
        }

        if (textControl) {
            if (textValue && textValue.length > 100) {
                textControl.setNotification("Enter no more than 100 characters.", MESSAGE_ID);
            } else {
                textControl.clearNotification(MESSAGE_ID);
            }
        }
    }

    function onSave(executionContext) {
        var formContext = executionContext.getFormContext();
        var eventArgs = executionContext.getEventArgs();
        var textAttribute = formContext.getAttribute(TEXT_FIELD);
        var value = textAttribute ? textAttribute.getValue() : null;

        if (typeof value === "string" && value.length > 100) {
            eventArgs.preventDefault();
            formContext.ui.setFormNotification(
                "The form was not saved. Shorten the example text and try again.",
                "ERROR",
                MESSAGE_ID
            );
            return;
        }
        formContext.ui.clearFormNotification(MESSAGE_ID);
    }

    return {
        onLoad: onLoad,
        onExampleTextChange: onExampleTextChange,
        onSave: onSave
    };
}());
