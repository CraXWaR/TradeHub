import { useState, useMemo } from 'react';
import { DeletedProductsList } from "../../../components/Admin/AdminProductsList/DeletedProductsList.jsx";
import { CustomSelect } from "../../../components/Admin/UI/CustomSelect/CustomSelect.jsx";
import styles from './AdminProductsPage.module.css';

const sortOptions = [
    { value: "created_desc", label: "Newest" },
    { value: "created_asc", label: "Oldest" },
    { value: "title_asc", label: "Title A–Z" },
    { value: "title_desc", label: "Title Z–A" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" }
];

const AdminDeletedProductsPage = () => {
    const [query, setQuery] = useState('');
    const [sort, setSort] = useState('created_desc');

    const filters = useMemo(() => ({ query, sort }), [query, sort]);

    return (
        <div className={`admin-theme ${styles.page}`}>
            <header className={styles.header}>
                <h1>Deleted Products</h1>
                <div className={styles.toolbar}>
                    <input
                        className={styles.input}
                        placeholder="Search deleted products…"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}/>
                    <CustomSelect
                        options={sortOptions}
                        value={sort}
                        onChange={setSort}/>
                </div>
            </header>

            <main className={styles.content}>
                <DeletedProductsList filters={filters}/>
            </main>
        </div>
    );
};

export default AdminDeletedProductsPage;