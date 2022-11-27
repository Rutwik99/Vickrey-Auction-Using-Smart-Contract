let VickreyAuction = artifacts.require("VickreyAuction");
let BarbossaBrethren = artifacts.require("BarbossaBrethren");
let { soliditySha3 } = require("web3-utils");
let { assert } = require("console");

contract ("Test Case-2", accounts => {
    it('Test Case-2', async () => {

        console.log("--------------------------------------------------------------------")
        console.log("0 Pirates Participate In The Bidding Ring and 3 Normal People Participate in The Vickrey Auction");
        console.log("--------------------------------------------------------------------")
        let BarbossaAddress = accounts[0];
        let FrenchNavyAddress = accounts[1];
        let VickreyInstance = await VickreyAuction.deployed({from: FrenchNavyAddress});
        console.log("Address Of Vickrey Auction --> ", VickreyInstance.address);
        console.log("--------------------------------------------------------------------")
        

        function SleepFunction(ms, str1, str2) {
            console.log(str1 + " In " + str2 + " ......");
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        let Bidder1 = accounts[4]; let BidAmount1 = 5; let Nonce1 = 12;
        let Bidder2 = accounts[5]; let BidAmount2 = 4; let Nonce2 = 18;
        let Bidder3 = accounts[6]; let BidAmount3 = 1; let Nonce3 = 17;
        let HashValue1 = soliditySha3(BidAmount1, Nonce1);
        let HashValue2 = soliditySha3(BidAmount2, Nonce2);
        let HashValue3 = soliditySha3(BidAmount3, Nonce3);
        console.log("Address Of Bidder 1 --> ", Bidder1);
        console.log("Address Of Bidder 2 --> ", Bidder2);
        console.log("Address Of Bidder 3 --> ", Bidder3);
        console.log("--------------------------------------------------------------------")

        
        console.log("Stage-2")
        console.log("Others Placing Their Bids In Vickrey Auction");
        VickreyInstance.PlaceBidInVickreyAuction(HashValue1, {from : Bidder1});
        VickreyInstance.PlaceBidInVickreyAuction(HashValue2, {from : Bidder2});
        VickreyInstance.PlaceBidInVickreyAuction(HashValue3, {from : Bidder3});
        console.log("--------------------------------------------------------------------")
        
        let TempTime3 = await VickreyInstance.BiddingTimeRemaining.call();
        TempTime3 = TempTime3.toNumber() * 1000;
        await SleepFunction(TempTime3, "Bidding Period", "Vickery Auction");
        console.log("--------------------------------------------------------------------")

        console.log("Others Revealing Their Bids In Vickery Auction");
        VickreyInstance.RevealBidInVickreyAuction(BidAmount1, Nonce1, {from : Bidder1});
        VickreyInstance.RevealBidInVickreyAuction(BidAmount2, Nonce2, {from : Bidder2});
        VickreyInstance.RevealBidInVickreyAuction(BidAmount3, Nonce3, {from : Bidder3});
        console.log("--------------------------------------------------------------------")
        
        let TempTime4 = await VickreyInstance.RevealingTimeRemaining.call();
        TempTime4 = TempTime4.toNumber() * 1000;
        await SleepFunction(TempTime4, "Revealing Period", "Vickery Auction");
        console.log("--------------------------------------------------------------------")

        let FinalBuyer = await VickreyInstance.BuyerOfTheItem.call();
        console.log("Address Of The Buyer --> ", FinalBuyer[0]);
        console.log("Amount To Be Paid By The Buyer --> ", FinalBuyer[1].toNumber());

        assert(FinalBuyer[0] === Bidder1);
        
    });
});