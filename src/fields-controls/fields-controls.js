var ClientApiExamples = window.ClientApiExamples || {};

ClientApiExamples.FieldsControls = (function () {
    "use strict";

    function applyExampleState(executionContext) {
        var formContext = executionContext.getFormContext();
        var textAttribute = formContext.getAttribute("new_exampletext");
        var textControl = formContext.getControl("new_exampletext");
        var dateControl = formContext.getControl("new_exampledate");

        if (!textAttribute) {
            console.warn("The new_exampletext attribute is not present on this form.");
            return;
        }

        var currentValue = textAttribute.getValue();
        if (currentValue === null) {
            textAttribute.setValue("Example value");
            textAttribute.setSubmitMode("dirty"); // Other supported modes: always and never.
        }

        setRequiredLevel(formContext, "new_exampletext", "recommended");

        if (textControl) {
            textControl.setVisible(true);
            textControl.setDisabled(false);
        }
        if (dateControl) {
            dateControl.setVisible(Boolean(textAttribute.getValue()));
            dateControl.setDisabled(false);
        }
    }

    function setControlState(formContext, logicalName, options) {
        var control = formContext && formContext.getControl(logicalName);
        if (!control) {
            return false;
        }
        if (typeof options.visible === "boolean") {
            control.setVisible(options.visible);
        }
        if (typeof options.disabled === "boolean") {
            control.setDisabled(options.disabled);
        }
        return true;
    }

    function setRequiredLevel(formContext, logicalName, level) {
        var supportedLevels = ["required", "recommended", "none"];
        var attribute = formContext && formContext.getAttribute(logicalName);
        if (!attribute || supportedLevels.indexOf(level) === -1) {
            return false;
        }

        attribute.setRequiredLevel(level);
        return true;
    }

    return {
        applyExampleState: applyExampleState,
        setControlState: setControlState,
        setRequiredLevel: setRequiredLevel
    };
}());
