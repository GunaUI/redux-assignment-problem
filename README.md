This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

### Combining Local-UI Statea and Redux
* Get input of name and age ... "AddPerso.js"
* through props.personAdded(personsState.name, ageState.age) we are sending values
```jsx
/// Using constant component ie using useSate....
/// Please check the class based version below for your reference...
import React, { useState } from 'react';
import './AddPerson.css';

const addPerson = (props) =>{
    const [personsState, setPersonsName] = useState(
            { name:""}
    );
    const [ageState, setPersonsAge] = useState(
            {age:""}
    );

    const nameChangedHandler = (event) => {
        setPersonsName( 
            { name: event.target.value}
        )
    }
    const ageChangedHandler = (event) => {
        setPersonsAge( 
            { age: event.target.value}
        )
    }
    return (
        <div className="AddPerson">
            <input type="text" placeholder="Name" onChange={(e) => nameChangedHandler(e)} value={personsState.name}/>
            <input type="number" placeholder="Age"  onChange={(e) => ageChangedHandler(e)} value={ageState.age}/>
            <button onClick={() => props.personAdded(personsState.name, ageState.age)}>Add Person</button>
        </div>
    );

}


export default addPerson;
```
```jsx
///**** We can write the same above code in class based component - Alternate way ......

import React, { Component } from 'react';

import './AddPerson.css';

class AddPerson extends Component {
    state = {
        name: '',
        age: ''
    }

    nameChangedHandler = (event) => {
        this.setState({name: event.target.value});
    }

    ageChangedHandler = (event) => {
        this.setState({age: event.target.value});
    }

    render () {
        return (
            <div className="AddPerson">
                <input 
                    type="text" 
                    placeholder="Name" 
                    onChange={this.nameChangedHandler}
                    value={this.state.name} />
                <input 
                    type="number" 
                    placeholder="Age"
                    onChange={this.ageChangedHandler}
                    value={this.state.age} />
                <button onClick={() => this.props.personAdded(this.state.name, this.state.age)}>Add Person</button>
            </div>
        );
    }
}

export default AddPerson;
```


* Then in Person.js we are passing personAdded to onAddedPerson
```jsx
<AddPerson personAdded={this.props.onAddedPerson} />

const mapDispatchToProps = dispatch => {
    return {
        onAddedPerson: (name, age) => dispatch({type: actionTypes.ADD_PERSON, personData:{name: name, age: age}}),
        onRemovedPerson: (id) => dispatch({type: actionTypes.REMOVE_PERSON, personId: id})
    }
};
```
* then in reducer.js
```jsx
case actionTypes.ADD_PERSON:
      const newPerson = {
          id: Math.random(), // not really unique but good enough here!
          name: action.personData.name,
          age: action.personData.age
      }
      return {
          ...state,
          persons: state.persons.concat( newPerson )
      }
```

* Here we used local UI state to handle input and redux to handle created inputs broder part...
