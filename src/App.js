// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import testData from './test/testData.json'
import jsTPS from './common/jsTPS' // WE NEED THIS TOO

// THESE ARE OUR REACT COMPONENTS
import Navbar from './components/Navbar'
import LeftSidebar from './components/LeftSidebar'
import Workspace from './components/Workspace'
import Modal from './components/Modal'
{
  /*import ItemsListHeaderComponent from './components/ItemsListHeaderComponent'
import ItemsListComponent from './components/ItemsListComponent'
import ListsComponent from './components/ListsComponent'
*/
}
class App extends Component {
  constructor(props) {
    // ALWAYS DO THIS FIRST
    super(props)

    // DISPLAY WHERE WE ARE

    // MAKE OUR TRANSACTION PROCESSING SYSTEM
    this.tps = new jsTPS()

    // CHECK TO SEE IF THERE IS DATA IN LOCAL STORAGE FOR THIS APP
    let recentLists = localStorage.getItem('recentLists')
    if (!recentLists) {
      recentLists = JSON.stringify(testData.toDoLists)
      localStorage.setItem('toDoLists', recentLists)
    }
    recentLists = JSON.parse(recentLists)

    // FIND OUT WHAT THE HIGHEST ID NUMBERS ARE FOR LISTS
    let highListId = -1
    let highListItemId = -1
    for (let i = 0; i < recentLists.length; i++) {
      let toDoList = recentLists[i]
      if (toDoList.id > highListId) {
        highListId = toDoList.id
      }
      for (let j = 0; j < toDoList.items.length; j++) {
        let toDoListItem = toDoList.items[j]
        if (toDoListItem.id > highListItemId) highListItemId = toDoListItem.id
      }
    }

    // SETUP OUR APP STATE
    this.state = {
      toDoLists: recentLists,
      currentList: { items: [] },
      nextListId: highListId + 1,
      nextListItemId: highListItemId + 1,
      useVerboseFeedback: true,
    }
  }

  redo() {
    console.log(this.tps.hasTransactionToRedo())
    if (this.tps.hasTransactionToRedo()) {
      this.tps.doTransaction()
    }
  }

  undo() {
    if (this.tps.hasTransactionToUndo()) {
      this.tps.undoTransaction()
    }
  }

  // WILL LOAD THE SELECTED LIST
  loadToDoList = (toDoList) => {
    // MAKE SURE toDoList IS AT THE TOP OF THE STACK BY REMOVING THEN PREPENDING
    const nextLists = this.state.toDoLists.filter(
      (testList) => testList.id !== toDoList.id
    )
    nextLists.unshift(toDoList)

    this.setState(
      {
        toDoLists: nextLists,
        currentList: toDoList,
      },
      this.afterToDoListsChangeComplete
    )
  }

  updateCurrentList = (newList) => {
    this.setState(
      {
        todoLists: [...this.state.toDoLists],
        // currentList: [...this.state.currentList],
        // currentList: newList,
        useVerboseFeedback: true,
      },
      this.afterToDoListsChangeComplete
    )
    return newList
  }

  addNewList = () => {
    let newToDoListInList = [this.makeNewToDoList()]
    let newToDoListsList = [...newToDoListInList, ...this.state.toDoLists]
    let newToDoList = newToDoListInList[0]

    // AND SET THE STATE, WHICH SHOULD FORCE A render
    this.setState(
      {
        toDoLists: newToDoListsList,
        currentList: newToDoList,
        nextListId: this.state.nextListId + 1,
      },
      this.afterToDoListsChangeComplete
    )
  }

  removeCurrentList = () => {
    console.log(this.state)
    let indexOfList = -1
    for (let i = 0; i < this.state.toDoLists.length && indexOfList < 0; i++) {
      if (this.state.toDoLists[i].id === this.state.currentList.id) {
        indexOfList = i
      }
    }

    this.state.toDoLists.splice(indexOfList, 1)
    this.setState(
      {
        toDoLists: [...this.state.toDoLists],
        currentList: { items: [] },
        // nextListId: highListId + 1,
        // nextListItemId: highListItemId + 1,
        useVerboseFeedback: true,
      },
      this.afterToDoListsChangeComplete
    )
    this.tps.clearAllTransactions()
    let controls = document.getElementById('list-controls-div')
    controls.style.display = 'none'
  }

  removeSelectedList = () => {
    this.setState({
      toDoLists: [...this.state.toDoLists],
      currentList: { items: [] },
      useVerboseFeedback: true,
    })
    this.tps.clearAllTransactions()
  }

  makeNewToDoList = () => {
    let newToDoList = {
      id: this.state.nextListId,
      name: 'Untitled',
      items: [],
    }
    return newToDoList
  }

