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

  onDescriptionClick = (e, listItem) => {
    // let parentDiv = e.target.parentElement
    // let divChild = parentDiv.removeChild(parentDiv.firstChild)
    // let inputElement = document.createElement('input')
    // inputElement.focus()
    // inputElement.setAttribute('type', 'text')
    // inputElement.setAttribute('value', divChild.textContent)
    // inputElement.setAttribute('class', 'task-col-input')
    // parentDiv.insertBefore(inputElement, parentDiv.firstChild)
    // inputElement.addEventListener('focusout', function () {
    //   if (inputElement.value != divChild.textContent) {
    //     // thisController.model.changeItemDescriptionTransaction(
    //     //   listItem,
    //     //   inputElement.value
    //     // )
    //     divChild.textContent = listItem.description
    //   }
    //   inputElement.replaceWith(divChild)
    // })
  }

  render() {
    // DISPLAY WHERE WE ARE
    console.log(this.props.toDoListItem)
    let listItem = this.props.toDoListItem
    let statusType = 'status-complete'
    if (listItem.status === 'incomplete') statusType = 'status-incomplete'

    return (
      <div id={'todo-list-item-' + listItem.id} className='list-item-card'>
        <div
          className='item-col task-col'
          onClick={this.onDescriptionClick(listItem)}
        >
          {listItem.description}
        </div>
        <div className='item-col due-date-col'>{listItem.due_date}</div>
        <div className='item-col status-col' className={statusType}>
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
