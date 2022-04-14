import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home'
import ContactList from './ContactList'
import Contact from './Contact';
import ContactForm from './ContactForm'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<h1>Welcome</h1>}/>
          <Route path="contacts" element={<ContactList />} >
            <Route index element={<p>Select a contact for more details</p>}/>
            <Route path="new" element={<ContactForm />} />
            <Route path=":contactId/edit" element={<ContactForm />} />
            <Route path=":contactId" element={<Contact />} />
            <Route path="*" element={<h1>Contact Not Found</h1>} />
          </Route>
        </Route>
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App