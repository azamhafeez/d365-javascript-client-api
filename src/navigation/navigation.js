var ClientApiExamples = window.ClientApiExamples || {};

ClientApiExamples.Navigation = (function () {
    "use strict";

    async function openCreateForm(entityLogicalName, initialValues) {
        return Xrm.Navigation.openForm({ entityName: entityLogicalName, useQuickCreateForm: false }, initialValues || {});
    }

    async function openRecord(entityLogicalName, id) {
        var cleanId = typeof id === "string" ? id.replace(/[{}]/g, "") : "";
        if (!entityLogicalName || !cleanId) {
            throw new Error("An entity logical name and record ID are required.");
        }
        return Xrm.Navigation.openForm({ entityName: entityLogicalName, entityId: cleanId });
    }

    async function openRecordDialog(entityLogicalName, id) {
        var cleanId = typeof id === "string" ? id.replace(/[{}]/g, "") : "";
        if (!entityLogicalName || !cleanId) {
            throw new Error("An entity logical name and record ID are required.");
        }
        var pageInput = { pageType: "entityrecord", entityName: entityLogicalName, entityId: cleanId };
        var navigationOptions = { target: 2, position: 1, width: { value: 70, unit: "%" } };
        return Xrm.Navigation.navigateTo(pageInput, navigationOptions);
    }

    async function openCustomPage(customPageName, recordId) {
        var pageInput = {
            pageType: "custom",
            name: customPageName,
            recordId: recordId ? recordId.replace(/[{}]/g, "") : undefined
        };
        return Xrm.Navigation.navigateTo(pageInput, { target: 2, position: 1, title: "Details" });
    }

    return {
        openCreateForm: openCreateForm,
        openRecord: openRecord,
        openRecordDialog: openRecordDialog,
        openCustomPage: openCustomPage
    };
}());
