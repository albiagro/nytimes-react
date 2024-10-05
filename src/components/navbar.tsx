import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Logo} from '../img/logo'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useContext, useState } from 'react';
import { AppContext } from '../App';

export const MyNavBar = () => {
  const [search, setSearch] = useState('')
  
  const {setQuery} = useContext(AppContext)

  const updateSearch = (e : any) => {
    setSearch(e.target.value)
  }

  const getSearch = (e : any) => {
    e.preventDefault()
    setQuery(search)
  }

  const resetSearch = () => {
    setSearch('')
    setQuery(search)
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Logo />
        <Navbar.Brand href="#"></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href='/' onClick= {resetSearch}><p className= 'links'> Home </p ></Nav.Link>
            <Nav.Link href="/feel-lucky"><p className= 'links'> I feel lucky </p ></Nav.Link>
          </Nav>
          <Form onSubmit= {getSearch} className="d-flex">
            <Form.Control
              type="input"
              value={search}
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={updateSearch}
            />
            <Button type="submit" variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}