import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Form } from './components/Form/Form';
import { ContactList } from './components/ContactList/ContactList';
import { Container } from './components/Container.styled';
import { Input, Section } from './components/Form/FormElements.styled';
// import { Container } from '';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  onAddContact = data => {
    if (this.state.contacts.some(({ name }) => data.name === name))
      return alert(`${data.name} is already in contacts`);
    const newContact = { ...data, id: nanoid() };
    this.setState({ contacts: [...this.state.contacts, newContact] });
  };
  onDeleteContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  onChangeImput = event => {
    this.setState({ filter: event.target.value.trim() });
  };
  componentDidMount() {
    if (localStorage.getItem('contacts'))
      this.setState({ contacts: JSON.parse(localStorage.getItem('contacts')) });
    // const contacts = JSON.parse(localStorage.getItem('contacts'));
    // if (contacts) {
    //   this.setState({ contacts });
    // }
  }
  componentDidUpdate(_, prevState) {
    if (prevState.contact !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  componentWillUnmount() {
    localStorage.removeItem('contacts');
  }
  render() {
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    return (
      <Container>
        <Form onAddContact={this.onAddContact} />
        <h2>Contacts</h2>
        {this.state.contacts.length === 0 ? (
          <p>No contacts</p>
        ) : (
          <Section>
            <p>Find conacts by name</p>
            <Input
              type="text"
              placeholder="Search contact"
              value={this.state.filter}
              onChange={this.onChangeImput}
            ></Input>
            <ContactList
              contacts={filteredContacts}
              onDeleteContact={this.onDeleteContact}
            />
          </Section>
        )}
      </Container>
    );
  }
}
