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
    console.log('App constructor')

    // MAKE OUR TRANSACTION PROCESSING SYSTEM
    this.tps = new jsTPS()

    // CHECK TO SEE IF THERE IS DATA IN LOCAL STORAGE FOR THIS APP
    let recentLists = localStorage.getItem('recentLists')
    console.log('recentLists: ' + recentLists)
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
    console.log(this.tps.hasTransactionToUndo())
    if (this.tps.hasTransactionToUndo()) {
      this.tps.undoTransaction()
    }
  }

  // WILL LOAD THE SELECTED LIST
  loadToDoList = (toDoList) => {
    console.log('loading ' + toDoList)

    // MAKE SURE toDoList IS AT THE TOP OF THE STACK BY REMOVING THEN PREPENDING
    const nextLists = this.state.toDoLists.filter(
      (testList) => testList.id !== toDoList.id
    )
    nextLists.unshift(toDoList)

    this.setState({
      toDoLists: nextLists,
      currentList: toDoList,
    })
  }

  updateCurrentList = (newList) => {
    this.setState({
      todoLists: [...this.state.toDoLists],
      // currentList: [...this.state.currentList],
      // currentList: newList,
      useVerboseFeedback: true,
    })
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

    this.setState({
      toDoLists: [...this.state.toDoLists],
      currentList: { items: [] },
      // nextListId: highListId + 1,
      // nextListItemId: highListItemId + 1,
      useVerboseFeedback: true,
    })
  }

  makeNewToDoList = () => {
    let newToDoList = {
      id: this.highListId,
      name: 'Untitled',
      items: [],
    }
    return newToDoList
  }

  makeNewToDoListItem = () => {
    let newToDoListItem = {
      description: 'No Description',
      dueDate: 'none',
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

    // WILL THIS WORK? @todo
    let toDoListsString = JSON.stringify(this.state.toDoLists)
    localStorage.setItem('recent_work', toDoListsString)
  }

  updateDescription = (new_desc, id) => {
    console.log(this.state.currentList.items)
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
    console.log(new_date)
    for (let i = 0; i < this.state.currentList.items.length; i++) {
      const element = this.state.currentList.items[i]
      if (element.id === id) {
        element.due_date = new_date
        this.updateCurrentList(this.state.toDoLists)
        break
      }
    }
  }

  render() {
    let items = this.state.currentList.items
    return (
      <div id='root'>
        <Navbar />
        <LeftSidebar
          toDoLists={this.state.toDoLists}
          loadToDoListCallback={this.loadToDoList}
          addNewListCallback={this.addNewList}
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
        />
        <Modal removeCurrentList={this.removeCurrentList} />
      </div>
    )
  }
}

export default App
