//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 < 0.9.0;


contract campaignFactory{
    // i create a array beacuase all the campaign that will be created that address will be store here.
    address[] public deployedCampaigns;
    event campaignCreated(
        string title,
        uint requiredAmount,
        address indexed owner,
        address  campaignAddress,
        string imgURL,
        uint indexed timestamp,
        string indexed category
        // here i will get the data  found  category way, timestamp way, and owner way

    );

    function createCampaign(
        string memory campaignTitle,
        uint requiredCampaignAmount,
        string memory imgURL,
        string memory category,
        string memory storyURL) public 
    {
        //humne neche wala contract ko yaha insital kara diya 

        Campaign newCampaign=new Campaign(campaignTitle,
        requiredCampaignAmount,imgURL,storyURL,msg.sender); 

        deployedCampaigns.push(address(newCampaign));

        emit campaignCreated(campaignTitle,
        requiredCampaignAmount,
        msg.sender,
        address(newCampaign),
        imgURL,
        block.timestamp,
        category

        );


    }
}

contract Campaign{
    string public title;
    uint public requiredAmount;
    string public images;
    string public story;
    address payable public owner;
    uint public receivedAmount;
    event donated(address indexed donor,uint indexed amount,uint indexed timestamp);


    constructor(string memory campaignTitle,
    uint readCampaignAmount,
    string memory imgURL,
    string memory storyURL,
    address campaignOwner
    
    ){
        title=campaignTitle;
        requiredAmount=readCampaignAmount;
        images=imgURL;
        story=storyURL;
        owner=payable(campaignOwner);
    }
    function denote() public payable{
        require(requiredAmount>receivedAmount,"Require amount is fullfilled");
        owner.transfer(msg.value);
        receivedAmount+=msg.value;
        emit donated(msg.sender,msg.value,block.timestamp);

    }
}