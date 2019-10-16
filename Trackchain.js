var SD;
var SHA256 = require('crypto-js/sha256');


var SC;
class ManuData{
    constructor(id,ED,MD,price){
        this.Id=id;
        this.CompanyName="Mylan";
        this.ExpDate=ED;
        this.ManuDate=MD;
        this.price=price;
    }
}
class ManuBlock{
    constructor(timestamp,data,previousHash = " "){
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + this.nonce + JSON.stringify(this.data)).toString();
    }
    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined " + this.hash);
    }
}
class ManuChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingData = [];
        this.miningReward = 50;
    }
    createGenesisBlock(){
        return new ManuBlock("0:0:0","naN","0");
    }
    createData(data){
        this.pendingData.push(data);
    }
    minePendingData(miningRewardAddress){
        let block = new ManuBlock(Date.now(),this.pendingData);
        block.mineBlock(this.difficulty);

        console.log("block successfully mined");
        this.chain.push(block);

        this.pendingData = [
            new ManuData(null,this.miningRewardAddress,this.miningReward)
        ];
    }
    getDataOfId(id){
        let d;
        for(const block of this.chain){
            for(const da of block.data){
                if(da.Id == id){
                    d=da.Id+" "+da.CompanyName+" "+da.ExpDate+" "+da.ManuDate+" "+da.price;
                }
            }
        }
        return d;
    }
    ischeckValid(){
        for(let i = 1;i < this.chain.length ; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
           }
        }
        return true;
    }
}
class Data{
    constructor(id,cn,ED,MD,price,Tn,source,destination,date,tt,addr,phno,Tm){
         this.Id=id;
        this.CompanyName="Mylan";
        this.ExpDate=ED;
        this.ManuDate=MD;
        this.price=price;

        this.otp;
        this.TransporterName=Tn;
        this.source=source;
        this.Destination=destination;
        this.date=date;
        this.travelTime=tt;
        this.TransporterAddr=addr;
        this.TransporterPhNo=phno;
        this.TransportMode=Tm;
    }
}
class Block{
    constructor(timestamp,data,previousHash = " "){
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + this.nonce + JSON.stringify(this.data)).toString();
    }
    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined " + this.hash);
    }
}
class Transportchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingData = [];
        this.miningReward = 50;
    }
    createGenesisBlock(){
        return new Block("0:0:0","naN","0");
    }
    createData(da){
        var obj=da.Id+" "+da.CompanyName+" "+da.ExpDate+" "+da.ManuDate+" "+da.price;
        var s=SC.getDataOfId(da.id);
        if(obj!=s){
            console.log("invalid");
            return 0;
        }
        this.pendingData.push(da);
    }
    minePendingData(miningRewardAddress){
        let block = new Block(Date.now(),this.pendingData);
        block.mineBlock(this.difficulty);

        console.log("block successfully mined");
        this.chain.push(block);

        this.pendingData = [
            new Data(null,this.miningRewardAddress,this.miningReward)
        ];
    }
    getDataById(id){
        let obj="",s="",a="";
        for(const block of this.chain){
            for(const da of block.data){
                if(da.Id == id){
                    obj=da.Id+" "+da.CompanyName+" "+da.ExpDate+" "+da.ManuDate+" "+da.price;
                    s=da.TransporterName+" "+da.source+" "+da.Destination+" "+da.date+" "+da.travelTime+" "+da.TransporterAddr+" "+da.TransporterPhNo+" "+da.TransportMode;
                    /*if(SC.getDataOfId(id)==obj){
                        s=da.TransporterName+" "+da.source+" "+da.Destination+" "+da.date+" "+da.travelTime+" "+da.TransporterAddr+" "+da.TransporterPhNo+" "+da.TransportMode;
                    //}
                    /*else{
                        console.log("invalid data");
                    }*/
                }
            }
        }
        return obj+" "+s;
    }
    ischeckValid(){
        for(let i = 1;i < this.chain.length ; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
           }
        }
        return true;
    }
}
SC = new ManuChain();
var t1=24;
var t2=24;
var t3=24;
var t4=24;
var t5=24;
SC.createData(new ManuData(t1,t2,t3,t3,t5));
SC.minePendingData("SAI_Address");
console.log("\n The data of ID 24 is",SC.getDataOfId("24"));
SD = new Transportchain();    
t1=24;
t2=24;
t3=24;
t4=24;
t5=24;
t6=24;
t7=24;
t8=24;
t9=24;
t10=24;
t11=24;
t12=24;
t13=24;
SD.createData(new Data(t1,t2,t3,t4,t5,t6,t7,t8,t9,t10,t11,t12,t13));
SD.minePendingData("SAI-Address");
console.log("\n The data of ID 24 is ",SD.getDataById("24"));

console.log(SC);

console.log(SD);