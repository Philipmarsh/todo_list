import {useState,} from 'react';

function ListItem(props){

    

    const [completed, setCompleted] = useState(props.item.completed);
    const itemStyle = {
        backgroundColor: props.backgroundColor,
        textDecoration: completed?'line-through':'',
        color: completed?'gray':'black',
    };

    async function handleCheckboxClick(){
        setCompleted(prevState=>!prevState);
        await props.updateFunction(!completed, props.item._id);
        
    }



    return(
        <div className='row li-item ' style={itemStyle}>
            <input type='checkbox' onClick={()=>handleCheckboxClick()} defaultChecked={completed}/>
            <p className='li-writing'>{props.item.text}</p>
            <button className='li-button' onClick={()=>props.removeFunction(props.item._id)}><i className="far fa-trash-alt red"></i></button>
            
        </div>
    )
}

export default ListItem;