  checkUndoRedo = () => {
    let undo_button = document.getElementById('undo-button')
    if (this.mostRecentTransaction == -1) {
      undo_button.style.cursor = 'not-allowed'
      undo_button.style.hover = 'disabled'
      undo_button.style.color = 'darkgray'
    } else {
      undo_button.style.cursor = 'pointer'
      undo_button.style.color = 'white'
    }

    let redo_button = document.getElementById('redo-button')
    if (this.mostRecentTransaction == this.numTransactions - 1) {
      redo_button.style.cursor = 'not-allowed'
      redo_button.style.hover = 'disabled'
      redo_button.style.color = 'darkgray'
    } else {
      redo_button.style.cursor = 'pointer'
      redo_button.style.color = 'white'
    }
  }

  makeNewToDoListItem = () => {
    let newToDoListItem = {
      description: 'No Description',
      due_date: 'No Date',
      status: 'incomplete',
      id: this.state.nextListItemId,
    }
    this.setState({
      nextListItemId: this.state.nextListItemId + 1,
    })
    return newToDoListItem
  }

  // THIS IS A CALLBACK FUNCTION FOR AFTER AN EDIT TO A LIST
  afterToDoListsChangeComplete = () => {
    console.log('App updated currentToDoList: ' + this.state.currentList)
    // console.log(this.state.toDoLists)
    // WILL THIS WORK? @todo
    let toDoListsString = JSON.stringify(this.state.toDoLists)
    localStorage.setItem('recentLists', toDoListsString)
  }

  updateDescription = (new_desc, id) => {
    for (let i = 0; i < this.state.currentList.items.length; i++) {
      const element = this.state.currentList.items[i]
      if (element.id === id) {
        element.description = new_desc
        this.updateCurrentList(this.state.toDoLists)
        break
      }
    }
  }

  updateDueDate = (new_date, id) => {
    for (let i = 0; i < this.state.currentList.items.length; i++) {
      const element = this.state.currentList.items[i]
      if (element.id === id) {
        element.due_date = new_date
        this.updateCurrentList(this.state.toDoLists)
        break
      }
    }
  }

  updateStatus = (new_status, id) => {
    for (let i = 0; i < this.state.currentList.items.length; i++) {
      const element = this.state.currentList.items[i]
      console.log(element)
      if (element.id === id) {
        element.status = new_status
        this.updateCurrentList(this.state.toDoLists)
        break
      }
    }
  }

  updateUpArrow = (id) => {
    for (let i = 0; i < this.state.currentList.items.length; i++) {
      const element = this.state.currentList.items[i]
      if (element.id === id && i !== 0) {
        let temp = element
        this.state.currentList.items[i] = this.state.currentList.items[i - 1]
        this.state.currentList.items[i - 1] = temp
        this.updateCurrentList(this.state.toDoLists)
        break
      }
    }
  }

  updateDownArrow = (id) => {
    for (let i = 0; i < this.state.currentList.items.length; i++) {
      const element = this.state.currentList.items[i]
      if (element.id === id && i !== this.state.currentList.items.length) {
        let temp = element
        this.state.currentList.items[i] = this.state.currentList.items[i + 1]
        this.state.currentList.items[i + 1] = temp
        this.updateCurrentList(this.state.toDoLists)
        break
      }
    }
  }

  updateDeleteButton = (id) => {
    for (let i = 0; i < this.state.currentList.items.length; i++) {
      const element = this.state.currentList.items[i]
      if (element.id === id) {
        this.state.currentList.items.splice(i, 1)
        this.updateCurrentList(this.state.toDoLists)
        return i
      }
    }
  }

  addDeletedItem = (item, index) => {
    this.state.currentList.items.splice(index, 0, item)
    this.updateCurrentList(this.state.toDoLists)
  }

  addNewItem = () => {
    let element = this.makeNewToDoListItem()
    this.state.currentList.items.push(element)
    this.updateCurrentList(this.props.toDoListItems)
    return element
  }

  render() {
    let items = this.state.currentList.items
    return (
      <div id='root' className='main-root'>
        <Navbar />
        <LeftSidebar
          toDoLists={this.state.toDoLists}
          loadToDoListCallback={this.loadToDoList}
          addNewListCallback={this.addNewList}
          tps={this.tps}
          currentList={this.state.currentList}
        />
        <Workspace
          toDoListItems={items}
          removeCurrentList={this.removeCurrentList}
          makeNewToDoListItem={this.makeNewToDoListItem}
          updateCurrentList={this.updateCurrentList}
          undo={this.undo}
          redo={this.redo}
          tps={this.tps}
          app={this}
          checkUndoRedo={this.checkUndoRedo}
        />
        <Modal removeCurrentList={this.removeCurrentList} />
      </div>
    )
  }
}

export default App
