import React,{ useState } from "react";
import { Tab, Tabs } from "@mui/material";
import { Box, styled } from "@mui/system";
//import { Link } from "react-router-dom";

const styles = {
  
  Box: {
      width:'450px',
      margin:'1.5vw auto auto',
      borderRadius:10,
      boxShadow: 'rgb(0 0 0 / 10%) 0px 20px 25px, rgb(0 0 0 / 4%) 0px 10px 10px'
  },
  Tab: {
      statement1:{color:"#fff",width:'150px'},
      statement2:{color:"#c2e0ff",width:'150px'}
  },

  routingLink: {
    textDecoration: 'none'
  }

}


interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number ) => void;
}


const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    classes={{
      flexContainer: "flexContainer",
      indicator: "indicator"
    }}
    variant="standard"
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      maxWidth: 60,
      width: "100%",
      backgroundColor: "white"
    }
  },
  "& .flexContainer": {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    backgroundColor: "rgb(0, 127, 255)",

  },
});

export const SimpleTabs : React.FC = () => {

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number ) => {
    setValue(newValue);
  };

  return(
    <StyledTabs value={value} onChange={handleChange} >
      <Tab style={ value===0?styles.Tab.statement1:styles.Tab.statement2 } label="Get user list" />
      <Tab style={ value===1?styles.Tab.statement1:styles.Tab.statement2 } label="User detail" />
      <Tab style={ value===2?styles.Tab.statement1:styles.Tab.statement2 } label="Update user" />
      <Tab style={ value===3?styles.Tab.statement1:styles.Tab.statement2 } label="Deposit money" />
      <Tab style={ value===4?styles.Tab.statement1:styles.Tab.statement2 } label="Sign out" />
    </StyledTabs>
  )
}