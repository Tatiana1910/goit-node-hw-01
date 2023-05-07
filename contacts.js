const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contactsList = await listContacts();
  const searchedContact = contactsList.find(
    (contact) => contact.id === contactId
  );
  return searchedContact || null;
}

async function removeContact(contactId) {
  const contactsList = await listContacts();
  const index = contactsList.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [removedContact] = contactsList.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return removedContact;
}

async function addContact(name, email, phone) {
  const contactsList = await listContacts();
  const contact = { id: nanoid(), name, email, phone };
  contactsList.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return contact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
