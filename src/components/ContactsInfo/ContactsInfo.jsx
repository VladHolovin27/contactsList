import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact, deleteContact, fetchContacts } from "../redux/operations";
import { getContacts, getError, getIsLoading, getDeletingId } from "../redux/selectors";
import styles from "./ContactsInfo.module.css";

function ContactsInfo() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const error = useSelector(getError);
  const isLoading = useSelector(getIsLoading);
  const deletingId = useSelector(getDeletingId);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    if (!name || !number) return;

    dispatch(
      addContact({
        name,
        number
      })
    );

    setName("");
    setNumber("");
  };

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <div>
      <h1 className={styles.title}>Contacts List</h1>
      <form className={styles.form} onSubmit={handleClick}>
        <input
          className={styles.input}
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="Enter the number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button type="submit" className={styles.addBtn}>
          Add
        </button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <ul className={styles.ul}>
        {contacts.map((contact) => (
          <li className={styles.li} key={contact.id}>
            <div>{contact.name}: {contact.number}</div>
            <img className={styles.img} src={contact.avatar} alt="avatar" />
            <button
              className={styles.deleteBtn}
              onClick={() => handleDelete(contact.id)}
              disabled={deletingId === contact.id}
            >
              {deletingId === contact.id ? "Deleting..." : "Delete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactsInfo;