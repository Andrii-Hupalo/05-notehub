import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (selectedPage: number) => void;
}
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePageClick = (selectedItem: { selected: number }) => {
    onPageChange(selectedItem.selected + 1);
  };
  return (
    <ReactPaginate
      previousLabel={"← Previous"}
      nextLabel={"Next →"}
      breakLabel={"..."}
      pageCount={totalPages}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={handlePageClick}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      disabledClassName={css.disabled}
    />
  );
}
