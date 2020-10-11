import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Task from './Task';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;
const Title = styled.h3`
  padding: 8px;

`;
const TaskList = styled.div`
  padding: 8px;
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
          {provided => (
            /**
             * The provided object has a property called `innerRef`.
             * It is a function used to supply the DOM node of your component
             * to React-DND.
             */
            <TaskList 
              ref={provided.innerRef}
              {...provided.droppableProps}
              >

              {this.props.tasks.map((task, index)=> <Task key={task.id} task={task} index={index}/>)}
              {/* `provided.placeholder` is used to increase the available space
                   in a droppable during a drag when it's needed.
              */}
              {provided.placeholder}
            </TaskList>
          )
          }
        </Droppable>
      </Container>
    )
  }
}

export default Column;