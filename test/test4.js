let VickreyAuction = artifacts.require("VickreyAuction");
let BarbossaBrethren = artifacts.require("BarbossaBrethren");
let { soliditySha3 } = require("web3-utils");
let { assert } = require("console");

contract ("Test Case-4", accounts => {
    it('Test Case-4', async () => {

        console.log("--------------------------------------------------------------------")
        console.log("2 Pirates Participate In The Bidding Ring and 2 Normal People Participate in The Vickrey Auction");
        console.log("--------------------------------------------------------------------")
        let BarbossaAddress = accounts[0];
        let FrenchNavyAddress = accounts[1];
        let VickreyInstance = await VickreyAuction.deployed({from: FrenchNavyAddress});
        let BarbossaInstance = await BarbossaBrethren.deployed({from : BarbossaAddress});
        console.log("Address Of Vickrey Auction --> ", VickreyInstance.address);
        console.log("Address Of Bidding Ring --> ", BarbossaInstance.address);
        console.log("--------------------------------------------------------------------")
        

        let status = await BarbossaInstance.ConnectWithVickeryAuction(VickreyInstance.address, {from : BarbossaAddress});

        function SleepFunction(ms, str1, str2) {
            console.log(str1 + " In " + str2 + " ......");
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        let PirateBidder1 = accounts[2]; let PirateBidAmount1 = 2; let PirateNonce1 = 10;
        let PirateBidder2 = accounts[3]; let PirateBidAmount2 = 3; let PirateNonce2 = 5;
        let PirateHashValue1 = soliditySha3(PirateBidAmount1, PirateNonce1);
        let PirateHashValue2 = soliditySha3(PirateBidAmount2, PirateNonce2);
        console.log("Address Of Pirate 1 --> ", PirateBidder1);
        console.log("Address Of Pirate 2 --> ", PirateBidder2);
        console.log("--------------------------------------------------------------------")


        let Bidder1 = accounts[4]; let BidAmount1 = 4; let Nonce1 = 7;
        let Bidder2 = accounts[5]; let BidAmount2 = 4; let Nonce2 = 20;
        let HashValue1 = soliditySha3(BidAmount1, Nonce1);
        let HashValue2 = soliditySha3(BidAmount2, Nonce2);
        console.log("Address Of Bidder 1 --> ", Bidder1);
        console.log("Address Of Bidder 2 --> ", Bidder2);
        console.log("--------------------------------------------------------------------")

        
        console.log("Stage-1")
        console.log("Pirates Placing Their Bids In Barbossa Brethren");
        BarbossaInstance.PlaceBidInBarbossaBrethren(PirateHashValue1, {from : PirateBidder1});
        BarbossaInstance.PlaceBidInBarbossaBrethren(PirateHashValue2, {from : PirateBidder2});
        console.log("--------------------------------------------------------------------")

        console.log("Stage-2")
        console.log("Others Placing Their Bids In Vickrey Auction");
        VickreyInstance.PlaceBidInVickreyAuction(HashValue1, {from : Bidder1});
        VickreyInstance.PlaceBidInVickreyAuction(HashValue2, {from : Bidder2});
        console.log("--------------------------------------------------------------------")
        

        let TempTime1 = await BarbossaInstance.BiddingTimeRemaining.call();
        TempTime1 = TempTime1.toNumber() * 1000;
        await SleepFunction(TempTime1, "Bidding Period", "Barbossa Brethren");
        console.log("--------------------------------------------------------------------")

        console.log("Stage-3")
        console.log("Pirates Revealing Their Bids In Barbossa Brethren");
        BarbossaInstance.RevealBidInBarbossaBrethren(PirateBidAmount1, PirateNonce1, {from : PirateBidder1});
        BarbossaInstance.RevealBidInBarbossaBrethren(PirateBidAmount2, PirateNonce2, {from : PirateBidder2});
        console.log("--------------------------------------------------------------------")
        
        let TempTime2 = await BarbossaInstance.RevealingTimeRemaining.call();
        TempTime2 = TempTime2.toNumber() * 1000;
        await SleepFunction(TempTime2, "Revealing Period", "Barbossa Brethren");
        console.log("--------------------------------------------------------------------")
        
        console.log("Sending The Highest Bid To Vickrey Auction")
        BarbossaInstance.SendTheWinningBidToVickreyAuction({from : BarbossaAddress});
        console.log("--------------------------------------------------------------------")
        
        let TempTime3 = await VickreyInstance.BiddingTimeRemaining.call();
        TempTime3 = TempTime3.toNumber() * 1000;
        await SleepFunction(TempTime3, "Bidding Period", "Vickery Auction");
        console.log("--------------------------------------------------------------------")

        console.log("Others Revealing Their Bids In Vickery Auction");
        VickreyInstance.RevealBidInVickreyAuction(BidAmount1, Nonce1, {from : Bidder1});
        VickreyInstance.RevealBidInVickreyAuction(BidAmount2, Nonce2, {from : Bidder2});
        console.log("--------------------------------------------------------------------")
        
        BarbossaInstance.RevealTheWinningBidToVickreyAuction({from:BarbossaAddress});

        let TempTime4 = await VickreyInstance.RevealingTimeRemaining.call();
        TempTime4 = TempTime4.toNumber() * 1000;
        await SleepFunction(TempTime4, "Revealing Period", "Vickery Auction");
        console.log("--------------------------------------------------------------------")

        let FinalBuyer = await VickreyInstance.BuyerOfTheItem.call();
        console.log("Address Of The Buyer --> ", FinalBuyer[0]);
        console.log("Amount To Be Paid By The Buyer --> ", FinalBuyer[1].toNumber());

        assert(FinalBuyer[0] === Bidder1 || FinalBuyer[0] === Bidder2);
        
    });
});