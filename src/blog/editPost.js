
import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

export default class editPost extends Component {
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.editPostModal}
          toggle={this.props.toggleEditPostModal}
        >
          <ModalHeader toggle={this.props.toggleEditPostModal}>
            Update Post
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={this.props.editPostData.title}
                onChange={this.props.onChangeEditPostHanler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="post">Post</Label>
              <Input
                type="textarea"
                rows={10}
                id="post"
                name="post"
                value={this.props.editPostData.post}
                onChange={this.props.onChangeEditPostHanler}
              />
            </FormGroup>

            
          </ModalBody>
          <ModalFooter>
            <Button 
              color="primary" 
              onClick={this.props.updatePost}
            >
              Update
            </Button>
            <Button
              color="secondary"
              onClick={this.props.toggleEditPostModal}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}