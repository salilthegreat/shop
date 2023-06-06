import React from 'react'
import styled from 'styled-components'

const NotFound = () => {
    const Container = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 70vh;
    `
    const Error = styled.h1`
        font-weight: 500;
    `
    const Message = styled.div`
    `
  return (
    <Container>
        <Error>404.Page Not Found</Error>
        <Message>Stop going through unwanted pages, Shithead :(</Message>
    </Container>
  )
}

export default NotFound