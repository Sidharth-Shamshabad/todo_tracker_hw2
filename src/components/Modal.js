import React, { Component } from 'react'

class Modal extends Component {
  constructor(props) {
    super(props)
  }
  //   onConfirmClick = (e) => {
  //     var modal_overlay = document.getElementById('modal-overlay')
  //     var modal = document.getElementById('modal')
  //     var confirm_button = document.getElementById('confirm-button')
  //     // confirm_button.onclick = function () {
  //     //   modal_overlay.style.display = 'none'
  //     //   modal.style.display = 'none'
  //     //   //   controls.style.display = 'none'
  //     //   //   appModel.removeCurrentList()

  //     //   // let listsElement = document.getElementById('todo-lists-list')
  //     //   // listsElement.firstChild.setAttribute('class', 'list-sidebar-card')
  //     //   // console.log(listsElement)
  //     // }
  //     // console.log(this.props)
  //   }
  //   onCancelClick = (e) => {
  //     var modal_overlay = document.getElementById('modal-overlay')
  //     var modal = document.getElementById('modal')
  //     var confirm_button = document.getElementById('confirm-button')
  //     var cancel_button = document.getElementById('cancel-button')
  //     cancel_button.onclick = function () {
  //       modal_overlay.style.display = 'none'
  //       modal.style.display = 'none'
  //       //   controls.style.display = 'initial'
  //     }
  //   }
  render() {
    return (
      <div id='modal-overlay' class='modal-overlay'>
        <div id='modal' class='modal'>
          <div class='modal-header header'>
            <h3>Delete List?</h3>
            <div class='modal-close ripple'>×</div>
          </div>
          <div class='modal-header'>
            <div
              id='confirm-button'
              class='modal-button ripple'
              onClick={this.props.removeCurrentList}
            >
              Confirm
            </div>
            <div id='cancel-button' class='modal-button ripple'>
              Cancel
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal
