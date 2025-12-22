import {Link} from "react-router-dom";
import {useProducts} from "../../hooks/admin/useProducts.js";
import {useState} from "react";
import ReactPaginate from "react-paginate";

import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import styles from './Products.module.css';
import {HiChevronLeft, HiChevronRight} from "react-icons/hi";

const Products = () => {
    const {products, loading, error} = useProducts();

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 12;

    const offset = currentPage * itemsPerPage;
    const currentItems = products.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(products.length / itemsPerPage);

    const handlePageClick = ({selected}) => {
        setCurrentPage(selected);
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>
                        Premium Collection
                    </h1>
                    <p className={styles.subtitle}>
                        Explore high-quality products from our verified sellers.
                    </p>
                </header>

                {loading && (
                    <div className={styles.loaderContainer}>
                        <div className={styles.spinner}></div>
                        <p className={styles.loaderText}>
                            Loading marketplace...
                        </p>
                    </div>
                )}

                {!loading && error && (
                    <div className={styles.errorContainer}>
                        <p>Something went wrong: {error}</p>
                    </div>
                )}

                {!loading && !error && products.length === 0 && (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>📦</div>
                        <h2 className={styles.emptyTitle}>
                            No items found
                        </h2>
                        <p className={styles.emptyText}>
                            The inventory is currently empty. Be the first to add a new product!
                        </p>
                        <Link to="/admin/create" className={styles.createBtn}>
                            Add Your Product
                        </Link>
                    </div>
                )}

                {!loading && !error && products.length > 0 && (
                    <>
                        <div className={styles.grid}>
                            {currentItems.map((p) => (
                                <ProductCard key={p.id} product={p}/>
                            ))}
                        </div>

                        {products.length > itemsPerPage && (
                            <ReactPaginate
                                previousLabel={<HiChevronLeft size={24}/>}
                                nextLabel={<HiChevronRight size={24}/>}
                                pageCount={pageCount}
                                onPageChange={handlePageClick}
                                containerClassName={styles.pagination}
                                pageClassName={styles.pageItem}
                                activeClassName={styles.activePage}
                                previousClassName={styles.prevNext}
                                nextClassName={styles.nextBtn}
                                disabledClassName={styles.disabled}
                                breakLabel={"..."}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Products;
