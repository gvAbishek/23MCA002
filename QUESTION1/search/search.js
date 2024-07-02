const fetch = require('node-fetch');
// code for the question no 1. this code can cover for sorting based on the rating and other things
exports.findAll = async (req, res) => {
    const categoryname = req.params.categoryname;
    let n = req.query.n ? parseInt(req.query.n) : 10; 
    const page = req.query.page ? parseInt(req.query.page) : 1; 
    const sortField = req.query.sortField || 'rating'; 
    const sortOrder = req.query.sortOrder || 'desc'; 

    const rating = req.query.rating;
    const price = req.query.price;
    const company = req.query.company;
    const discount = req.query.discount;

    try {
        const baseUrl = `http://20.244.56.144/test/companies/companyname/categories/${categoryname}/products`;

        let url = baseUrl;

        // check for pagination
        if (n > 10) {
            const limit = n; 
            const offset = (page - 1) * limit;

            url += `?limit=${limit}&offset=${offset}`;
        } else {
           
            url += '?';
        }

       
        url += `&sortField=${sortField}&sortOrder=${sortOrder}`;

        
        if (rating) {
            url += `&rating=${rating}`;
        }

        if (price) {
            url += `&price=${price}`;
        }

        if (company) {
            url += `&company=${company}`;
        }

        if (discount) {
            url += `&discount=${discount}`;
        }

        
        url = url.replace(/[?&]$/, '');

        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Error fetching products' });
    }
};