import axios from "axios";

const BASE_URL = "http://localhost:5000/api"

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzhkODIxMTIyYWNhMWY1NWM4YWE3NyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4NjI1MzU0MywiZXhwIjoxNjg2NTEyNzQzfQ.TUvFKHw5BexPcr07s-JrAMDVo2n1FTGy9TyDM99iaCw"

export const publicRequest = axios.create({
    baseURL : BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token:`Bearer ${TOKEN}`}
})

