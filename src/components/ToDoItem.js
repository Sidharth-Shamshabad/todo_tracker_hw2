// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import Close from '@material-ui/icons/Close'
import ChangeItemDescription_Transaction from './transactions/ChangeItemDescription_Transaction'
import ChangeItemDueDate_Transaction from './transactions/ChangeItemDueDate_Transaction'
import ChangeItemStatus_Transaction from './transactions/ChangeItemStatus_Transaction'
import UpdateUpArrow_Transaction from './transactions/UpdateUpArrow_Transaction'
import UpdateDownArrow_Transaction from './transactions/UpdateDownArrow_Transaction'
import RemoveItem_Transaction from './transactions/RemoveItem_Transaction'

class ToDoItem extends Component {
  constructor(props) {
    super(props)

    // DISPLAY WHERE WE ARE
    // console.log('\t\t\tToDoItem ' + this.props.toDoListItem.id + ' constructor')
  }

  componentDidMount = () => {
    // DISPLAY WHERE WE ARE
    // console.log('\t\t\tToDoItem ' + this.props.toDoListItem.id + ' did mount')
  }

  onDescriptionClick = (e) => {
    let add_button = document.getElementById('add-list-button')
    add_button.style.pointerEvents = 'none'
    add_button.style.cursor = 'not-allowed'
    add_button.style.hover = 'disabled'
    add_button.style.color = 'gray'

    let listItem = this.props.toDoListItem
    let parentDiv = e.target.parentElement
    let divChild = parentDiv.removeChild(parentDiv.firstChild)
    let inputElement = document.createElement('input')
    inputElement.focus()
    inputElement.setAttribute('type', 'text')
    inputElement.setAttribute('value', divChild.textContent)
    inputElement.setAttribute('class', 'task-col-input')
    parentDiv.insertBefore(inputElement, parentDiv.firstChild)
    let tps = this.props.tps
    let app = this.props.app

    inputElement.addEventListener('focusout', function () {
      if (inputElement.value != divChild.textContent) {
        let transaction = new ChangeItemDescription_Transaction(
          app,
          listItem,
          inputElement.value
        )
        tps.addTransaction(transaction)
      }
      inputElement.replaceWith(divChild)
      add_button.style.cursor = 'pointer'
      add_button.style.hover = 'enabled'
      add_button.style.color = '#ffc819'
      add_button.style.pointerEvents = 'visible'
    })
  }

  onDueDateChange = (e) => {
    let add_button = document.getElementById('add-list-button')
    add_button.style.pointerEvents = 'none'
    add_button.style.cursor = 'not-allowed'
    add_button.style.hover = 'disabled'
    add_button.style.color = 'gray'

    let listItem = this.props.toDoListItem
    let parentDiv = e.target.parentElement
    let divChild = parentDiv.firstChild.nextSibling

    let inputElement = document.createElement('input')
    inputElement.setAttribute('type', 'date')
    inputElement.setAttribute('value', listItem.dueDate)
    inputElement.setAttribute('class', 'due-date-col-input')

    parentDiv.firstChild.nextSibling.replaceWith(inputElement)

    let tps = this.props.tps
    let app = this.props.app

    inputElement.addEventListener('focusout', function () {
      if (inputElement.value != listItem.dueDate) {
        let transaction = new ChangeItemDueDate_Transaction(
          app,
          listItem,
          inputElement.value
        )
        tps.addTransaction(transaction)
      }
      inputElement.replaceWith(divChild)
      add_button.style.cursor = 'pointer'
      add_button.style.hover = 'enabled'
      add_button.style.color = '#ffc819'
      add_button.style.pointerEvents = 'visible'
    })
  }

