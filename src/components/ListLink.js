// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'

class ListLink extends Component {
  constructor(props) {
    super(props)

    // DISPLAY WHERE WE ARE
  }

  componentDidMount = () => {
    // DISPLAY WHERE WE ARE
  }

  handleLoadList = () => {
    let controls = document.getElementById('list-controls-div')
    controls.style.display = 'initial'

    this.props.tps.clearAllTransactions()

    this.props.loadToDoListCallback(this.props.toDoList)
  }

  handleDoubleClick = (e) => {
    let list = this.props.toDoList
    let parentDiv = e.target.parentElement
    let divChild = parentDiv.removeChild(parentDiv.firstChild)

    let inputElement = document.createElement('input')
    inputElement.setAttribute('type', 'text')
    inputElement.setAttribute('value', divChild.textContent)
    inputElement.setAttribute('class', 'list-input')
    parentDiv.insertBefore(inputElement, parentDiv.firstChild)
    inputElement.addEventListener('focusout', function () {
      if (inputElement.value != list.name) {
        list.name = inputElement.value
        divChild.textContent = list.name
      }
      inputElement.replaceWith(divChild)

      parentDiv.firstChild.setAttribute(
        'class',
        'todo-list-button todo-lists-list'
      )
    })
  }

  render() {
    // DISPLAY WHERE WE ARE
    console.log(this.props.currentList.id)
    console.log(this.props.toDoList.id)
    let selectedColor = ''
    if (this.props.currentList.id === this.props.toDoList.id) {
      selectedColor = 'todo-list-button selected-list'
    } else {
      selectedColor = 'todo-list-button'
    }
    return (
      <div
        className={selectedColor}
        onClick={this.handleLoadList}
        onDoubleClickCapture={this.handleDoubleClick}
      >
        {this.props.toDoList.name}
        <br />
      </div>
    )
  }
}

export default ListLink
