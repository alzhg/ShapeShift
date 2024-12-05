/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uj6z14lrlh5mad9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "toqvfud2",
    "name": "language",
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

  // remove
  collection.schema.removeField("toqvfud2")

  return dao.saveCollection(collection)
})