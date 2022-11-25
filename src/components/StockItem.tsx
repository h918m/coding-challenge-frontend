import React from "react";

import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react'

interface book{book:{
    symbol: string,
    color: string,
    curr: string
  } 
}
const StockItem=(props:book)=>{
  
  return (
    <UnorderedList>
      <ListItem>{props.book.symbol}</ListItem>
      </UnorderedList>
    );
    
  }
export default StockItem;