# Nutri-Map API Reference

Base URL (local): `http://localhost:4000/api`
Auth: `Authorization: Bearer <accessToken>` header, obtained from `POST /api/auth/login`.

## Auth

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | none | Create a user account. Status starts `pending_activation`; an administrator must activate it before login succeeds. |
| POST | `/auth/login` | none | Returns `accessToken`, `refreshToken`, and the user profile. Locks the account for 15 minutes after 5 failed attempts. |
| POST | `/auth/refresh` | none | Exchanges a valid, unrevoked refresh token for a new access token and refresh token (rotation). |
| POST | `/auth/logout` | none | Revokes the given refresh token. |
| GET | `/auth/me` | any | Returns the decoded token payload for the current user. |

### Register request body
```json
{
  "firstName": "Tito",
  "lastName": "Mwaisengela",
  "email": "tito@nutrimap.tz",
  "phoneNumber": "0700000000",
  "password": "StrongPass123!x",
  "roleId": 3
}
```
Password policy: minimum 10 characters, at least one uppercase, one lowercase, one digit, one
symbol.

### Login response
```json
{
  "accessToken": "...",
  "refreshToken": "...",
  "user": { "id": 1, "firstName": "Tito", "lastName": "Mwaisengela", "email": "tito@nutrimap.tz", "role": "administrator", "status": "active" }
}
```

## Producers

All list/get endpoints require authentication. Write endpoints require role
`administrator`, `data_analyst`, or `enumerator`; delete requires `administrator`.

| Method | Path | Description |
|---|---|---|
| GET | `/producers` | Paginated list. Query params: `page`, `limit`, `regionId`, `districtId`, `wardId`, `status`, `verificationStatus`, `search`, `bbox` (`minLon,minLat,maxLon,maxLat`) |
| GET | `/producers/geojson` | Map-ready `FeatureCollection`. Same filters as above minus pagination. |
| GET | `/producers/:id` | Single producer with region/district/ward names included |
| GET | `/producers/:id/profile` | Producer with nested products, raw materials, nutrient profiles, certifications |
| POST | `/producers` | Create. See body fields below |
| PUT | `/producers/:id` | Update any subset of fields |
| DELETE | `/producers/:id` | Soft delete (`status` set to `inactive`) |

### Producer fields (create/update body, camelCase)
Core: `businessName`, `firstName`, `middleName`, `lastName`, `registrationType`
(`formal`|`informal`), `ownershipStructure`, `organizationType`
(`company`|`cooperative`|`farmer_group`|`youth_group`|`women_group`), `tin`, `contactPerson`,
`positionRole`, `phone`, `email`, `regionId` (required), `districtId`, `wardId`,
`physicalAddress` (required), `latitude`/`longitude` (required), `productionCapacity`,
`dailyOutput`, `numberOfEmployees`, `verificationStatus`
(`pending_field_validation`|`field_validated`|`rejected`|`needs_review`), `status`
(`active`|`inactive`), `source`.

Registration/compliance: `brelaRegistrationNumber`, `tbsZfdaRegistrationNumber`,
`sidoRegistrationNumber`, `operationalScale`, `operationalStatus`.

Value chain (field-survey data): `primaryRawMaterials` (string array), `primarySourcingChannels`
(string array), `shortageMonths` (string array), `postHarvestLossPercent` (0-100),
`storageCapacity`, `storageCapacityUnit`, `mainStorageChallenges` (string array),
`nutrientDenseCrops` (string array), `totalAreaHarvestScale`, `areaHarvestUnit`, `averageYield`,
`yieldUnit`, `harvestCyclesPerYear`.

Location/access: `proximityMajorRoadKm`, `proximityMarketKm`, `accessibilityStatus`,
`infrastructureStatus`, `sanitaryStatus`, `dataStatus`
(`production`|`hypothetical_testing`, defaults to `production` for anything entered through the
API; imported test data is tagged `hypothetical_testing`).

## Products

| Method | Path | Description |
|---|---|---|
| GET | `/products` | Paginated list. Query param `producerId` to filter |
| GET | `/products/:id` | Single product with raw materials, nutrient profile, and parent producer |
| POST | `/products` | Create. Body: `producerId` (required), `productName` (required), `category`, `processingMethod`, `shelfLife`, `packagingType`, `pricePerUnit` |
| PUT | `/products/:id` | Update any subset of the above (excluding `producerId`) |
| DELETE | `/products/:id` | Hard delete (cascades to raw materials / nutrient profile) |

## Regions / Districts / Wards

Used for cascading location pickers in the frontend/Flutter client.

| Method | Path | Description |
|---|---|---|
| GET | `/regions` | List all regions |
| GET | `/regions/:id` | Single region (includes `boundary` geometry if set) |
| POST | `/regions` | Create (`administrator` only). Body: `name`, `country` |
| GET | `/districts?regionId=` | List, optionally filtered by region |
| POST | `/districts` | Create (`administrator` only). Body: `name`, `regionId` |
| GET | `/wards?districtId=` | List, optionally filtered by district |
| POST | `/wards` | Create (`administrator` only). Body: `name`, `districtId` |

## System

| Method | Path | Description |
|---|---|---|
| GET | `/health` | Liveness check, no auth required |

## Error format
```json
{ "error": "human readable message" }
```
Validation failures (422) include an `errors` array of `{ field, message }`. Rate-limited
requests return 429. Locked accounts return 423.
