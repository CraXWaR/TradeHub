export const getProducts = (req, res) => {
    res.json([
        {id: 1, title: "Dummy Product", price: 9.99},
        {id: 2, title: "Another Product", price: 19.99}
    ]);
};
