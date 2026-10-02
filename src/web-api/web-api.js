var ClientApiExamples = window.ClientApiExamples || {};

ClientApiExamples.WebApi = (function () {
    "use strict";

    async function retrieveRecord(entityLogicalName, id) {
        try {
            return await Xrm.WebApi.retrieveRecord(entityLogicalName, cleanGuid(id), "?$select=new_exampletext,new_exampledate");
        } catch (error) {
            await showError("The record could not be retrieved.", error);
            throw error;
        }
    }

    async function retrieveRecords(entityLogicalName) {
        try {
            var query = "?$select=new_exampletext,new_exampledate&$filter=statecode eq 0&$top=50";
            return await Xrm.WebApi.retrieveMultipleRecords(entityLogicalName, query);
        } catch (error) {
            await showError("The records could not be retrieved.", error);
            throw error;
        }
    }

    async function createRecord(entityLogicalName, textValue) {
        try {
            return await Xrm.WebApi.createRecord(entityLogicalName, { new_exampletext: textValue });
        } catch (error) {
            await showError("The record could not be created.", error);
            throw error;
        }
    }

    async function updateRecord(entityLogicalName, id, values) {
        try {
            // Allow-list properties before calling this helper when values come from an external source.
            return await Xrm.WebApi.updateRecord(entityLogicalName, cleanGuid(id), values);
        } catch (error) {
            await showError("The record could not be updated.", error);
            throw error;
        }
    }

    async function deleteRecord(entityLogicalName, id) {
        try {
            return await Xrm.WebApi.deleteRecord(entityLogicalName, cleanGuid(id));
        } catch (error) {
            await showError("The record could not be deleted.", error);
            throw error;
        }
    }

    function cleanGuid(value) {
        return typeof value === "string" ? value.replace(/[{}]/g, "") : "";
    }

    async function showError(userMessage, error) {
        console.error(userMessage, error);
        await Xrm.Navigation.openErrorDialog({ message: userMessage });
    }

    return {
        retrieveRecord: retrieveRecord,
        retrieveRecords: retrieveRecords,
        createRecord: createRecord,
        updateRecord: updateRecord,
        deleteRecord: deleteRecord
    };
}());
