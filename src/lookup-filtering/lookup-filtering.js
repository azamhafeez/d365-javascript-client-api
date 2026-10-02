var ClientApiExamples = window.ClientApiExamples || {};

ClientApiExamples.LookupFiltering = (function () {
    "use strict";

    var LOOKUP_FIELD = "new_examplelookup";

    function readLookup(executionContext) {
        var attribute = executionContext.getFormContext().getAttribute(LOOKUP_FIELD);
        var value = attribute ? attribute.getValue() : null;
        if (!value || value.length === 0) {
            return null;
        }
        return { id: value[0].id.replace(/[{}]/g, ""), name: value[0].name, entityType: value[0].entityType };
    }

    function clearLookup(executionContext) {
        var attribute = executionContext.getFormContext().getAttribute(LOOKUP_FIELD);
        if (attribute) {
            attribute.setValue(null);
        }
    }

    function setLookup(executionContext, id, name, entityLogicalName) {
        var attribute = executionContext.getFormContext().getAttribute(LOOKUP_FIELD);
        var cleanId = typeof id === "string" ? id.replace(/[{}]/g, "") : "";
        if (!attribute || !cleanId || !entityLogicalName) {
            return false;
        }
        attribute.setValue([{ id: cleanId, name: name || "", entityType: entityLogicalName }]);
        return true;
    }

    function registerLookupFilter(executionContext) {
        var formContext = executionContext.getFormContext();
        var control = formContext.getControl(LOOKUP_FIELD);
        if (!control) {
            return;
        }

        // Store the callback if it must later be passed to removePreSearch.
        control.addPreSearch(function () {
            addActiveRecordsFilter(formContext);
        });
    }

    function addActiveRecordsFilter(formContext) {
        var control = formContext.getControl(LOOKUP_FIELD);
        if (!control) {
            return;
        }
        var filter = "<filter type='and'><condition attribute='statecode' operator='eq' value='0' /></filter>";
        control.addCustomFilter(filter); // Optionally pass an entity logical name as the second argument.
    }

    return {
        readLookup: readLookup,
        clearLookup: clearLookup,
        setLookup: setLookup,
        registerLookupFilter: registerLookupFilter,
        addActiveRecordsFilter: addActiveRecordsFilter
    };
}());
