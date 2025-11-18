import { useState, useMemo } from 'react';

import styles from './AdminProductsPage.module.css';
import ProductsList from "../../../components/Admin/AdminProductsList/ProductsList.jsx";

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
                    <select
                        className={styles.select}
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}>
                        <option value="created_desc">Newest</option>
                        <option value="created_asc">Oldest</option>
                        <option value="title_asc">Title A–Z</option>
                        <option value="title_desc">Title Z–A</option>
                        <option value="price_asc">Price ↑</option>
                        <option value="price_desc">Price ↓</option>
                    </select>
                </div>
            </header>

            <main className={styles.content}>
                <ProductsList filters={filters} />
            </main>
        </div>
    );
};

export default AdminProductsPage;
