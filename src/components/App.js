import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {

  const [name, setName] = useState("");
  const [list,setList] = useState([]);
  const [isEditing,setIsEditing]= useState(false);
  const [editID,setEditID]= useState(null);
  const [alert,setAlert]= useState({show:true, msg:"Hello", type:"success"});
  const L_S_K='list';

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!name){
      //display alert
      showAlert(true,'please enter value','danger')
    }
    else if(name && isEditing){
      setList(list.map((item)=>{
        if(item.id=== editID){
          return {...list, title:name}
        }
        return item;
      }))

      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true,'Item value changed','success')
    }
    else{
      showAlert(true,'Item added to the list','success')
      const newitem = {id: Date.now() + Math.random(),
        title:name}
        setList([...list,newitem]);
        setName('');
    }

  }

  const showAlert = (show=false,msg="",type="") =>{
    setAlert({show,msg,type});
  }

  const clearList = () =>{
    showAlert(true,'Empty List','danger')
    setList([])
  }

  const removeItem = (id) =>{
    showAlert(true,'Item removed','danger')
    setList(list.filter(item=>{return item.id !== id}))
  }

  const editItem = (id) =>{
    const specificItem = list.find(item=>{return item.id=== id})
    setIsEditing(true);
    setEditID(id)
    setName(specificItem.title)
  }

  useEffect(()=>{
    const storedList = JSON.parse(localStorage.getItem(L_S_K) );
    if(storedList) setList(storedList)
  },[])

  useEffect(()=>{
    localStorage.setItem(L_S_K, JSON.stringify(list))
  },[list])

  
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}> 
      {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/> }
      <h3>grocery tracker</h3>
      <div className="form-control"> 
        <input type="text" placeholder="Add items" className="grocery"
        value={name} onChange={(e)=>{setName(e.target.value)}}
        />
        <button type="submit" className="submit-btn">
          {isEditing ? 'edit' : 'submit'}
        </button>
      </div>
      </form>
      {list.length>0 && (
      <div className="grocery-container"> 
      <List items={list} removeItem={removeItem} editItem={editItem}/>
      <button className="clear-btn" onClick={clearList}>clear items</button>
     </div>
      )}

    </section>
  );
}

export default App
