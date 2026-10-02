var ClientApiExamples = window.ClientApiExamples || {};

ClientApiExamples.Utilities = (function () {
    "use strict";

    function cleanGuid(value) {
        return typeof value === "string" ? value.replace(/[{}]/g, "").toLowerCase() : "";
    }

    function getAttribute(formContext, logicalName) {
        return formContext && formContext.getAttribute ? formContext.getAttribute(logicalName) : null;
    }

    function getControl(formContext, logicalName) {
        return formContext && formContext.getControl ? formContext.getControl(logicalName) : null;
    }

    function getValue(formContext, logicalName, fallbackValue) {
        var attribute = getAttribute(formContext, logicalName);
        var value = attribute ? attribute.getValue() : null;
        return value === null || value === undefined ? fallbackValue : value;
    }

    function setValue(formContext, logicalName, value, fireOnChange) {
        var attribute = getAttribute(formContext, logicalName);
        if (!attribute) {
            return false;
        }

        attribute.setValue(value);
        if (fireOnChange) {
            attribute.fireOnChange();
        }
        return true;
    }

    function getCurrentRecordId(formContext) {
        return formContext && formContext.data && formContext.data.entity
            ? cleanGuid(formContext.data.entity.getId())
            : "";
    }

    function getCurrentEntityLogicalName(formContext) {
        return formContext && formContext.data && formContext.data.entity
            ? formContext.data.entity.getEntityName()
            : "";
    }

    function getCurrentUserId() {
        var userSettings = Xrm.Utility.getGlobalContext().userSettings;
        return cleanGuid(userSettings.userId);
    }

    function getCurrentUserRoles() {
        var roles = [];
        Xrm.Utility.getGlobalContext().userSettings.roles.forEach(function (role) {
            roles.push({ id: cleanGuid(role.id), name: role.name });
        });
        return roles;
    }

    return {
        cleanGuid: cleanGuid,
        getAttribute: getAttribute,
        getControl: getControl,
        getValue: getValue,
        setValue: setValue,
        getCurrentRecordId: getCurrentRecordId,
        getCurrentEntityLogicalName: getCurrentEntityLogicalName,
        getCurrentUserId: getCurrentUserId,
        getCurrentUserRoles: getCurrentUserRoles
    };
}());
