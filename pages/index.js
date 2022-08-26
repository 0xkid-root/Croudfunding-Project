import styled from 'styled-components';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaidIcon from '@mui/icons-material/Paid';
import EventIcon from '@mui/icons-material/Event';
import Image from 'next/image';
import { ethers } from 'ethers';
import CampaignFactory from '../artifacts/contracts/Campaign.sol/campaignFactory.json';
import {useState} from 'react';

import Link from 'next/link'

export default function Index({AllData,EducationData,BlockchainData,CryptocurrencyData,Web3Data,StartupData}){
  const[filter,setFilter]=useState(AllData);
  //me yaha data ko filter kar rh hm 
  return(
    <HomeWrapper>

     <FilterWrapper>
       <FilterAltIcon style={{fontSize:40}}/>
       <Category onClick={() => setFilter(AllData)}>All</Category>
        <Category onClick={() => setFilter(EducationData)}>Education</Category>
        <Category onClick={()=>setFilter(BlockchainData)}>Blockchain</Category>
        <Category onClick={()=>setFilter(CryptocurrencyData)}>Cryptocurrency</Category>
        <Category onClick={()=>setFilter(Web3Data)}>Web3</Category>
        <Category onClick={()=>setFilter(StartupData)}>Startup</Category>
    </FilterWrapper>

    {/*card Container */}
    <CardsWrapper>
      {/*cards*/}
      {filter.map((e) => {
        return (
          <Card key={e.title}>
          <CardImg>
            <Image 
              alt="Crowdfunding dapp"
              layout='fill' 
              src={"https://croudfunding.infura-ipfs.io/ipfs/" + e.image} 
            />
          </CardImg>
          <Title>
            {e.title}
          </Title>
          <CardData>
            <Text>Owner<AccountBoxIcon /></Text> 
            <Text>{e.owner.slice(0,6)}...{e.owner.slice(39)}</Text>
          </CardData>
          <CardData>
            <Text>Amount<PaidIcon /></Text> 
            <Text>{e.amount} Matic</Text>
          </CardData>
          <CardData>
            <Text><EventIcon /></Text>
            <Text>{new Date(e.timeStamp * 1000).toLocaleString()}</Text>
          </CardData>
          <Link passHref href={'/' + e.address}><Button>
            Go to Campaign
          </Button></Link>
        </Card>
        )
      })}
    </CardsWrapper>
  </HomeWrapper>
  )
}


export async function getStaticProps(){
  const provider = new ethers.providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_RPC_URL
  );

  const contract = new ethers.Contract(
  process.env.NEXT_PUBLIC_ADDRESS,
  CampaignFactory.abi,
  provider
  );

  const getAllCampaigns = contract.filters.campaignCreated();
  const AllCampaigns = await contract.queryFilter(getAllCampaigns);
  const AllData = AllCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURL,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  const getEducationCampaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'education');
  const EducationCampaigns = await contract.queryFilter(getEducationCampaigns);
  const EducationData = EducationCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURL,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress

    }
  });
  const getBlockchainCampaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'Blockchain');
  const BlockchainCampaigns = await contract.queryFilter(getBlockchainCampaigns);
  const BlockchainData = BlockchainCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURL,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress

    }
  });
  const getCryptocurrencyCampaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'Cryptocurrency');
  const CryptocurrencyCampaigns = await contract.queryFilter(getCryptocurrencyCampaigns);
  const CryptocurrencyData = CryptocurrencyCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURL,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress,

    }
  });

  const getWeb3Campaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'Web3');
  const Web3Campaigns = await contract.queryFilter(getWeb3Campaigns);
  const Web3Data = Web3Campaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURL,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress

    }
  });

  const getStartupCampaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'Startup');
  const StartupCampaigns = await contract.queryFilter(getStartupCampaigns);
  const StartupData = StartupCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURL,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress

    }
  });
  return{
    props:{
      AllData,
      EducationData,
      BlockchainData,
      CryptocurrencyData,
      Web3Data,
      StartupData

    }
  }

}





const HomeWrapper=styled.div`
display:flex;
flex-direction:column;
align-items:center;
width:100%;
`
const FilterWrapper=styled.div`
display:flex;
align-items:center;
width:80%;
margin-top:15px;
`
const Category= styled.div`
  padding: 10px 15px;
  background-color: ${(props) => props.theme.bgDiv};
  margin: 0px 15px;
  border-radius: 8px;
  font-family: 'Poppins';
  font-weight: normal;
  cursor: pointer;
`

const CardsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 80%;
  margin-top: 25px;
`
const Card = styled.div`
  width: 30%;
  margin-top: 20px;
  background-color: ${(props) => props.theme.bgDiv};
  &:hover{
  transform: translateY(-10px);
  transition: transform 0.5s;
  }
  
  &:not(:hover){
  transition: transform 0.5s;
  }
`
const CardImg = styled.div`
  position: relative;
  height: 120px;
  width: 100%;
`
const Title = styled.h2`
  font-family: 'Roboto';
  font-size: 18px;
  margin: 2px 0px;
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 5px;
  cursor: pointer;
  font-weight: normal;
`
const CardData = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2px 0px;
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 5px;
  cursor: pointer;
  `
const Text = styled.p`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  font-family: 'Roboto';
  font-size: 18px;
  font-weight: bold;
`
const Button = styled.button`
  padding: 8px;
  text-align: center;
  width: 100%;
  background-color:#00b712 ;
  background-image:
  linear-gradient(180deg, #00b712 0%, #5aff15 80%); 
  border: none;
  cursor: pointer;
  font-family: 'Roboto';
  text-transform: uppercase;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
`