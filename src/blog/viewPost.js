
import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  
} from "reactstrap";

export default class viewPost extends Component {
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.viewPostModal}
          toggle={this.props.toggleViewPostModal}
        >
          <ModalHeader toggle={this.props.toggleViewPostModal}>
          {this.props.viewPostData.title}
          </ModalHeader>
          

          <ModalBody>
                         
            {this.props.viewPostData.post}
             
          </ModalBody>
          <ModalFooter>
            
            <Button
              color="secondary"
              onClick={this.props.toggleViewPostModal}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}