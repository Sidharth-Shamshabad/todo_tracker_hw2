'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from '../../common/jsTPS.js'

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class AddNewItem_Transaction extends jsTPS_Transaction {
  constructor(app) {
    super()
    this.app = app
    this.itemAdded = null
  }

  doTransaction() {
    // MAKE A NEW ITEM
    console.log('test')
    this.itemAdded = this.app.addNewItem()
    console.log(this.itemAdded)
  }

  undoTransaction() {
    this.app.updateDeleteButton(this.itemAdded.id)
  }
}
