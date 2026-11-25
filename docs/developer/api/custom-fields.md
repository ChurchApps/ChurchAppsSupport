---
title: "Custom Person Fields"
description: "API reference for custom person fields in B1: define fields, read and write each person's values, and filter people and saved lists by them."
---

# Custom Person Fields

<div class="article-intro">

Churches add their own fields to person records in B1 Admin, such as a background-check expiry date, a shirt size, or a class status (see [Custom Fields](../../b1-admin/settings/custom-fields.md)). The API exposes them as two resources: a **field** is the definition (a name and a type), and a **field value** is what one person has stored for one field. Every value is stored as a string, whatever the field's type.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Send a JWT or an [API key](./api-keys.md) in the `Authorization: Bearer` header on every request
- Reading fields and values needs the `People.View` permission
- Creating, changing, or deleting fields and writing values needs `People.Edit`

</div>

## Permissions and Scopes

Both resources live in the Membership module and check the same people permissions as the rest of a person's record.

| Action | Permission | Scope on an API key or OAuth token |
|---|---|---|
| List fields, read values | `People.View` | `people:read` (also included in `people:write`) |
| Create, update, or delete a field; set or clear values | `People.Edit` | `people:write` |

A [scope](./api-keys.md#scopes) only narrows a credential. The person behind the key or token must hold the permission as well.

A request without the permission is answered with **401** and an empty JSON object (`{}`). Everything is limited to the church the credential belongs to. A `churchId` sent in a request body is ignored.

## Fields

| Method & Path | Purpose |
|---|---|
| `GET /membership/personfields` | List the church's fields, ordered by `sort` and then `name` |
| `POST /membership/personfields` | Create (no `id`) or update (with `id`) one or more fields. The body is an array |
| `DELETE /membership/personfields/:id` | Delete a field and every value stored for it |

A field has these properties:

| Property | Type | Notes |
|---|---|---|
| `id` | string | Assigned by the API when the field is created. Send it to update a field |
| `churchId` | string | Always set from the credential |
| `name` | string | The label staff see in B1 Admin. Up to 100 characters |
| `fieldType` | string | One of the six [field types](#field-types) |
| `choices` | string | `Multiple Choice` only. A JSON **string** holding an array of `{ "value": "...", "text": "..." }` objects. Left out of the response when the field has none |
| `sort` | number | Optional whole number used to order the list |

Create two fields:

```http
POST /membership/personfields
Authorization: Bearer <token>
Content-Type: application/json

[
  { "name": "Background check expires", "fieldType": "Date" },
  {
    "name": "Shirt size",
    "fieldType": "Multiple Choice",
    "choices": "[{\"value\":\"S\",\"text\":\"Small\"},{\"value\":\"M\",\"text\":\"Medium\"}]"
  }
]
```

The response is the saved fields, in the order you sent them, each with its `id`:

```json
[
  { "id": "a1B2c3D4e5F", "churchId": "AbC123XyZ90", "name": "Background check expires", "fieldType": "Date" },
  {
    "id": "g6H7i8J9k0L",
    "churchId": "AbC123XyZ90",
    "name": "Shirt size",
    "fieldType": "Multiple Choice",
    "choices": "[{\"value\":\"S\",\"text\":\"Small\"},{\"value\":\"M\",\"text\":\"Medium\"}]"
  }
]
```

Things to know when saving fields:

- **Nothing is validated.** The API stores `name`, `fieldType`, and `choices` as sent. It does not check that `fieldType` is one of the six types or that `choices` is valid JSON, so check both before you post.
- **Send the whole field on an update.** In particular, leaving `choices` out of an update clears it.
- **Changing `fieldType` does not convert stored values.** Values already saved keep the string they had.

`DELETE /membership/personfields/:id` removes the field's values first and then the field, and returns `{}`. There is no undo.

## Field Types

`fieldType` is one of the names B1 Admin offers when a field is created. The API does not check a value against its field's type. The formats below are the ones B1 Admin writes and the ones its profile, search, and list screens expect, so write the same.

| `fieldType` | Stored `value` | Example |
|---|---|---|
| `Textbox` | The text as entered | `"Blue"` |
| `Whole Number` | The number as a string | `"3"` |
| `Decimal` | The number as a string | `"12.5"` |
| `Date` | The date as `YYYY-MM-DD` | `"2027-03-31"` |
| `Yes/No` | `True` or `False`, capitalised | `"True"` |
| `Multiple Choice` | The `value` of the chosen choice, not its `text` | `"M"` |

- B1 Admin shows a `Yes/No` value of `True` as Yes and `False` as No, and shows nothing for any other string.
- B1 Admin shows a `Multiple Choice` value as the `text` of the matching choice, or the raw value when no choice matches.
- A value can hold up to 4,000 characters.

## Field Values

| Method & Path | Purpose |
|---|---|
| `GET /membership/personfieldvalues/person/:personId` | Every value stored for one person |
| `GET /membership/personfieldvalues/field/:fieldId` | One field's value for every person who has one |
| `POST /membership/personfieldvalues` | Set or clear values. The body is an array of `{ personId, fieldId, value }` |

A value has an `id`, `churchId`, `personId`, `fieldId`, and `value`. There is at most one value per person per field, and a person who has never had a field filled in has no row for it. Treat a missing value as blank.

Set one value and clear another for the same person:

```http
POST /membership/personfieldvalues
Authorization: Bearer <token>
Content-Type: application/json

[
  { "personId": "Pq7Rs2Tu4Vw", "fieldId": "a1B2c3D4e5F", "value": "2027-03-31" },
  { "personId": "Pq7Rs2Tu4Vw", "fieldId": "g6H7i8J9k0L", "value": "" }
]
```

```json
[
  { "id": "m1N2o3P4q5R", "churchId": "AbC123XyZ90", "personId": "Pq7Rs2Tu4Vw", "fieldId": "a1B2c3D4e5F", "value": "2027-03-31" }
]
```

- **Values are matched on person and field.** You never send a value's `id`. Posting a value for a person and field that already have one replaces it.
- **An empty value deletes the row.** Send `""` or `null`, or leave `value` out, to clear a field. There is no `DELETE` route for values.
- **The response is the person's full set of values.** For every person named in the request, the API returns all of the values they now have, including fields you did not send.
- **Ids are not checked.** The API does not confirm that `personId` and `fieldId` exist before it stores a value.

## Filtering People and Saved Lists

Custom fields can filter people in two places. Both compare against the stored string, so use the formats under [Field Types](#field-types).

**People search.** `POST /membership/people/advancedSearch` takes an array of conditions (see [Membership Endpoints](./endpoints/membership.md#people)). A condition whose `field` is `personField_` followed by a field's id filters on that field:

```json
[
  { "field": "personField_a1B2c3D4e5F", "operator": "lessThan", "value": "2026-12-01" }
]
```

Custom-field conditions are combined with AND, together with any standard conditions in the same request. A condition that names a field that does not exist returns no one.

**Saved lists.** A [saved list](../../b1-admin/people/lists.md) stores its filter as a `rules` tree on `/membership/lists`. A custom-field condition in that tree uses the `field` provider and puts the field's id in `entityId`:

```json
{
  "match": "all",
  "conditions": [
    { "provider": "field", "entityId": "a1B2c3D4e5F", "operator": "lessThan", "value": "2026-12-01" }
  ]
}
```

Post `{ "rules": ... }` to `/membership/lists/preview` (needs `People.View`) to get the matching people without saving a list.

The operators depend on the field's type:

| `fieldType` | Operators |
|---|---|
| `Whole Number`, `Decimal` | `equals`, `greaterThan`, `greaterThanEqual`, `lessThan`, `lessThanEqual`. Both sides are read as numbers |
| `Date` | `equals` (the same calendar day), `greaterThan` (after), `lessThan` (before) |
| `Textbox`, `Yes/No`, `Multiple Choice` | `equals`, `contains`, `startsWith`, `endsWith`, ignoring case. `contains` is the default |

Only stored values are compared, so a person with no value for the field never matches, whatever the operator. A number or date that cannot be read does not match either.

## Set Field Actions

Two automations can write a custom field without calling the endpoints above: the **Set Field** action on a workflow step (see [Setting a field](../../b1-admin/serving/workflows.md#setting-a-field)) and the `setField` action on a saved list, which runs for each person the nightly refresh adds to the list. Both name their target in a `field` property. A custom field is addressed as `personField_` followed by the field's id, the same form the people search uses:

```json
{ "field": "personField_a1B2c3D4e5F", "value": "True" }
```

- **The value is stored as given.** It follows the same rules as `POST /membership/personfieldvalues`: it is not checked against the field's type, and an empty value clears what the person had.
- **An unknown field id is rejected.** If the church has no field with that id (for example, because the field was deleted), nothing is written. A workflow logs the failed action in the card's history and goes on to the step's remaining actions. A list refresh logs the error and goes on with the rest of the refresh.
- **A workflow action can also carry `fieldLabel`.** B1 Admin saves the field's name there, and the card's history shows it in place of the `personField_` key.
- A `field` without the prefix names one of the built-in person fields instead.

## Related Pages

- [Custom Fields](../../b1-admin/settings/custom-fields.md) -- How church staff define fields and fill them in from B1 Admin
- [API Keys](./api-keys.md) -- Creating a key and choosing its scopes
- [Membership Endpoints](./endpoints/membership.md) -- The people endpoints these fields attach to
