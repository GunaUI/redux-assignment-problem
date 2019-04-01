This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

### Solution
* First of all install redux to our project.
```jsx
npm install --save redux
```
* next create a store folder to add redux related actions and reducer files 
* "actions.js"
```jsx
export const ADD_PERSON = 'ADD_PERSON';
export const REMOVE_PERSON = 'REMOVE_PERSON';
```
* "reducer.js"
```jsx
import * as actionTypes from './actions';

const initialState = {
    persons: []
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_PERSON:
            const newPerson = {
                id: Math.random(), // not really unique but good enough here!
                name: 'Max',
                age: Math.floor( Math.random() * 40 )
            }
            // here we are concating new person object and then returning the updated state
            return {
              // copy all properties... here it won't need but still later if you add more propeties like persons we need to copy all properties...
                ...state,
                persons: state.persons.concat( newPerson )
            }

        case actionTypes.REMOVE_PERSON:
            // here we filter the particular id and then sent rest of the state to persons object.
            return {
                ...state,
                persons: state.persons.filter(person => person.id !== action.personId)
            }
    }
    return state;
};

export default reducer;
```
* To connect react with redux we need react-redux package , It allow us to hook up our redux store to react application.
```jsx
npm install --save react-redux
```
* "Index.js"
```jsx
//First import createStore and Provider from redux and react-redux respectively..
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './store/reducer';

// here we are creating store with our reducer file
const store = createStore(reducer);
// here we are wrapping our app component with redux provider and pass our store as param to Provider component.
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

```

* In your container file (Perosons.js) add redux logics.
```jsx
import React, { Component } from 'react';
// import connect from react redux to conect mapStateToProps and mapDispatchToProps with the persons component.
import { connect } from 'react-redux';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';
// import actionTypes form actions
import * as actionTypes from '../store/actions';

class Persons extends Component {
    render () {
        return (
            <div>
                <AddPerson personAdded={this.props.onAddedPerson} />
                {this.props.prs.map(person => (
                    <Person 
                        key={person.id}
                        name={person.name} 
                        age={person.age} 
                        clicked={() => this.props.onRemovedPerson(person.id)}/>
                ))}
            </div>
        );
    }
}

// mapStateToProps and assign this.state.prs.map
// here after can access all state with this.props.prs ***

const mapStateToProps = state => {
    return {
        prs: state.persons
    };
};
//mapDispatchToProps and assin to onRemovedPerson and onAddedPerson
const mapDispatchToProps = dispatch => {
    return {
        onAddedPerson: () => dispatch({type: actionTypes.ADD_PERSON}),
        onRemovedPerson: (id) => dispatch({type: actionTypes.REMOVE_PERSON, personId: id})
    }
};
// here we are connecting mapStateToProps and mapDispatchToProps to Persons component.
//We will pass two pieces of information, state and action.
export default connect(mapStateToProps, mapDispatchToProps)(Persons);
```