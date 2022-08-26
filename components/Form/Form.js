import styled from 'styled-components';
import React, { useState } from 'react'
import FormLeftWrapper from './components/FormLeftWrapper';
import FormRightWrapper from './components/FormRightWrapper';
import { createContext } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { ethers }from 'ethers';
import {toast} from 'react-toastify';
import CampaignFactory from '../../artifacts/contracts/Campaign.sol/campaignFactory.json';

const FormState=createContext();

const Form = () => {

  const[form ,setForm] = useState({
    campaignTitle:"",
    story:"",
    requiredAmount:"",
    category:"education",
  });

  const[loading,setLoading]=useState(false);
  //start campaign karu to loading to true krna hai isliye humne useState banaya
  const[address,setAddress]=useState("");
  // start campaign ke address hoga uske liye jab user campaign run kare ga to uska ekaddres aaye ga us ke liye
  
  const [storyUrl, setStoryUrl] = useState();
  const [imageUrl, setImageUrl] = useState();

  

  const [uploaded, setUploaded] = useState(false);



  const FormHandler=(e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })


  }

  
  const startCampaign = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    //ye windown ka jo humara web3provider hai jeske through hum sig and get kar lege.
    const signer = provider.getSigner();

    if(form.campaignTitle === "") {
      toast.warn("Title Field Is Empty");
    } else if(form.story === "" ) {
      toast.warn("Story Field Is Empty");
    } else if(form.requiredAmount === "") {
      toast.warn("Required Amount Field Is Empty");
    } else if(uploaded == false) {
        toast.warn("Files Upload Required")
    }
    else {        
      setLoading(true);  

      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_ADDRESS,
        CampaignFactory.abi,
        signer
      );
      const CampaignAmount = ethers.utils.parseEther(form.requiredAmount);

      const campaignData = await contract.createCampaign(
        form.campaignTitle,
        CampaignAmount,
        imageUrl,
        form.category,
        storyUrl
      );

      await campaignData.wait();   

      setAddress(campaignData.to);
    }
}


  const[image,setImage]=useState(null);
  const imageHandler=(e)=>{
    setImage(e.target.files[0]);
  }
  return (
    <FormState.Provider value={{form, setForm, image, setImage, imageHandler, FormHandler, setImageUrl, setStoryUrl, setUploaded,startCampaign}} >
    <FormWrapper>
        <FormMain>
        {loading == true ?
                address == "" ?
                    <Spinner>
                        <TailSpin height={60} />
                    </Spinner> :
                <Address>
                    <h1>Campagin Started Sucessfully!</h1>
                    <h1>{address}</h1>
                    <Button>
                        Go To Campaign
                    </Button>
                </Address>
                :
                    <FormInputsWrapper>
                        <FormLeftWrapper />
                        <FormRightWrapper />
                    </FormInputsWrapper>               
            }
        </FormMain>

      </FormWrapper>
    </FormState.Provider>
  )
}
const FormWrapper=styled.div`
width: 100%;
display:flex;
justify-content:center;
`
const FormMain=styled.div`
width:80%;
`


const FormInputsWrapper = styled.div`
display:flex;
justify-content:space-between ;
margin-top:45px ;
`
const Spinner = styled.div`
    width:100%;
    height:80vh;
    display:flex ;
    justify-content:center ;
    align-items:center ;
`
const Address = styled.div`
    width:100%;
    height:80vh;
    display:flex ;
    display:flex ;
    flex-direction:column;
    align-items:center ;
    background-color:${(props) => props.theme.bgSubDiv} ;
    border-radius:8px;
`

const Button = styled.button`
  display: flex;
  justify-content:center;
  width:30% ;
  padding:15px ;
  color:white ;
  background-color:#00b712 ;
  background-image:
  linear-gradient(180deg, #00b712 0%, #5aff15 80%) ;
  border:none;
  margin-top:30px ;
  cursor: pointer;
  font-weight:bold ;
  font-size:large ;
`
export default Form
export {FormState};
