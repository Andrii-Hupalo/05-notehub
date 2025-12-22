import axios, { type AxiosResponse } from "axios";
import type { Note } from "../types/note";

const API_BASE_URL = "https://notehub-public.goit.study/api";
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface CreateNoteData {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const { page = 1, perPage = 12, search = "" } = params;

  const response: AxiosResponse<FetchNotesResponse> = await api.get("/notes", {
    params: {
      page,
      perPage,
      ...(search && { search }),
    },
  });
  return response.data;
};

export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.post("/notes", noteData);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return response.data;
};
