import axios from "axios";

const BASE_URL = "http://localhost:5000/api"

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzhkODIxMTIyYWNhMWY1NWM4YWE3NyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4NjAzNTE3OSwiZXhwIjoxNjg2Mjk0Mzc5fQ.-IZ3GK233mxFHPU8fjMsvseA_kb_FT3gn2nAqtKmyH4"

export const publicRequest = axios.create({
    baseURL : BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token:`Bearer ${TOKEN}`}
})

