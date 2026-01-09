import {useProducts} from "../../hooks/admin/useProducts.js";
import {useState} from "react";
import ReactPaginate from "react-paginate";

import {ProductCard} from "../../components/ProductCard/ProductCard.jsx";
import {HiChevronLeft, HiChevronRight} from "react-icons/hi";
import {Loading} from "../../components/User/Common/Loading/Loading.jsx";
import {Error} from "../../components/User/Common/Error/Error.jsx";
import {Empty} from "../../components/User/Common/Empty/Empty.jsx";
import {LuStore} from "react-icons/lu";

import styles from './Products.module.css';

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

    const renderContent = () => {
        if (loading) return (
            <Loading message="Preparing marketplace..." subMessage="Fetching products from the vault..."/>);
        if (error) return <Error error={error} message={"Communication Error"}/>;
        if (products.length === 0) return (<Empty Icon={LuStore} title="Our shelves are being stocked!"
                                                  description="Please check back in a few days."
                                                  actionText="Back to Home" actionTo="/"/>);

        return (
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Premium Collection</h1>
                    <p className={styles.subtitle}>Explore high-quality products.</p>
                </header>
                <div className={styles.grid}>
                    {currentItems.map((p) => <ProductCard key={p.id} product={p}/>)}
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
            </div>
        );
    }
//TODO ADD FILTERS ASC/DSC PRICE UP/DOWN
    return (
        <div className={styles.pageWrapper}>
            {renderContent()}
        </div>
    );
};

export default Products;
