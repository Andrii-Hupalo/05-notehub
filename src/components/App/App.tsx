import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes, deleteNote } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import css from "./App.module.css";
export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", currentPage, debouncedSearchTerm],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        perPage: 12,
        search: debouncedSearchTerm,
      }),
  });
  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };
  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };
  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox value={searchTerm} onSearch={handleSearch} />
        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
          />
        )}

        <button onClick={handleOpenModal} className={css.button}>
          Create note
        </button>
      </div>

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Error: {error?.message || "Unknown error"}</p>}

      {data && data.notes && data.notes.length > 0 && (
        <NoteList notes={data.notes} onDelete={handleDelete} />
      )}

      {data && data.notes && data.notes.length === 0 && <p>No notes found</p>}

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onClose={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
}
