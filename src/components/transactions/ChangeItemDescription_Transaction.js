'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from '../../common/jsTPS.js'

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeItemDescription_Transaction extends jsTPS_Transaction {
  constructor(app, item, new_desc) {
    super()
    this.app = app
    this.item = item
    this.previousDescription = null
    this.new_desc = new_desc
  }

  doTransaction() {
    this.previousDescription = this.item.description
    this.app.updateDescription(this.new_desc, this.item.id)
  }

  undoTransaction() {
    this.app.updateDescription(this.previousDescription, this.item.id)
  }
}
