
const Paginado = ({ items, pageSize, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(items.length / pageSize);

    const prevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div>
            {items.length > 0 && (
                <div className="container">
                    <button className="btnPaginado" onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
                    <span>Página {currentPage} de {totalPages}</span>
                    <button className="btnPaginado" onClick={nextPage} disabled={currentPage === totalPages}>Siguiente</button>
                </div>
            )}
        </div>
    );
};

export default Paginado;
