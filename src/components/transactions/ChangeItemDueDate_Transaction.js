'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from '../../common/jsTPS.js'

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeItemDueDate_Transaction extends jsTPS_Transaction {
  constructor(app, item, new_date) {
    super()
    this.app = app
    this.item = item
    this.previousDueDate = null
    this.new_date = new_date
  }

  doTransaction() {
    // MAKE A NEW ITEM
    this.previousDueDate = this.item.due_date
    this.app.updateDueDate(this.new_date, this.item.id)
  }

  undoTransaction() {
    this.app.updateDueDate(this.previousDueDate, this.item.id)
  }
}
