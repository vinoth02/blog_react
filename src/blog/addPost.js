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

export default class addPost extends Component {
  render() {
    return (
      <div>
          <Button
          className="float-right mb-4"
          color="primary"
          onClick={this.props.toggleNewPostModal}
        >
          Add Post
        </Button>
       
        <Modal
          isOpen={this.props.newPostModal}
          toggle={this.props.toggleNewPostModal}
        >
            
        <ModalHeader toggle={this.props.toggleNewPostModal}>
            Add new Post
        </ModalHeader>
          <ModalBody>
            <FormGroup>
            <Label for="title">Title</Label>
            <Input
                id="title"
                name="title"
                value={this.props.newPostData.title}
                onChange={this.props.onChangeAddPostHandler}
            />
            </FormGroup>

            <FormGroup>
            <Label for="post">Post</Label>
            <Input
                type="textarea"
                rows={10}
                id="post"
                name="post"
                value={this.props.newPostData.post}
                onChange={this.props.onChangeAddPostHandler}
            />
            </FormGroup>

            </ModalBody>
            
            <ModalFooter>
                <Button color="primary" onClick={() => this.props.addPost()}>
                Add
                </Button>{" "}
                
                <Button color="secondary" onClick={this.props.toggleNewPostModal}>
                Cancel
                </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}