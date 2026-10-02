var ClientApiExamples = window.ClientApiExamples || {};

ClientApiExamples.CommandBar = (function () {
    "use strict";

    async function markExampleComplete(primaryControl) {
        var formContext = getFormContext(primaryControl);
        var attribute = formContext && formContext.getAttribute("new_exampleboolean");
        if (!attribute) {
            await Xrm.Navigation.openAlertDialog({ text: "The required column is not available on this form." });
            return;
        }

        attribute.setValue(true);
        attribute.setSubmitMode("always");
        try {
            await formContext.data.save();
            formContext.ui.setFormNotification("The change was saved.", "INFO", "command-result");
        } catch (error) {
            console.error("Command save failed.", error);
            await Xrm.Navigation.openErrorDialog({ message: "The change could not be saved. Try again or contact support." });
        }
    }

    async function openCurrentRecord(primaryControl) {
        var formContext = getFormContext(primaryControl);
        if (!formContext || !formContext.data || !formContext.data.entity) {
            return;
        }
        var id = formContext.data.entity.getId().replace(/[{}]/g, "");
        var entityName = formContext.data.entity.getEntityName();
        if (id) {
            await Xrm.Navigation.openForm({ entityName: entityName, entityId: id, openInNewWindow: true });
        }
    }

    function getFormContext(primaryControl) {
        // PrimaryControl is the form context for a main-form command.
        return primaryControl && primaryControl.data && primaryControl.ui ? primaryControl : null;
    }

    function canRun(primaryControl) {
        var formContext = getFormContext(primaryControl);
        return Boolean(formContext && formContext.data.entity.getId());
    }

    return { markExampleComplete: markExampleComplete, openCurrentRecord: openCurrentRecord, canRun: canRun };
}());
