import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "https://68121e933ac96f7119a6e7bc.mockapi.io/api/con-1/contactsInfo";

export const fetchContacts = createAsyncThunk("contacts/fetchAll", async () => {
  const response = await axios.get(baseURL);
  return response.data;
});

export const addContact = createAsyncThunk("contacts/addContact", async (newContact) => {
  const response = await axios.post(baseURL, newContact);
  return response.data;
});

export const deleteContact = createAsyncThunk("contacts/deleteContact", async (id) => {
  const response = await axios.delete(`${baseURL}/${id}`);
  return response.data, { id };
});