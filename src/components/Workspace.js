// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import ToDoItem from './ToDoItem'
import Undo from '@material-ui/icons/Undo'
import Redo from '@material-ui/icons/Redo'
import AddBox from '@material-ui/icons/AddBox'
import Delete from '@material-ui/icons/Delete'
import Close from '@material-ui/icons/Close'
import AddNewItem_Transaction from './transactions/AddNewItem_Transaction'

class Workspace extends Component {
  constructor(props) {
    super(props)
  }

  onDeleteButtonClick = (e) => {
    var modal_overlay = document.getElementById('modal-overlay')
    modal_overlay.style.display = 'block'

    var modal = document.getElementById('modal')
    modal.style.display = 'block'

    window.onclick = function (event) {
      if (event.target == modal_overlay) {
        modal_overlay.style.display = 'none'
        modal.style.display = 'none'
      }
    }

    var confirm_button = document.getElementById('confirm-button')
    confirm_button.onclick = function () {
      modal_overlay.style.display = 'none'
      modal.style.display = 'none'
    }

    var cancel_button = document.getElementById('cancel-button')
    cancel_button.onclick = function () {
      modal_overlay.style.display = 'none'
      modal.style.display = 'none'
    }
  }

  onAddBox = (e) => {
    let tps = this.props.tps
    let app = this.props.app

    let transaction = new AddNewItem_Transaction(app)
    tps.addTransaction(transaction)
  }

  onCloseClick = (e) => {
    this.props.app.removeSelectedList()
    let controls = document.getElementById('list-controls-div')
    controls.style.display = 'none'
  }

  onUndo = () => {
    this.props.undo()
  }

  onRedo = (e) => {
    this.props.redo()
  }

  render() {
    return (
      <div id='workspace'>
        <div id='todo-list-header-card' className='list-item-card'>
          <div id='task-col-header' className='item-col todo-button'>
            Task
          </div>
          <div id='date-col-header' className='item-col todo-button'>
            Due Date
          </div>
          <div id='status-col-header' className='item-col todo-button'>
            Status
          </div>
          <div
            id='list-controls-div'
            className='item-col'
            display='flex'
            flexDirection='row'
            flexWrap='nowrap'
          >
            <Undo
              id='undo-button'
              className='list-item-control material-icons todo-button'
              onClick={this.onUndo}
              style={{
                cursor: 'not-allowed',
                hover: 'disabled',
                color: 'gray',
              }}
            />
            <Redo
              id='redo-button'
              className='list-item-control material-icons todo-button'
              onClick={this.onRedo}
              style={{
                cursor: 'not-allowed',
                hover: 'disabled',
                color: 'gray',
              }}
            />
            <AddBox
              id='add-item-button'
              className='list-item-control material-icons todo-button'
              onClick={this.onAddBox}
            />
            <Delete
              id='delete-list-button'
              className='list-item-control material-icons todo-button'
              onClick={this.onDeleteButtonClick}
            />
            <Close
              id='close-list-button'
              className='list-item-control material-icons todo-button'
              onClick={this.onCloseClick}
            />
          </div>
        </div>
        <div id='todo-list-items-div'>
          {this.props.toDoListItems.map((toDoListItem) => (
            <ToDoItem
              key={toDoListItem.id}
              toDoListItem={toDoListItem} // PASS THE ITEM TO THE CHILDREN
              toDoList={this.props.toDoListItems}
              updateCurrentList={this.props.updateCurrentList}
              undo={this.props.undo}
              redo={this.props.redo}
              tps={this.props.tps}
              app={this.props.app}
            />
          ))}
        </div>
        <br />
      </div>
    )
  }
}

export default Workspace
