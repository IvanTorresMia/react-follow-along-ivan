import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Stack from "react-bootstrap/Stack";
import { Link, Outlet } from "react-router-dom";
import { ContactContext } from "./ContactContext";

function ContactList() {
  function contactList(contacts) {
    if (contacts === null) return;

    return contacts.map((contact) => (
      <ListGroup.Item key={contact.id}>
        <Link to={`/contacts/${contact.id}`} key={contact.id}>
          {contact.name}
        </Link>
      </ListGroup.Item>
    ));
  }

  return (
    <>
      <h1>Contacts</h1>
      <Stack direction="horizontal" gap={3}>
        <ListGroup className="align-self-start w-75">
          <ContactContext.Consumer>
            {({ contacts }) => contactList(contacts)}
          </ContactContext.Consumer>
        </ListGroup>
        <Outlet />
      </Stack>
    </>
  );
}

export default ContactList;
