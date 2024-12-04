/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v2kxokyc9j8h7de")

  // remove
  collection.schema.removeField("ocq0a63a")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v2kxokyc9j8h7de")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ocq0a63a",
    "name": "language",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
