const CampaignFactory=require("./artifacts/contracts/Campaign.sol/campaignFactory.json");
const {ethers}=require('ethers');
require("dotenv").config({ path: "./.env.local" });

const main = async () => {
      const provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_RPC_URL
       );
    {/*jab hum data ko get karte hai blockchain se to hume iska important padta hai 
    kyu ke hum data get karne ke liye personal node run nhi karsakte hai isliye infura,
    alchemy jaise services ka used karte hai.*/}

    const contract = new ethers.Contract(
            process.env.NEXT_PUBLIC_ADDRESS,
             CampaignFactory.abi,
             provider
           );
      
      {/*yaha hum contract ko instial kara rahe hai yaha sab se phale humara jaha deployed hua hai
        wo wala address aaye ga then humara abi aaya ga firr provider aaye ga */}

        const getDeployedCampaign = contract.filters.campaignCreated();
          let events = await contract.queryFilter(getDeployedCampaign);
           let event = events.reverse();
          console.log(event);
         {/* yaha par maine getDeployedCampaign name ka veriable banya and contract ka instance 
         banaya hai uske sath filters ka use kar rh hm ye hume ethers libary provide karta 
         hai and campaignCreated maine smart contract me event banaya hai uska used karu ga 
         jesko maine indexed diya hm uss ko hee access kar sakta hmm jes position par maine 
        indexed diya hai us ka value duga and baki ko null duga . */}
};
main();