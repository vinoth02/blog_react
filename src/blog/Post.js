/*-------- index.js ----------*/
import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import moment from 'moment'
import axios from "axios";
import ADDPOST from "./addPost";
import EDITPOST from "./editPost";
import VIEWPOST from "./viewPost";
// import { useHistory } from "react-router-dom";

class Post extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            posts:[],
            newPostData: {
                title: "",
                post: "",
                
              },
              isLoading: false,
              status: "",
              newPostModal: false,

              editPostData: {
                id: "",
                title: "",
                post: "",
               
              },
              editPostModal: false,
              noDataFound: "",

              viewPostData: {
                id: "",
                title: "",
                post: "",
              },
              viewPoostModal: false,
              
            
        };
    }
    

    componentDidMount() {
        this.getPostInfo();
    }

    getPostInfo(){
        axios.get('http://localhost:8000/api/home')
        .then((response) => {
            if (response.status === 200) {
            this.setState({
                posts: response.data.data ? response.data.data : [],
            });
            }
            if (
            response.data.status === "failed" &&
            response.data.success === false
            ) {
            this.setState({
                noDataFound: response.data.message,
            });
            }
        })
    }

    toggleNewPostModal = () => {
        this.setState({
          newPostModal: !this.state.newPostModal,
        });
      };

      onChangeAddPostHandler = (e) => {
        let { newPostData } = this.state;
        newPostData[e.target.name] = e.target.value;
        this.setState({ newPostData });
    };


    addPost = () => {
        axios
          .post(
            "http://localhost:8000/api/store",
            this.state.newPostData
          )
          .then((response) => {
            const { posts } = this.state;
            const newPosts = [...posts];
            newPosts.push(response.data);
            this.setState(
              {
                posts: newPosts,
                newPostModal: false,
                newPostData: {
                  title: "",
                  post: "",
                 
                },
              },
              () => this.getPostInfo()
            );
          });
      };

      toggleEditPostModal = () => {
        this.setState({
          editPostModal: !this.state.editPostModal,
        });
      };

      onChangeEditPostHanler = (e) => {
        let { editPostData } = this.state;
        editPostData[e.target.name] = e.target.value;
        this.setState({ editPostData });
      };

      editPost = (id, title, post) => {
        this.setState({
          editPostData: { id, title, post },
          editPostModal: !this.state.editPostModal,
        });
      };

      updatePost = () => {
        let {
          id,
          title,
          post,
         
        } = this.state.editPostData;
        this.setState({
          isLoading: true,
        });

        axios
          .post("http://localhost:8000/api/store", {
            title,
            post,
            id,
          })
          .then((response) => {
            this.getPostInfo();
            this.setState({
              editPostModal: false,
              editPostData: { title, post },
              isLoading:false,
            });
          })
          .catch((error) => {
            this.setState({isLoading:false})
            console.log(error.response);
          });
      };


      toggleViewPostModal = () => {
        this.setState({
          viewPostModal: !this.state.viewPostModal,
        });
      };

      onChangeViewPostHanler = (e) => {
        let { viewPostData } = this.state;
        viewPostData[e.target.name] = e.target.value;
        this.setState({ viewPostData });
      };

      viewPost = (id, title, post) => {
        this.setState({
          viewPostData: { id, title, post },
          viewPostModal: !this.state.viewPostModal,
        });
      };


      deletePost = (id) => {
        this.setState({
          isLoading: true,
        });
        axios
          .delete("http://localhost:8000/api/destroy/" + id)
          .then((response) => {
            this.setState({
              isLoading: false,
            });
            this.getPostInfo();
          })
          .catch((error) => {
            this.setState({
              isLoading: false,
            });
          });
      };

     
    //     logout = () => {
    //     localStorage.removeItem('user');
    //     history.push("/");
        
    // } ;
   
  render() {

    const {newPostData,editPostData, viewPostData ,noDataFound, posts} = this.state;
      let postsDetails = [];
      if (posts.length) {
        postsDetails = posts.map((post) => {
          
          return (
            <tr key={post.id}>
              <td> <p  Style="color:blue"
               onClick={() =>
                this.viewPost(
                  post.id,
                  post.title,
                  post.post,
                )
              }
              > {post.title} </p></td>
              <td> {moment(post.created_at).format('DD-MM-YYYY')} </td>
              
              <td>
                <Button
                  color="success"
                  className="mr-3"
                  size="sm"

                  onClick={() =>
                    this.editPost(
                      post.id,
                      post.title,
                      post.post,
                    )
                  }
                >
                  Edit
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => this.deletePost(post.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          );
        });
      }

      if (this.state.isLoading) {
        return <div className="spinner-border text-center" role="status"> <span className="sr-only">Loading...</span>
      </div>
      } 

    
    return (
        <div className="App container mt-4">
        <h4 className="font-weight-bold">Blog Post</h4> 
    
    <ADDPOST
       toggleNewPostModal={this.toggleNewPostModal}
       newPostModal={this.state.newPostModal}
       onChangeAddPostHandler={this.onChangeAddPostHandler}
       addPost={this.addPost}
       newPostData={newPostData}
    />
    {/* <Button
     color="danger"
     size="sm"
     onClick={() => this.logout()}
    >
      Logout
    </Button> */}

    <EDITPOST
        toggleEditPostModal={this.toggleEditPostModal}
        editPostModal={this.state.editPostModal}
        onChangeEditPostHanler={this.onChangeEditPostHanler}
        editPost={this.editPost}
        editPostData={editPostData}
        updatePost={this.updatePost}
    />

    <VIEWPOST
      toggleViewPostModal={this.toggleViewPostModal}
      viewPostModal={this.state.viewPostModal}
      onChangeViewPostHandler={this.onChangeViewPostHandler}
      ViewPost={this.viewPost}
      viewPostData={viewPostData}
    />

   

     <Table>
       <thead>
         <tr>
          
            <th>Title</th>
            <th>Created</th>
            <th>Actions</th>
         </tr>
       </thead>
       {posts.length === 0 ? (
         <tbody>
           <h3>{noDataFound}</h3>
         </tbody>
       ) : (
         <tbody>{postsDetails}</tbody>
       )}
     </Table>
   </div>
     )
  }
}

export default Post