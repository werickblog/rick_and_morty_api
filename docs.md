# Documentation

## Introduction

This documentation will help get you started using the **The rick and morty api**.

## Rate Limit

**The rick and morty api** is an open API, no need for an access token. But, the API is a limit to **10000** requests per day. This is to reduce malicious use of the API example the use of bots. If you exceed your API calls then you should recieve a _429_ _Too many Request_ status. If that happens you will have for allocated day to end.

## What will this API provide you with?

The API will provide _three_ resources, i.e.:

* Characters
* Locations
* Quotes
* Objects/Tools

## How to make API calls?

The whole _API_ is in _REST_ but I plan to work on _graphql_ soon. The root _API_ url is [https://rickandmortyapi.werick.codes/api/v1](https://rickandmortyapi.werick.codes/api/v1) . The data returned as response is of type **JSON**.

## REST

### Info and Pagination

All of the resources mentioned above will be paginated by default with a limit of 20 per page. Also, there are two data values in the payload returned that define the pagination:

* **page** - the current page
* **per\_page** - how many items per page you are given

### Character

#### Character Schema

| Key | Value | Description |
| :--- | :--- | :--- |
| name | string | Name of the character |
| aka | string | AKA name of the character |
| species | string | The species of the character |
| age | number | The age of the character |
| status | string | Define the current status: dead, alive, unknown |
| occupation | array | List of occupations of the character |
| origin | object | Origin location of the character |
| home\_planet | object | Current home location of the character |
| image | string | Image of the character |
| url | string | Bio link to more information about the character |
| dimension | string | Current Dimension of the character |
| bio | string | Short bio about the character |
| character\_id | number | Random id to identify character |
| gender | string | Determine the gender of the character |

#### Get Characters

To fetch all characters in the database use `/characters` endpoint

```bash
GET https://rickandmortyapi.werick.codes/api/v1/characters?pageNo=1&size=20
```

**Response**

```javascript
{
  "status": "success",
  "characters": [
    {
      "occupation": ["Scientist"],
      "_id": "5df978290ae7e940a7c2c082",
      "name": "Rick Sanchez",
      "aka": "Ricky",
      "species": "Humans",
      "age": 65,
      "status": "Alive",
      "origin": {
        "_id": "5df975cb164538405718661a",
        "name": "earth",
        "type": "planet",
        "bio": "Planet earth habitat of the homo sapien",
        "dimension": "C-137",
        "url": "http://localhost:3000",
        "image": "url",
        "location_id": 9921
      },
      "home_planet": {
        "_id": "5df975cb164538405718661a",
        "name": "earth",
        "type": "planet",
        "bio": "Planet earth habitat of the homo sapien",
        "dimension": "C-137",
        "url": "http://localhost:3000",
        "image": "url",
        "location_id": 9921
      },
      "image": "rick sanchez image",
      "url": "http://locahost:5000",
      "dimension": "C-137",
      "bio": "Mad scientist",
      "gender": "Male",
      "character_id": 5178,
      "createdAt": "2019-12-18T00:51:53.331Z",
      "updatedAt": "2019-12-18T00:51:53.331Z",
      "__v": 0
    }
  ],
  "per_page": 20,
  "page": 1
}
```

#### Get Single Character

To fetch a single character use endpoint \`/characters/:character\_id

```bash
GET https://rickandmortyapi.werick.codes/api/v1/characters
```

**Response**

```javascript
{
  "status": "success",
  "character": {
    "occupation": ["Scientist"],
    "_id": "5df978290ae7e940a7c2c082",
    "name": "Rick Sanchez",
    "aka": "Ricky",
    "species": "Humans",
    "age": 65,
    "status": "Alive",
    "origin": {
      "_id": "5df975cb164538405718661a",
      "name": "earth",
      "type": "planet",
      "bio": "Planet earth habitat of the homo sapien",
      "dimension": "C-137",
      "url": "http://localhost:3000",
      "image": "url",
      "location_id": 9921
    },
    "home_planet": {
      "_id": "5df975cb164538405718661a",
      "name": "earth",
      "type": "planet",
      "bio": "Planet earth habitat of the homo sapien",
      "dimension": "C-137",
      "url": "http://localhost:3000",
      "image": "url",
      "location_id": 9921
    },
    "image": "rick sanchez image",
    "url": "http://locahost:5000",
    "dimension": "C-137",
    "bio": "Mad scientist",
    "gender": "Male",
    "character_id": 5178,
    "createdAt": "2019-12-18T00:51:53.331Z",
    "updatedAt": "2019-12-18T00:51:53.331Z",
    "__v": 0
  }
}
```

### Location

#### Location Schema

| Key | Value | Description |
| :--- | :--- | :--- |
| name | string | name of the location |
| type | string | type of the location e.g. planet, country |
| bio | string | short info about the location |
| dimension | string | dimension in which the location exists |
| url | string | extenal info about the location |
| location\_id | number | unique random number to indentify location |
| image | string | image of the location |

#### Get all Locations

To fetch all locations use endpoint `/locations`

```bash
GET https://rickandmortyapi.werick.codes/api/v1/locations?pageNo=1&size=20
```

**Response**

```javascript
{
  "status": "success",
  "locations": [
    {
      "_id": "5df975cb164538405718661a",
      "name": "earth",
      "type": "planet",
      "bio": "Planet earth habitat of the homo sapien",
      "dimension": "C-137",
      "url": "http://localhost:3000",
      "image": "url",
      "location_id": 9921,
      "createdAt": "2019-12-18T00:41:47.093Z",
      "updatedAt": "2019-12-18T00:41:47.093Z",
      "__v": 0
    }
  ],
  "per_page": 20,
  "page": 1
}
```

#### Get Single Location

To fetch a single location use endpoint `/locations/:location_id`

```bash
GET https://rickandmorty.werick.codes/api/v1/locations/:location_id
```

**Response**

```javascript
{
  "status": "success",
  "location": {
    "_id": "5df975cb164538405718661a",
    "name": "earth",
    "type": "planet",
    "bio": "Planet earth habitat of the homo sapien",
    "dimension": "C-137",
    "url": "http://localhost:3000",
    "image": "url",
    "location_id": 9921,
    "createdAt": "2019-12-18T00:41:47.093Z",
    "updatedAt": "2019-12-18T00:41:47.093Z",
    "__v": 0
  }
}
```

### Objects

#### Object Schema

| Key | Value | Description |
| :--- | :--- | :--- |
| name | string | Name of the object/tool |
| status | string | Current status of object, destroyed/perfect |
| origin | object | The location the object exists |
| bio | string | Short info about the object |
| relationship | object | A character that has used the object recently |
| object\_id | number | Unique number to identify the object |
| image | string | Image of the object |
| url | string | external link with more info about the character |

#### Get all objects

To fetch all locations use endpoint `/objects`

```bash
GET https://rickandmortyapi.werick.codes/api/v1/objects?pageNo=1&size=20
```

**Response**

```javascript
{
  "status": "success",
  "objects": [
    {
      "_id": "5df97914981e0e42f85bb8b3",
      "name": "Dimension gun",
      "status": "Lost",
      "origin": {
        "_id": "5df975cb164538405718661a",
        "name": "earth",
        "type": "planet",
        "dimension": "C-137",
        "image": "url",
        "location_id": 9921
      },
      "bio": "Used to by rick open a dimension portal",
      "relationship": {
        "_id": "5df978290ae7e940a7c2c082",
        "name": "Rick Sanchez",
        "aka": "Ricky",
        "image": "rick sanchez image",
        "character_id": 5178
      },
      "image": "raygunimage",
      "url": "http://locahost:5000",
      "object_id": 5099,
      "createdAt": "2019-12-18T00:55:48.480Z",
      "updatedAt": "2019-12-18T00:55:48.480Z",
      "__v": 0
    }
  ],
  "per_page": 20,
  "page": 1
}
```

#### Get single location

To fetch a single location use endpoint `/objects/:object_id`

```bash
GET https://rickandmortyapi.werick.codes/api/v1/objects/:object_id
```

**Response**

```javascript
{
  "status": "success",
  "object": {
    "_id": "5df97914981e0e42f85bb8b3",
    "name": "Dimension gun",
    "status": "Lost",
    "origin": {
      "_id": "5df975cb164538405718661a",
      "name": "earth",
      "type": "planet",
      "dimension": "C-137",
      "image": "url",
      "location_id": 9921
    },
    "bio": "Used to by rick open a dimension portal",
    "relationship": {
      "_id": "5df978290ae7e940a7c2c082",
      "name": "Rick Sanchez",
      "aka": "Ricky",
      "image": "rick sanchez image",
      "character_id": 5178
    },
    "image": "raygunimage",
    "url": "http://locahost:5000",
    "object_id": 5099,
    "createdAt": "2019-12-18T00:55:48.480Z",
    "updatedAt": "2019-12-18T00:55:48.480Z",
    "__v": 0
  }
}
```

### Quotes

#### Quote Schema

| Key | Value | Description |
| :--- | :--- | :--- |
| quote | string | The quote |
| by | object | Details of the person who said that |
| quote\_id | number | Unique quote\_id to identify a single quote |

#### Get all quotes

To fetch all quotes you send a request to this endpoint `/quotes`

```bash
GET https://rickandmortyapi.werick.codes/api/v1/quotes?pageNo=1&size=20
```

**Response**

```javascript
{
  "status": "success",
  "quotes": [
    {
      "_id": "5df97a3d655eec44aea7bb71",
      "quote": "There is nothing such as love",
      "by": {
        "occupation": ["Scientist"],
        "_id": "5df978290ae7e940a7c2c082",
        "name": "Rick Sanchez",
        "aka": "Ricky",
        "species": "Humans",
        "age": 65,
        "status": "Alive",
        "image": "rick sanchez image",
        "url": "http://locahost:5000",
        "dimension": "C-137",
        "bio": "Mad scientist",
        "gender": "Male",
        "character_id": 5178
      },
      "quote_id": 5592,
      "createdAt": "2019-12-18T01:00:45.091Z",
      "updatedAt": "2019-12-18T01:00:45.091Z",
      "__v": 0
    }
  ],
  "per_page": 20,
  "page": 1
}
```

#### Get a Single Quote

To fetch a single quote, you will send a request `/quotes`

```bash
GET https://rickandmortyapi.werick.codes/api/v1/quotes
```

**Response**

```javascript
{
  "status": "success",
  "quote": {
    "_id": "5df97a3d655eec44aea7bb71",
    "quote": "There is nothing such as love",
    "by": {
      "occupation": ["Scientist"],
      "_id": "5df978290ae7e940a7c2c082",
      "name": "Rick Sanchez",
      "aka": "Ricky",
      "species": "Humans",
      "age": 65,
      "status": "Alive",
      "image": "rick sanchez image",
      "url": "http://locahost:5000",
      "dimension": "C-137",
      "bio": "Mad scientist",
      "gender": "Male",
      "character_id": 5178
    },
    "quote_id": 5592,
    "createdAt": "2019-12-18T01:00:45.091Z",
    "updatedAt": "2019-12-18T01:00:45.091Z",
    "__v": 0
  }
}
```