  onStatusChange = (e) => {
    let add_button = document.getElementById('add-list-button')
    add_button.style.pointerEvents = 'none'
    add_button.style.cursor = 'not-allowed'
    add_button.style.hover = 'disabled'
    add_button.style.color = 'gray'
    let listItem = this.props.toDoListItem
    let parentDiv = e.target.parentElement
    let divChild = parentDiv.firstChild.nextSibling.nextSibling
    let currentStatus = listItem.status
    let optionElement = document.createElement('select')
    optionElement.setAttribute('id', 'optionID')
    optionElement.setAttribute('class', 'status-col-select')
    let option1 = document.createElement('option')
    option1.setAttribute('value', 'complete')
    option1.innerHTML = 'complete'
    option1.addEventListener('click', function (params) {
      currentStatus = params.target.value
    })
    let option2 = document.createElement('option')
    option2.setAttribute('value', 'incomplete')
    option2.innerHTML = 'incomplete'
    option2.addEventListener('click', function (params) {
      currentStatus = params.target.value
    })
    if (currentStatus == option1.innerHTML) {
      optionElement.appendChild(option1)
      optionElement.appendChild(option2)
    } else {
      optionElement.appendChild(option2)
      optionElement.appendChild(option1)
    }
    parentDiv.firstChild.nextSibling.nextSibling.replaceWith(optionElement)

    let tps = this.props.tps
    let app = this.props.app

    optionElement.addEventListener('focusout', function (event) {
      if (currentStatus != listItem.status) {
        let transaction = new ChangeItemStatus_Transaction(
          app,
          listItem,
          optionElement.value
        )
        tps.addTransaction(transaction)
        divChild.className = 'status-' + optionElement.value
      }
      optionElement.replaceWith(divChild)
      add_button.style.cursor = 'pointer'
      add_button.style.hover = 'enabled'
      add_button.style.color = '#ffc819'
      add_button.style.pointerEvents = 'visible'
    })
  }

  onArrowUpClick = (e) => {
    let listItem = this.props.toDoListItem

    let tps = this.props.tps
    let app = this.props.app

    if (this.props.toDoList[0] === listItem) {
      return
    } else {
      let transaction = new UpdateUpArrow_Transaction(app, listItem)
      tps.addTransaction(transaction)
    }
  }

  onArrowDownClick = (e) => {
    let listItem = this.props.toDoListItem

    let tps = this.props.tps
    let app = this.props.app

    if (this.props.toDoList[this.props.toDoList.length - 1] === listItem) {
      return
    } else {
      let transaction = new UpdateDownArrow_Transaction(app, listItem)
      tps.addTransaction(transaction)
    }
  }

  onRemoveClick = (e) => {
    let listItem = this.props.toDoListItem

    let tps = this.props.tps
    let app = this.props.app

    let transaction = new RemoveItem_Transaction(app, listItem)
    tps.addTransaction(transaction)
  }

  render() {
    // DISPLAY WHERE WE ARE
    let listItem = this.props.toDoListItem
    let statusType = 'status-complete'
    if (listItem.status === 'incomplete') statusType = 'status-incomplete'

    let upColorCheck =
      this.props.toDoListItem === this.props.toDoList[0] ? 'gray' : 'white'
    let upCursorCheck =
      this.props.toDoListItem === this.props.toDoList[0]
        ? 'not-allowed'
        : 'pointer'

    let downColorCheck =
      this.props.toDoListItem ===
      this.props.toDoList[this.props.toDoList.length - 1]
        ? 'gray'
        : 'white'

    let downCursorCheck =
      this.props.toDoListItem ===
      this.props.toDoList[this.props.toDoList.length - 1]
        ? 'not-allowed'
        : 'pointer'

    return (
      <div id={'todo-list-item-' + listItem.id} className='list-item-card'>
        <div className='item-col task-col' onClick={this.onDescriptionClick}>
          {listItem.description}
        </div>
        <div className='item-col due-date-col' onClick={this.onDueDateChange}>
          {listItem.due_date}
        </div>
        <div
          className='item-col status-col'
          className={statusType}
          onClick={this.onStatusChange}
        >
          {listItem.status}
        </div>
        <div className='item-col test-4-col'></div>
        <div className='item-col list-controls-col'>
          <KeyboardArrowUp
            className='list-item-control todo-button arrowUp'
            onClick={this.onArrowUpClick}
            style={{
              color: upColorCheck,
              cursor: upCursorCheck,
              marginLeft: '10px',
            }}
          />
          <KeyboardArrowDown
            className='list-item-control todo-button arrowDown'
            onClick={this.onArrowDownClick}
            style={{
              color: downColorCheck,
              cursor: downCursorCheck,
              marginLeft: '20px',
            }}
          />
          <Close
            className='list-item-control todo-button close-button'
            onClick={this.onRemoveClick}
            style={{
              marginLeft: '20px',
            }}
          />
          <div className='list-item-control'></div>
          <div className='list-item-control'></div>
        </div>
      </div>
    )
  }
}

export default ToDoItem
