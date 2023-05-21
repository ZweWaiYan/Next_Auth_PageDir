migrate((db) => {
  const collection = new Collection({
    "id": "j31oeylbvn9snxr",
    "created": "2023-05-14 10:14:51.220Z",
    "updated": "2023-05-14 10:14:51.220Z",
    "name": "usersInfo",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "t38s7pyb",
        "name": "phone",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "334gdnfa",
        "name": "password",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "abl4tiho",
        "name": "confirm_pw",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("j31oeylbvn9snxr");

  return dao.deleteCollection(collection);
})
