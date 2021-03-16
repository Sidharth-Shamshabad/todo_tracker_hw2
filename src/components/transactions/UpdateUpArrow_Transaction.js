'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from '../../common/jsTPS.js'

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class UpdateUpArrow_Transaction extends jsTPS_Transaction {
  constructor(app, item) {
    super()
    this.app = app
    this.item = item
    this.id = item.id
  }

  doTransaction() {
    // MAKE A NEW ITEM
    this.id = this.item.id
    this.app.updateUpArrow(this.item.id)
  }

  undoTransaction() {
    this.app.updateDownArrow(this.item.id)
  }
}
