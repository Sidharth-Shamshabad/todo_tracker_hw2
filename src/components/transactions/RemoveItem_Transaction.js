'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from '../../common/jsTPS.js'

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class RemoveItem_Transaction extends jsTPS_Transaction {
  constructor(app, item) {
    super()
    this.app = app
    this.item = item
    this.index = null
  }
  //   array.splice(index, 0, item)
  doTransaction() {
    // MAKE A NEW ITEM
    this.index = this.app.updateDeleteButton(this.item.id)
  }

  undoTransaction() {
    this.app.addDeletedItem(this.item, this.index)
  }
}
