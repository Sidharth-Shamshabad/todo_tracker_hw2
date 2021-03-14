// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import Close from '@material-ui/icons/Close'

class ToDoItem extends Component {
  constructor(props) {
    super(props)

    // DISPLAY WHERE WE ARE
    console.log('\t\t\tToDoItem ' + this.props.toDoListItem.id + ' constructor')
  }

  componentDidMount = () => {
    // DISPLAY WHERE WE ARE
    console.log('\t\t\tToDoItem ' + this.props.toDoListItem.id + ' did mount')
  }

  onDescriptionClick = (e) => {
    let listItem = this.props.toDoListItem
    let parentDiv = e.target.parentElement
    let divChild = parentDiv.removeChild(parentDiv.firstChild)
    let inputElement = document.createElement('input')
    inputElement.focus()
    inputElement.setAttribute('type', 'text')
    inputElement.setAttribute('value', divChild.textContent)
    inputElement.setAttribute('class', 'task-col-input')
    parentDiv.insertBefore(inputElement, parentDiv.firstChild)
    inputElement.addEventListener('focusout', function () {
      if (inputElement.value != divChild.textContent) {
        // thisController.model.changeItemDescriptionTransaction(
        //   listItem,
        //   inputElement.value
        // )
        listItem.description = inputElement.value
        divChild.textContent = listItem.description
      }
      inputElement.replaceWith(divChild)
    })
  }

  onDueDateChange = (e) => {
    let listItem = this.props.toDoListItem
    let parentDiv = e.target.parentElement
    let divChild = parentDiv.firstChild.nextSibling

    let inputElement = document.createElement('input')
    inputElement.setAttribute('type', 'date')
    inputElement.setAttribute('value', listItem.dueDate)
    inputElement.setAttribute('class', 'due-date-col-input')

    parentDiv.firstChild.nextSibling.replaceWith(inputElement)

    inputElement.addEventListener('focusout', function () {
      if (inputElement.value != listItem.dueDate) {
        // thisController.model.ChangeItemDueDateTransaction(
        //   listItem,
        //   inputElement.value
        // )
        listItem.dueDate = inputElement.value
        divChild.textContent = listItem.dueDate
      }
      inputElement.replaceWith(divChild)
    })
  }

  onStatusChange = (e) => {
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

    optionElement.addEventListener('focusout', function (event) {
      if (currentStatus != listItem.status) {
        // thisController.model.ChangeItemStatusTransaction(
        //   listItem,
        //   currentStatus
        // )
        listItem.status = optionElement.value
        divChild.textContent = listItem.status
        divChild.className = 'status-' + optionElement.value
      }
      optionElement.replaceWith(divChild)
    })
  }

  render() {
    // DISPLAY WHERE WE ARE
    let listItem = this.props.toDoListItem
    let statusType = 'status-complete'
    if (listItem.status === 'incomplete') statusType = 'status-incomplete'

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
          <KeyboardArrowUp className='list-item-control todo-button' />
          <KeyboardArrowDown className='list-item-control todo-button' />
          <Close className='list-item-control todo-button' />
          <div className='list-item-control'></div>
          <div className='list-item-control'></div>
        </div>
      </div>
    )
  }
}

export default ToDoItem
