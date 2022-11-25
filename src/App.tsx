import React,{useEffect,useState} from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  // theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import { extendTheme } from '@chakra-ui/react'
import StockItem from './components/StockItem'
let openPrice = "";
let currentPrice = "";
let color = "";
interface book{
  symbol: string,
  color: string,
  curr: string
} 



// 2. Extend the theme with new layer styles
const theme = extendTheme({
  layerStyles: {
    base: {
      bg: 'gray.50',
      border: '2px solid',
      borderColor: 'gray.500',
      marginTop:'10px'
    },
    selected: {
      bg: 'teal.500',
      color: 'teal.700',
      borderColor: 'orange.500',
    },
  },
})

export const App = () => {
  const [stockDisplayed,setStockDisplyed]=useState<Boolean>(false);
  const [list,setList]=useState<book[]>([]);
  const [currentDisplay,setCurrentDisplay]=useState<string>("")
  const [stock,setStock]=useState<string>("")
  const handleChange = (event :React.ChangeEvent<HTMLInputElement>) => {
    setCurrentDisplay(event.target.value );
  };

  const displayInfo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setStock("APPL")
    let newStock:book=fetch(`http://localhost:8081/api/v1/getStock?stockSymbol=${currentDisplay}`,).then(res=>res.json()).then(res=>res.data)
    var newList=list
    newList.push(newStock);
      setList(newList);
    }
  const determinePrice = () => {
    if (currentPrice >= openPrice) {
      color = "green";
    } else {
      color = "red";
    }
  };
  const clearList = () => {
    setList([]);
  };

  // useEffect(() => {
    
  // })
  return(
  <ChakraProvider theme={theme}>
   <div className="App">
        <Box >Stock Displayer</Box>
        <h2>Enter Stocks Below (Use Symbol):</h2>
        <form>
          <label>
            <input
              type="text"
              name="name"
              value={currentDisplay}
              onChange={handleChange}
              className=""
            />
          </label>
          <button onClick={displayInfo}>Submit</button>
          <button onClick={clearList}>Clear</button>
        </form>
        <p style={{ color: color }}>
          {stockDisplayed &&
            currentDisplay + " Current Price: $" + stock}
        </p>
        <ul>
          {list.map((item) => (
            <StockItem
              book={item}
            />
          ))}
        </ul>
        {stockDisplayed && <button>Refresh</button>}
      </div>
  </ChakraProvider>)
}
