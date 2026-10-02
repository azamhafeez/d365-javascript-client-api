# Dynamics 365 JavaScript Client API Examples

A portfolio of concise, production-style JavaScript patterns for Microsoft Dynamics 365 Customer Engagement and Power Platform model-driven apps. The examples are deliberately generic: replace the `new_*` placeholders with schema names from your own solution and validate every customization in a development environment.

## Skills demonstrated

- Form event handling with `executionContext` and `formContext`
- Safe field and control manipulation
- Lookup access and reusable pre-search filtering
- Form- and control-level notifications
- Client-side save and date validation
- Asynchronous Dataverse Web API operations
- Record, dialog, and custom-page navigation
- Modern command bar handlers that accept `PrimaryControl`
- Reusable context, GUID, attribute, and control helpers

## Repository structure

```text
src/
├── command-bar/command-bar.js
├── fields-controls/fields-controls.js
├── form-events/form-events.js
├── lookup-filtering/lookup-filtering.js
├── navigation/navigation.js
├── notifications/notifications.js
├── utilities/form-helpers.js
├── validation/validation.js
└── web-api/web-api.js
```

Every file adds functions to the `ClientApiExamples` namespace. The files can be deployed independently; load a file before registering one of its namespaced functions.

## Add a JavaScript web resource

1. Add the required `.js` files to a solution as JavaScript web resources (for example, `new_/clientapi/form-events.js`).
2. Publish the web resources, open the target main form in the form designer, and add them to the form library.
3. Register only the handlers the form requires, save the form, publish, and test with the browser developer console open.
4. Keep source-controlled files as the source of truth; repeat publishing through your normal solution deployment process.

## Register form events

### OnLoad

Add `ClientApiExamples.FormEvents.onLoad` to the form **On Load** event and select **Pass execution context as first parameter**. The example reads the form type and wires a generic field change handler. If the handler is also registered directly in the designer, remove the programmatic registration to avoid running it twice.

### OnChange

Add `ClientApiExamples.FormEvents.onExampleTextChange` to the `new_exampletext` column **On Change** event and pass the execution context. The handler reads the changed value, updates `new_exampleboolean`, clears `new_examplelookup` when appropriate, changes the visibility and requirement level of `new_exampledate`, and displays validation feedback.

### OnSave

Add `ClientApiExamples.FormEvents.onSave` and/or `ClientApiExamples.Validation.onSave` to the form **On Save** event and pass the execution context. Save handlers can call `executionContext.getEventArgs().preventDefault()`; therefore test autosave, explicit save, save-and-close, and any automation that saves the form.

## Configure command bar functions

Create a modern command in the command designer (or an equivalent supported command definition), add the relevant web resource, and call a namespaced handler such as `ClientApiExamples.CommandBar.markExampleComplete`. Pass `PrimaryControl` as the first parameter. Do not pass an execution context to these functions: on a main form, `PrimaryControl` is already the form context. The async `openCurrentRecord` function is also suitable for a button action.

## Replace example schema names

Search the source for `new_exampletext`, `new_examplelookup`, `new_exampledate`, `new_exampleboolean`, and `new_examplechoice`. Replace each placeholder with the logical name of a column in your solution. Also replace parameter values for entity logical names, entity set names, relationship filters, custom-page names, and GUIDs at the call site. Never include braces in OData lookup bindings, and never commit environment-specific URLs, credentials, or record identifiers.

## Important Client API notes

- Obtain `formContext` from the event execution context or the command bar's `PrimaryControl`; do not keep it globally.
- A lookup value is an array of objects containing `id`, `name`, and `entityType`. Setting a lookup requires a valid record ID and entity logical name.
- `addCustomFilter` accepts FetchXML filter XML, not a complete FetchXML query. Escape all externally sourced XML values before inserting them into a filter.
- Web API column names and navigation-property names are not always identical. Confirm metadata before using `@odata.bind`.
- Client validation improves user experience but does not replace server-side validation, security roles, plug-ins, or Dataverse business rules.
- Keep selected columns and returned row counts small. Handle rejected promises and show user-friendly messages rather than raw service details.

## Development and testing disclaimer

These samples are educational starting points, not a drop-in production solution. Test changes in an isolated development or sandbox environment, review them against current Microsoft documentation and organizational standards, and promote them through an approved application lifecycle management process. Browser behavior, privileges, app configuration, and platform updates can affect results.
