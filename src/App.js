import './App.css';
import { useState } from 'react';
import contactsJson from './contacts.json'

let contacts = contactsJson.splice(0,5)

function App() {
 
  let [contactList, setContactList] = useState(contacts)

  let randomIndexGenerator = () => Math.floor(Math.random() * contactsJson.length)

  const contactHandler = () =>{

    let randomIndex = randomIndexGenerator()

    setContactList([contactsJson[randomIndex],...contactList])
    contactsJson.splice(randomIndex,1)
  }

  const sortByPopularity = () => {

    let contactListCopy = [...contactList]

    let sortedArr=[]

    sortedArr = contactListCopy.sort((a,b) =>{
        return b.popularity-a.popularity;
    })
    setContactList(sortedArr)
  }

  const sortByName = () => {

    let contactListCopy = [...contactList]

    let sortedArr=[]

    sortedArr = contactListCopy.sort((a,b) =>{
        return a.name.localeCompare(b.name)
    })
    setContactList(sortedArr)
  }

  const deleteContact = (contact, contactIndex) => {
    let contactListCopy = [...contactList]
    contactListCopy.splice(contactIndex,1)
    setContactList(contactListCopy)
    contactsJson.push(contact)
  }
  
  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th colSpan="5"><h1>IronContacts</h1></th>
          </tr>
          <tr>
            <th colSpan="2"><button onClick={contactHandler}>Add Random Contact</button></th>
            <th colSpan="2"><button onClick={sortByPopularity}>Sort By Popularity</button></th>
            <th colSpan="2"><button onClick={sortByName}>Sort By Name</button></th>
          </tr>
          <tr>
            <th><h3>Picture</h3></th>
            <th><h3>Name</h3></th>
            <th><h3>Popularity</h3></th>
            <th><h3>Won Oscar</h3></th>
            <th><h3>Won Emmy</h3></th>
            <th><h3>Actions</h3></th>
          </tr>
        </thead>
        <tbody>

          {contactList.map((contact, index) => {
            //console.log(contact)
            return(
              
            <tr key={contact.id}>
            
                <td><img src={contact.pictureUrl} alt={contact.name} style={{width: 100}}/></td>
                <td>{contact.name}</td>
                <td>{(contact.popularity).toFixed(2)}</td>
                <td>{contact.wonOscar && '🏆'}</td>
                <td>{contact.wonEmmy && '🏆'}</td>
                <td><button onClick={() => deleteContact(contact, index)}>Delete</button></td>
            </tr>)
          })}
            
        </tbody>
      </table>
    </div>
  );
}

export default App;
