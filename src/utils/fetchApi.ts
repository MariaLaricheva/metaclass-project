import { ProductTypeApi } from 'store/models'
import axios from 'axios'

import { UserTypeApi } from 'models/userTypeModel'


const API = axios.create({
  baseURL: 'https://fakestoreapi.com/',
})


export const getProductList = () =>  API.get<ProductTypeApi[]>(`products`)

export const getProduct = (id: number | string) =>
  API.get<ProductTypeApi>(`products/${id}`)

export const getCategories = () =>  API.get(`products/categories`)

export const getProductByCategory = (category: string) =>
  API.get<ProductTypeApi[]>(`products/category/${category}`)

export const getUsers = () =>  API.get<UserTypeApi[]>(`users`)

