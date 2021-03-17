// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'

class ListLink extends Component {
  constructor(props) {
    super(props)

    // DISPLAY WHERE WE ARE
    console.log('\t\t\tListLink ' + this.props.toDoList.key + ' constructor')
  }

  componentDidMount = () => {
    // DISPLAY WHERE WE ARE
    console.log('\t\t\tListLink ' + this.props.toDoList.key + ' did mount')
  }

  handleLoadList = () => {
    this.props.loadToDoListCallback(this.props.toDoList)
  }

  handleDoubleClick = (e) => {
    // console.log(this.props.toDoList)
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
    console.log('\t\t\tListLink render')

    return (
      <div
        className='todo-list-button'
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
