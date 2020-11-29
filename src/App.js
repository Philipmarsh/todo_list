import { ListSelector, TextInputComponent } from './TextInputComponent'
import ListArea from './ListArea'
import ListItem from './ListItem'
import { useState, useEffect } from 'react'
import { makeGetCall, makePostCall, makeUpdateCall, makeDeleteCall } from './api_calls';



function App() {

  //state
  const [listID, setListID] = useState('');
  const [listViewChildren, setListViewChildren] = useState([]);

  let childrenList = listViewChildren.map(element => {
    const color = listViewChildren.indexOf(element) % 2 === 0 ? '#ffffff' :'#f2f2f2';
    return <ListItem
      backgroundColor={color}
      item={element}
      removeFunction={removeItemFromListView}
      updateFunction={updateCompletedStatus}
      key={element._id}
    />
  });


  //make get request on app start
  useEffect(() => {
    handleGetRequest();
  }, []);


  //callback functions
  async function changeList(newlist) {
    
    if (newlist.length === 6) {
      localStorage.setItem('listId', newlist.toLowerCase());
      const newState = await makeGetCall(localStorage.getItem('listId'));
      setListID(newState.id);
      setListViewChildren(newState.itemList);
    }
  }

  async function addItemToListView(value) {
    if (value.length > 0) {
      
      const response = await makePostCall(value, localStorage.getItem('listId'));
      
      setListViewChildren(prevState => [...prevState, response.data]);
    }
  }


  async function removeItemFromListView(id) {
    const response = await makeDeleteCall(id);
    if (response.status === 200) {
      setListViewChildren(prevState => prevState.filter((item) => item._id !== id));
    }
  }

  async function updateCompletedStatus(completed, id){
    const response = await makeUpdateCall(completed, localStorage.getItem('listID'),id);
    if(response.status === 200){
      const index = listViewChildren.findIndex(element=>element.id===id);
      listViewChildren[index] = response.data;
    }
  }

  async function handleGetRequest() {
    const response = await makeGetCall(localStorage.getItem('listId'));
    if(response.status===200){
    const newState = response.data;
    localStorage.setItem('listId', newState.id);
    setListID(newState.id);
    setListViewChildren(newState.itemList);
    }
  }





  return (
    <div className='center'>
      <div className='width-70'>
        <div className='row spc-btw'>
          <h1>To do List</h1>
          <h3>List ID: <span>{listID}</span></h3>
        </div>
        <ListSelector
          changeList={changeList} />
        <ListArea
          children={childrenList}
        />
        <TextInputComponent
          addFunction={addItemToListView}
        />
      </div>
      <div className='spacer'></div>
    </div>
  );
}

export default App;
