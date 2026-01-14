import {useProducts} from "../../../hooks/admin/useProducts.js";
import {useMemo, useState} from "react";
import ReactPaginate from "react-paginate";
import {LuStore} from "react-icons/lu";
import {HiChevronLeft, HiChevronRight} from "react-icons/hi";

import {ProductCard} from "../../../components/General/ProductCard/ProductCard.jsx";
import {Loading} from "../../../components/User/Common/Loading/Loading.jsx";
import {Error} from "../../../components/User/Common/Error/Error.jsx";
import {Empty} from "../../../components/User/Common/Empty/Empty.jsx";
import NiceSelect from "../../../components/User/UI/Select/NiceSelect.jsx";

import styles from './Products.module.css';

const sortOptions = [
    {value: "created_desc", label: "Newest"},
    {value: "created_asc", label: "Oldest"},
    {value: "title_asc", label: "Title A–Z"},
    {value: "title_desc", label: "Title Z–A"},
    {value: "price_asc", label: "Price: Low to High"},
    {value: "price_desc", label: "Price: High to Low"}
];

const Products = () => {
    const [query, setQuery] = useState('');
    const [sort, setSort] = useState('created_desc');

    const filters = useMemo(() => ({query, sort}), [query, sort]);
    const {products, loading, error} = useProducts(filters);

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 12;
    const offset = currentPage * itemsPerPage;
    const currentItems = products.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(products.length / itemsPerPage);

    const handlePageClick = ({selected}) => {
        setCurrentPage(selected);
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    const renderGridContent = () => {
        if (loading && products.length === 0) return (
            <Loading message="Preparing marketplace..." subMessage="Fetching products from the vault..."/>
        );
        if (error) return <Error error={error} message={"Communication Error"}/>;
        if (products.length === 0) return (
            <Empty Icon={LuStore} title="No products found!" description="Try adjusting your filters."
                   actionText="Clear Search" actionTo="#"/>
        );

        return (
            <>
                <div className={`${styles.grid} ${loading ? styles.gridLoading : ''}`}>
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
            </>
        );
    }

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <div className={styles.titleSection}>
                        <h1 className={styles.title}>Premium Collection</h1>
                        <p className={styles.subtitle}>Explore high-quality products.</p>
                    </div>

                    <div className={styles.toolbar}>
                        <input
                            className={styles.searchInput}
                            placeholder="Search products…"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setCurrentPage(0);
                            }}
                        />
                        <NiceSelect
                            options={sortOptions}
                            value={sort}
                            onChange={(val) => {
                                setSort(val);
                                setCurrentPage(0);
                            }}/>
                    </div>
                </header>

                {renderGridContent()}
            </div>
        </div>
    );
};

export default Products;
