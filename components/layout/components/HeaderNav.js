import styled from 'styled-components';
import {useRouter} from 'next/router'; 
import Link from 'next/link';

//link hum used karte hai taki hum apna url change kar paye 
const HeaderNav=()=>{
    const Router=useRouter();
    return(
        <HeaderNavWrapper>
      <Link passHref href={'/'}><HeaderNavLinks active={Router.pathname == "/" ? true : false} >
        Campaigns
      </HeaderNavLinks></Link>
      <Link passHref href={'/createcampaign'}><HeaderNavLinks active={Router.pathname == "/createcampaign" ? true : false} >
        Create Campaign
      </HeaderNavLinks></Link>
      <Link passHref href={'/dashboard'}><HeaderNavLinks active={Router.pathname == "/dashboard" ? true : false} >
        Dashboard
      </HeaderNavLinks></Link>
    </HeaderNavWrapper>
  )
}
    
const HeaderNavWrapper=styled.div`
display:flex;
justify-content:space-between;
background-color:${(props)=>props.theme.bgDiv};
padding:6px;
height:55%;
align-items:center;
border-radius:5px;

`
const HeaderNavLinks=styled.div`
display:flex;
align-items:center;
justify-content:space-between;
background-color:${(props)=> props.active ? props.theme.bgSubDiv : props.theme.bgDiv};
height:100%;
font-family:'Roboto';
margin:7px;
padding:0 4px 0 4px;
border-radius:5px;
cursor:pointer;
text-transform:uppercase;
font-weight:bold;
font-size:small;
`
export default HeaderNav;