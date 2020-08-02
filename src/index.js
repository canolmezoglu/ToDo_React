import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import Navbar from 'react-bootstrap/Navbar'
class EditElement extends React.Component{
    newRow='';

    constructor(props) {
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange= this.handleChange.bind(this);
        this.handleOnKeyInput= this.handleOnKeyInput.bind(this);
    }

    handleSubmit(e){
        const fullRow=[{
            editRow: '',
            number: ''
        }];
        fullRow.editRow=this.newRow;
        fullRow.number=this.props.id;
        this.props.onEditFinish(fullRow);
        e.preventDefault();
    }
    handleChange(e){
        this.newRow = e.target.value;
    }
    handleOnKeyInput(e){
        if (e.key === 'Enter'|| e.key==='Tab') {
            const fullRow=[{
                editRow: '',
                number: ''
            }];
            fullRow.editRow=this.newRow;
            fullRow.number=this.props.id;
            this.props.onEditFinish(fullRow);
            e.preventDefault();
        }
    }
    render() {
        const row = this.props.row;
        return(
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder={row}
                        aria-describedby="basic-addon2"
                        onChange={this.handleChange}
                        onKeyDown={this.handleOnKeyInput}
                        size="lg"
                    />
                    <InputGroup.Append>
                        <Button variant="primary" size="lg" onClick={this.handleSubmit} >Add</Button>
                    </InputGroup.Append>
                </InputGroup>

        );
    }
}
class ToDoElement extends React.Component{
    constructor(props) {
        super(props);
        this.handleClick=this.handleClick.bind(this);
        this.handleEditBegin=this.handleEditBegin.bind(this);
    }
    handleClick(e){
        this.props.onErase(e.target.value);
    }
    handleEditBegin(e){
        this.props.onEditBegin(e.target.value);
    }

    render() {
        const row = this.props.row;
        const number = this.props.id;
        return (
            <ListGroup.Item
                size="lg"
                style={{fontSize: 25}}
                action variant={(number%2===1) ? 'primary' : 'secondary'}
            >
               <b> {number}</b>  {row}
               <Button
                   variant="danger"
                   size="lg"
                   onClick={this.handleClick}
                   value={this.props.id}
                   style={{float: 'right'}}
               >
                   Erase
               </Button>
                <Button
                    variant="secondary"
                    size="lg"
                    onClick={this.handleEditBegin}
                    value={this.props.id}
                    style={{float: 'right'}}
                >
                    Edit
                </Button>
            </ListGroup.Item>
        );
    }
}
class ToDoTable extends React.Component{
    constructor(props) {
        super(props);
        this.handleErase = this.handleErase.bind(this);
        this.handleEditFinish = this.handleEditFinish.bind(this);
        this.handleEditBegin = this.handleEditBegin.bind(this);

    }
    handleErase(e){
        this.props.onErase(e);
    }
    handleEditFinish(e){
        this.props.onEditFinish(e);
    }
    handleEditBegin(e){
        this.props.onEditBegin(e);
    }
   render() {
       const rows = [];
        this.props.allRows.forEach((toDo) => {
            if (toDo.toDoRow !== '' && toDo.condition === 'notDone') {
                rows.push(
                    <ToDoElement
                        row={toDo.toDoRow}
                        id={toDo.id}
                        onErase={this.handleErase}
                        onEditBegin={this.handleEditBegin}
                    />
                );
            }
            if (toDo.toDoRow !== '' && toDo.condition === 'edit') {
                rows.push(
                    <EditElement
                        row={toDo.toDoRow}
                        id={toDo.id}
                        onEditFinish={this.handleEditFinish}
                    />
                );
            }
    });
       return(

           <div>
           <ListGroup>
             {rows}
           </ListGroup>
           </div>
       );
}
}
class TodoInput extends React.Component {
    toDoInput;
    constructor(props) {
        super(props);
        this.toDoInput='';
        this.handleInput = this.handleInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOnKeyInput = this.handleOnKeyInput.bind(this);
    }
    handleChange(e){
        this.toDoInput = e.target.value;
    }
    handleInput(e){
        this.props.onNewTodo(this.toDoInput);
        e.preventDefault();
    }
    handleOnKeyInput(e){
        if (e.key === 'Enter'|| e.key==='Tab') {
            this.props.onNewTodo(this.toDoInput);
            e.preventDefault();
        }
    }
    render() {
        return (
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Thing to do"
                    aria-describedby="basic-addon2"
                    onChange={this.handleChange}
                    onKeyDown={this.handleOnKeyInput}
                    size="lg"
                />
                <InputGroup.Append>
                    <Button variant="primary" size="lg" onClick={this.handleInput}>Add</Button>
                </InputGroup.Append>
            </InputGroup>

        );
    }
}
function NavigationBar(){
    return(
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">
                <img
                    alt=""
                    width="620"
                    height="60"
                    className="d-inline-block align-top"
                />{' '}
                To-Do List by Can
            </Navbar.Brand>
        </Navbar>
    );
}
class TodoList extends React.Component{
    constructor(props) {
        super(props);
        this.handleNewTodo = this.handleNewTodo.bind(this);
        this.handleEraseTodo=this.handleEraseTodo.bind(this);
        this.handleEditFinish=this.handleEditFinish.bind(this);
        this.handleEditBegin= this.handleEditBegin.bind(this);
        this.state={
            allRows:[{
                id:0,
                toDoRow:'',
                condition:'',
            }],
        }
    }
    handleNewTodo(newToDo){
        const oldRows = this.state.allRows;
        const newRow= [{toDoRow:newToDo,condition:'notDone',id:oldRows.length}];
        const newRows= oldRows.concat(newRow);
        this.setState({allRows: newRows});
    }
    handleEraseTodo(erasingToDo){
        const newRows = this.state.allRows.slice();
        newRows[erasingToDo].condition='done';
        this.setState({allRows: newRows });
    }
    handleEditBegin(editToDo){
        const newRows = this.state.allRows.slice();
        newRows[editToDo].condition='edit';
        this.setState({allRows: newRows });
    }
    handleEditFinish(editToDo){
        const newRows = this.state.allRows.slice();
        newRows[editToDo.number].toDoRow=editToDo.editRow;
        newRows[editToDo.number].condition='notDone';
        this.setState({allRows: newRows });
    }
    render(){
        return(
            <div>
            <NavigationBar/>
                <TodoInput
                    onNewTodo={this.handleNewTodo}
                />
                <ToDoTable
                    allRows={this.state.allRows}
                    onErase={this.handleEraseTodo}
                    onEditBegin={this.handleEditBegin}
                    onEditFinish={this.handleEditFinish}
                />
            </div>
        );
    }
}
ReactDOM.render(
    <TodoList />,
    document.getElementById('root')
);
