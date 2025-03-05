import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { useNavigate, useSearchParams } from 'react-router-dom'

const CategoryCard = ({ category }) => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    function handleNavigate(getCategoryId) {

        sessionStorage.removeItem('filter');
        const currentFilter = { category: [getCategoryId] }
        sessionStorage.setItem('filter', JSON.stringify(currentFilter))
        setSearchParams(new URLSearchParams({ category: [getCategoryId] }))
        navigate(`/shop/listing`); // 🔹 Query Add किया
    }

    return <Card onClick={() => handleNavigate(category._id)} >
        <CardHeader className='p-2 lg:p-3'>
            <div className='h-36 lg:h-52 w-full'>
                <img src={`http://localhost:8000/${category.logo}`} alt="" className='h-full w-full object-cover object-center' />
            </div>
            <CardTitle className='text-center text-lg' >{category.name}</CardTitle>
        </CardHeader>
    </Card>

}

export default CategoryCard
