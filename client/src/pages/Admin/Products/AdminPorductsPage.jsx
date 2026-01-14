import { useState, useMemo } from 'react';

import {ProductsList} from "../../../components/Admin/AdminProductsList/ProductsList.jsx";
import {CustomSelect} from "../../../components/Admin/UI/CustomSelect/CustomSelect.jsx";

import styles from './AdminProductsPage.module.css';

const sortOptions = [
    { value: "created_desc", label: "Newest" },
    { value: "created_asc", label: "Oldest" },
    { value: "title_asc", label: "Title A–Z" },
    { value: "title_desc", label: "Title Z–A" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" }
];

const AdminProductsPage = () => {
    const [query, setQuery] = useState('');
    const [sort, setSort] = useState('created_desc');

    const filters = useMemo(() => ({ query, sort }), [query, sort]);

    return (
        <div className={`admin-theme ${styles.page}`}>
            <header className={styles.header}>
                <h1>Products</h1>
                <div className={styles.toolbar}>
                    <input
                        className={styles.input}
                        placeholder="Search products…"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}/>
                    <CustomSelect
                        options={sortOptions}
                        value={sort}
                        onChange={setSort}
                    />
                </div>
            </header>

            <main className={styles.content}>
                <ProductsList filters={filters} />
            </main>
        </div>
    );
};

export default AdminProductsPage;
