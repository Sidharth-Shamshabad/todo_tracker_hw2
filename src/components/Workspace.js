// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import ToDoItem from './ToDoItem'
import Undo from '@material-ui/icons/Undo'
import Redo from '@material-ui/icons/Redo'
import AddBox from '@material-ui/icons/AddBox'
import Delete from '@material-ui/icons/Delete'
import Close from '@material-ui/icons/Close'

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
        // controls.style.display = 'initial'
      }
    }

    var confirm_button = document.getElementById('confirm-button')
    confirm_button.onclick = function () {
      modal_overlay.style.display = 'none'
      modal.style.display = 'none'
      //   controls.style.display = 'none'
      // console.log(props)
      // this.props.removeCurrentList()

      // let listsElement = document.getElementById('todo-lists-list')
      // listsElement.firstChild.setAttribute('class', 'list-sidebar-card')
      // console.log(listsElement)
    }

    var cancel_button = document.getElementById('cancel-button')
    cancel_button.onclick = function () {
      modal_overlay.style.display = 'none'
      modal.style.display = 'none'
      //   controls.style.display = 'initial'
    }
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
            className='item-col'
            display='flex'
            flexDirection='row'
            flexWrap='nowrap'
          >
            <Undo
              id='undo-button'
              className='list-item-control material-icons todo-button'
            />
            <Redo
              id='redo-button'
              className='list-item-control material-icons todo-button'
            />
            <AddBox
              id='add-item-button'
              className='list-item-control material-icons todo-button'
            />
            <Delete
              id='delete-list-button'
              className='list-item-control material-icons todo-button'
              onClick={this.onDeleteButtonClick}
            />
            <Close
              id='close-list-button'
              className='list-item-control material-icons todo-button'
            />
          </div>
        </div>
        <div id='todo-list-items-div'>
          {this.props.toDoListItems.map((toDoListItem) => (
            <ToDoItem
              key={toDoListItem.id}
              toDoListItem={toDoListItem} // PASS THE ITEM TO THE CHILDREN
            />
          ))}
        </div>
        <br />
      </div>
    )
  }
}

export default Workspace
