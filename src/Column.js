import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Task from './Task';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;
  display: flex
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;

`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 200ms ease-in;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
  flex-grow: 1;
  min-height: 100px;
`;

class Column extends Component {
  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id}>

          {/* The `provided` object has a property `droppableProps`.
            These are props that needs to be applied to the components 
            that you want to designate as your droppable.
          */}
          {
            (provided, snapshot) => {
              return (
                <TaskList 
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                  >

                  {this.props.tasks.map((task, index)=> <Task key={task.id} task={task} index={index}/>)}
                  {/* `provided.placeholder` is used to increase the available space
                      in a droppable during a drag when it's needed.
                  */}
                  {provided.placeholder}
                </TaskList>
              )
            }
          }
        </Droppable>
      </Container>
    )
  }
}

export default Column;