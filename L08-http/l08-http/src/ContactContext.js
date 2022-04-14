import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// creating a context
export const ContactContext = createContext();

// our Component
export const ContactProvider = (props) => {
  // creating a state for contacts
  const [contacts, setContacts] = useState([]);

  //   this will await the refresh contacts function
  useEffect(() => {
    //   its important to await the response
    async function getContacts() {
      await refreshContacts();
    }
    getContacts();
  }, []);

  // makes an api call to get all contacts
  function refreshContacts() {
    return axios.get("http://localhost:3001/contacts").then((response) => {
      setContacts(response.data);
    });
  }

  //   function to get a single contact
  function getContact(id) {
    return axios.get(`http://localhost:3001/contacts/${id}`)
      .then(response =>
        new Promise((resolve) => resolve(response.data))
      )
      .catch((error) =>
        new Promise((_, reject) => reject(error.response.statusText))
      )
  }
  

  //   deletes contact
  function deleteContact(id) {
    axios.delete(`http://localhost:3001/contacts/${id}`).then(refreshContacts);
  }
  function addContact(contact) {
    return axios
      .post("http://localhost:3001/contacts", contact)
      .then((response) => {
        refreshContacts();
        return new Promise((resolve) => resolve(response.data));
      });
  }

  function updateContact(contact) {
    return axios.put(`http://localhost:3001/contacts/${contact.id}`, contact)
    .then(response => {
      refreshContacts()
      return new Promise((resolve) => resolve(response.data))
    })
  }

  //   for jsx we return the the children with a provider
  return (
    <ContactContext.Provider
      value={{
        contacts,
        getContact,
        deleteContact,
        addContact,
        updateContact,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};
