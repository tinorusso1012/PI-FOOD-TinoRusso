import { useState, useEffect } from "react";
import { changePage, nextPage, prevPage } from "../Actions/index";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Styles/Paginado2.module.css";
const Paginado = ({ max, paginado, pageHome }) => {
  const page = useSelector((state) => state.page);
  const [input, setInput] = useState(page);
  const dispatch = useDispatch();

  useEffect(() => {
    setInput(page);
  }, [dispatch, page]);

  const handleNextPage = (e) => {
    e.preventDefault();
    dispatch(nextPage());
    paginado(page + 1);
  };
  const handlePrevPage = (e) => {
    e.preventDefault();
    dispatch(prevPage());
    paginado(page - 1);
  };

  // FUNCION PARA MODIFICAR LA PAGINA
  const handlePage = (e) => {
    setInput(e.target.value);
    dispatch(changePage(1));
  };
  const keyDown = (e) => {
    if (e.keyCode === 13) {
      const number = parseInt(e.target.value);
      if (number < 1 || number > Math.ceil(max) || isNaN(number)) {
        dispatch(changePage(1));
        setInput(1);
      } else {
        dispatch(changePage(number));
      }
    }
  };

  return (
    <div className={styles.paginado}>
      <button
        disabled={page <= 1 ? true : false}
        className={styles.btn}
        type="submit"
        onClick={handlePrevPage}
      >
        Previus
      </button>
      <div className={styles.divPaginado2}>
        <p
          className={styles.PaginadoInput}
          type="number"
          value={pageHome}
          onChange={handlePage}
        >
          {pageHome}
        </p>
        <span className={styles.spanPage}>of {max}</span>
      </div>
      <button
        disabled={page >= max ? true : false}
        className={styles.btn}
        type="submit"
        onClick={handleNextPage}
      >
        Next
      </button>
    </div>
  );
};

export default Paginado;
