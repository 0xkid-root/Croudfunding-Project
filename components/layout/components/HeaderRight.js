import styled from 'styled-components';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {App} from '../Layout';
import { useContext } from 'react';
import Wallet from './Wallet';

const HeaderRight=()=>{
    const ThemeToggler=useContext(App);

    return(
        <HeaderRightWrapper>
            <Wallet/>
            <ThemeToggle onClick={ThemeToggler.changeTheme}>
             {ThemeToggler.theme === 'light' ? <DarkModeIcon /> : <Brightness7Icon/>}
            </ThemeToggle>
        </HeaderRightWrapper>
    )
}
const HeaderRightWrapper=styled.div`
display:flex;
justify-content:center;
align-items:center;
margin-right:15px;
height:50%;

`
const ThemeToggle=styled.div`
display:flex;
justify-content:center;
align-items:center;
background-color:${(props)=>props.theme.bgDiv};
height:100%;
padding:5px;
width:50px;
border-radius:5px;

`
export default HeaderRight;