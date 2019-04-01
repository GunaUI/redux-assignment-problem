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