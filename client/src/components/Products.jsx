import styled from "styled-components"
import Product from "./Product"
import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Products = ({ cat, filters, sort }) => {
  console.log(cat, filters, sort)

  let [products, setProducts] = useState([])
  let [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(cat ? `http://localhost:5000/api/products?category=${cat}` : "http://localhost:5000/api/products")
        setProducts(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getProducts()
  }, [cat])

  useEffect(() => {
      cat  &&  setFilteredProducts(products.filter((item) => Object.entries(filters).every(([key, value]) => item[key].includes(value)))) 
  }, [filters, cat, products])

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts(prev => [...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
    } else if (sort === "asc") {
      setFilteredProducts(prev => [...prev].sort((a, b) => a.price - b.price))
    } else {
      setFilteredProducts(prev => [...prev].sort((a, b) => b.price - a.price))

    }

  }, [sort,products])

  return (
    <Container>
      {cat ? filteredProducts.map(item => (
        <Product item={item} key={item._id} />
      )) : products.slice(0,8).map(item => (
        <Product item={item} key={item._id} />
      ))}
    </Container>
  )
}

export default Products