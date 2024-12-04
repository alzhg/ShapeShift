/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uj6z14lrlh5mad9")

  // remove
  collection.schema.removeField("75mjhdy3")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xucvyt0h",
    "name": "photo",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uj6z14lrlh5mad9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "75mjhdy3",
    "name": "photo",
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

  // remove
  collection.schema.removeField("xucvyt0h")

  return dao.saveCollection(collection)
})
