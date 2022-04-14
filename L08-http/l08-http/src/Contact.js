import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ContactContext } from "./ContactContext";
import { useContext, useState, useEffect } from "react";

function Contact() {
  // so that we can get the params for single contact id
  let params = useParams();
  let navigate = useNavigate();

  //   getting these two functions from contact context.
  let { getContact, deleteContact } = useContext(ContactContext);
  //   creating a state for the contacts
  let [contact, setContact] = useState();

  //  use effect will get executed anytime there is a contact id
  let [error, setError] = useState();

  useEffect(() => {
    setError(null);
    async function fetch() {
      await getContact(params.contactId)
        .then((contact) => setContact(contact))
        .catch((message) => setError(message));
    }
    fetch();
  }, [params.contactId, getContact]);

  function handleDeleteContact(id) {
    deleteContact(id);
    navigate("/contacts");
  }

  function loading() {
    return (
      <div className="w-25 text-center">
        <Spinner animation="border" />
      </div>
    );
  }

  function errorMessage() {
    return (
      <Alert variant="danger">
        There was an error attempting to load this contact: {error}
      </Alert>
    );
  }

  //   here this function is used to return a full contact.
  function contactCard() {
    let { id, name, email, phone, avatar } = contact;
    return (
      <Card className="align-self-start w-25">
        <Card.Img
          variant="top"
          src={require(`../node_modules/fake-avatars/avatars/${avatar}`)}
        />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{email}</Card.Subtitle>
          <Card.Text>
            <strong>Phone:</strong> <span>{phone}</span>
          </Card.Text>
          <Link to={`/contacts/${id}/edit`} className="btn btn-primary mx-3">
            Edit
          </Link>
          <Button variant="danger" onClick={handleDeleteContact.bind(this, id)}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    );
  }
  //   if contact is undefined then return the loading function, else give me the contact card
  if (error) return errorMessage();
  if (contact === undefined) return loading();
  return contact.id !== parseInt(params.contactId) ? loading() : contactCard();
}

export default Contact;
