'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from '../../common/jsTPS.js'

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeItemStatus_Transaction extends jsTPS_Transaction {
  constructor(app, item, new_status) {
    super()
    this.app = app
    this.item = item
    this.previousStatus = null
    this.new_status = new_status
  }

  doTransaction() {
    // MAKE A NEW ITEM
    this.previousStatus = this.item.status
    this.app.updateStatus(this.new_status, this.item.id)
  }

  undoTransaction() {
    this.app.updateStatus(this.previousStatus, this.item.id)
  }
}
