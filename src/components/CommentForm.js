import React, { Component } from "react";
import { Label, Modal, ModalHeader, ModalBody,Row,Col,Button} from 'reactstrap';
import { Control,LocalForm,Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state={
            open:false,
            
        }

        this.toggleCommentModel = this.toggleCommentModal.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
      
    }

    toggleCommentModal =() => {
        this.setState({
            open: !this.state.open
        });
    }


    handleSubmitComment = (values)=> {
        this.toggleCommentModal(); 
       this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    

   

    render() {
        return (
            <div>
                <div className="mt-5">
                    <button onClick={this.toggleCommentModal} type="button" class="btn btn-outline-secondary"><i class="fa-solid fa-pencil"></i>Submit Comment</button>
                    </div>
                    <div>
                    <Modal  isOpen={this.state.open} toggle={this.toggleCommentModal} >
                    <ModalHeader toggle={this.toggleCommentModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                         <LocalForm onSubmit={(values) => this.handleSubmitComment(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.text model=".rating" id="rating" name="rating" className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="yourname" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".yourname" id="yourname" name="yourname"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".yourname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comments" md={12}>Comments</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comments" id="comments" name="comments"
                                        className="form-control" rows="10"/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">
                                       Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                 </Modal>
                    </div>
                </div>
                );
    }
}


export default Comment;
