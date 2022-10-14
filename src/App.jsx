import { useState, useEffect } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import axios from 'axios';
import Item from './components/item'
import Paginator from './components/paginator';

function App() {
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [listCharacters, setListCharacters] = useState([]);
  const getCharacters = async () => {
    setOpen(true);
    setListCharacters([]);
    const pageAct = page * 20;
    await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${pageAct}`).then((rest) => {
      const { results,count } = rest.data;
      console.log(rest);
      let list = results.map(item => ({
        name: item.name,
        thumbnail: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/"+(item.url.split("pokemon")[1]).replace("/","").replace("/","")+".png", 
      }));

     console.log(list);
      setTimeout(()=>{
        setTotal(count);
        setListCharacters(list);
        setOpen(false);
      },3000);
    });
  }

  useEffect(() => {
    getCharacters();
  }, [page]);

  const newPages = (newPage) => {
    setPage(newPage)
  };
  return (
    <div className='m-3'>
    <dev className="container" >
      <div className="row justify-content-center  ">
        {
          listCharacters.length > 0 && (
            listCharacters.map((item,index) => (
              
              <Item key={index} name={item.name}  thumbnail={item.thumbnail}  />
            ))
          )
        }
      </div>
    </dev>
    <Paginator  page={page} countPages={Math.ceil(total / 20)} newPage={newPages} />
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  </div>
  )
}

export default App
