import { useState } from 'react'


function ListSelector(props) {

    const [value, setValue] = useState('');

    function handleTextChange(e) {
        setValue(e.target.value);
    }

    function handleButtonPress(e) {
        e.preventDefault();
        props.changeList(value);
        setValue('');
    }

    return (
        <div className='row list-id spc-btw'>
            <p>Have the id of a list?</p>
            <form className='row' onSubmit={(e) => handleButtonPress(e)}>
                <input type='text' placeholder='Enter here'
                    value={value} onChange={handleTextChange} />
                <input type='submit' value='Load' />
            </form>
        </div>
    )
}


function TextInputComponent(props) {

    const [textValue, setTextValue] = useState('')

    function updateTextValue(event) {
        setTextValue(event.target.value);
    }

    function handleButtonPress(e) {
        e.preventDefault()

        props.addFunction(textValue);
        setTextValue('');
    }

    return (
        <div className='center'>
            <form className='input-box row' onSubmit={(e) => handleButtonPress(e)}>
                <input type="text" onChange={updateTextValue} value={textValue} placeholder='Enter task here' />
                <button type='submit' className='add-button'><i className="fas fa-plus"></i></button>
            </form>
        </div>
    );
}

export { TextInputComponent, ListSelector };