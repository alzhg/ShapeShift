/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v2kxokyc9j8h7de")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bopiu1rp",
    "name": "field",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v2kxokyc9j8h7de")

  // remove
  collection.schema.removeField("bopiu1rp")

  return dao.saveCollection(collection)
})
