const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"MAX_SUPPLY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"curves","outputs":[{"internalType":"uint160","name":"leftPart","type":"uint160"},{"internalType":"uint160","name":"rightPart","type":"uint160"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"flipSaleState","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint160","name":"leftPart","type":"uint160"},{"internalType":"uint160","name":"rightPart","type":"uint160"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"saleIsActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint160","name":"leftPart","type":"uint160"},{"internalType":"uint160","name":"rightPart","type":"uint160"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"updateScreen","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const contractAddress = "0x7deb38a22694608a58b28970320d39ee50e7bc0f";
const price = 40000000000000000;
const validNetworkId = 1;
const initialSupply = 5555;

let currentAccount = null;
let contract = null;
let web3js = null;

async function start() {
    $(".status-message").text("");
    const provider = await detectEthereumProvider();
    if (provider) {
        // If the provider returned by detectEthereumProvider is not the same as
        // window.ethereum, something is overwriting it, perhaps another wallet.
        if (provider !== window.ethereum) {
            console.warn('Do you have multiple wallets installed?');
        }
        web3js = new Web3(provider);
        web3js.eth.getChainId().then((id) => {
            if (id !== validNetworkId) {
                $(".status-message").html(`<i class="fa fa-exclamation-circle"></i> Not connected to Ethereum main network.`);
                return;
            }
        });
        contract = new web3js.eth.Contract(contractABI, contractAddress);
    } else {
        console.warn("Please install the MetaMask extension and connect your wallet.");
    }
    const chainId = await ethereum.request({ method: 'eth_chainId' });
    ethereum.request({ method: 'eth_accounts' })
        .then(handleAccountsChanged)
        .catch((err) => { console.error(err); });
    updateTokensLeft();
}

function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        console.log("MetaMask is locked or you haven't connected any account. Please connect to MetaMask.");
        // $(".mint button").hide();
    } else if (accounts[0] !== currentAccount) {
        currentAccount = accounts[0];
        $(".mint button").show();
    }
}

function connect() {
    ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(handleAccountsChanged)
        .catch((err) => {
            if (err.code === 4001) {
                // EIP-1193 userRejectedRequest error.
                console.warn('Connect to MetaMask.');
            } else {
                console.error(err);
            }
        });
}

 function random(input, range) {
    let BN = web3js.utils.BN;
    return new BN(web3js.utils.keccak256(input)).mod(new BN(range)).toNumber();
 }


 let colors = {}
colors.bg = ["ac8", "ebf", "9de", "df9", "dda", "ed9", "999", "89c"];
colors.head = ["70d", "653", "90f", "2b7", "22d", "22d", "fd1", 
"b91", "22d", "b91", "22d", "b91", "70d", "f80", "f80", "653", "22d", "f80", "70d", "22d", "653", "f80", "fd1", "70d", "653", "b91", "22d", "f80", "90f", "f80", 
"f80", "90f", "653", "22d", "653", "b91"];
colors.screen = ["f48", "ff0", "90f", "d00", "f48", "d60", "f48", "0f0", "90f", "d00", "90f", "00d", "ddd", "0f0", "90f", "0f0", "ddd", "0f0", "90f", "ff0", "d00", "d00", "d60", "0f0", "ff0", "d00", "ff0", "ff0", "d00", "0f0", "d60", "0f0", "90f", "90f", "d60", "0f0"];
colors.pixels = ["661b36", "666600", "3d0066", "580000", "661b36", "582800", "661b36", "006600", "3d0066", "580000", "3d0066", "000058", "585858", "006600", "3d0066", "006600", "585858", "006600", "3d0066", "666600", "580000", "580000", "582800", "006600", "666600", "580000", "666600", "666600", "580000", "006600", "582800", "006600", "3d0066", "3d0066", "582800", "006600"];
colors.legs = [
  "00f",
  "f48",
  "d0d",
  "f00",
  "d0d",
  "d0d",
  "f80",
  "ff0",
  "f48",
  "f0f",
  "00f",
  "f80",
  "90f",
  "f0f",
  "f48",
  "f48",
  "f80",
  "d0d",
  "f0f",
  "f00",
  "f00",
  "00f",
  "00f",
  "f48",
  "f0f",
  "f80",
  "f80",
  "f80",
  "00f",
  "f80",
  "f80",
  "f48",
  "ff0",
  "f0f",
  "f0f",
  "f48",
];

function updateColors(supply) {
    // supply = 929;
    contract.methods
      .tokenURI(supply)
      .call()
      .then((result) => {
        let metadata = atob(result.split("data:application/json;base64,")[1]);
        console.log(
          "result",
          atob(result.split("data:application/json;base64,")[1])
        );
        if (metadata) {
            metadata = JSON.parse(metadata);;
            let screenColor = metadata.attributes.find(
              (_) => _.trait_type == "Screen"
            ).value;
           
            let screenOffset = colors.screen.indexOf(screenColor.replace('#', ''));
            let pixelColor = colors.pixels[screenOffset];
            $("td").css("background-color", screenColor);
            console.log(screenOffset, pixelColor);
            window.paintConf = {
              pixelColor: pixelColor,
              screenColor: screenColor,
            };
        }
      });
    // supply = 837
    // let calc = {};
    // calc.bg = random(web3js.utils.keccak256("BACKGROUND" + supply), 8);
    // calc.head = random(web3js.utils.keccak256("HEAD" + supply), 36);
    // calc.legs = random(web3js.utils.keccak256("LEGS" + supply), 36);
    // calc.screen = random(web3js.utils.keccak256("SCREEN" + supply), 36);

    // let tokenColors = {}
    // tokenColors.bg = colors.bg[calc.bg]
    // tokenColors.head = colors.head[calc.head];
    // tokenColors.legs = colors.legs[calc.legs];
    // tokenColors.screen = colors.screen[calc.screen];
    console.log("supply", supply);
}

function updateTokensLeft() {

    contract.methods
      .totalSupply()
      .call()
      .then((result) => {
        let nbLeft = initialSupply - parseInt(result);
        updateColors(result);
        if (nbLeft > 0) {
          $(".tokens-left").text(
            `${nbLeft.toLocaleString("en-US")} tokens left`
          );
        } else {
          $(".tokens-left").text(`Sold out!`);
          $(".mint button").hide();
        }
      })
}


function checkMetamask() {
  if (window.ethereum == null) {
    alert('Please Conect metamask')
    window.location.reload();
  }
}

function mintToken() {
  checkMetamask();
    console.log(`Trying to buy one token.`)
    $(".status-message").text(`Minting...`);
    const left = web3js.eth.abi.encodeParameter('uint256', leftCode);
    const right = web3js.eth.abi.encodeParameter('uint256', rightCode);
    return contract.methods.mint(left, right)
      .send({from: currentAccount, value: price})
      .on("receipt", function(receipt) {
          $(".status-message").html(`<i class="fa fa-check"></i> Congrats!`);
          try {
              gtag("event", "mint", {
                event_category: "success",
                event_label: receipt.transactionHash,
              });
          } catch(e){

          }
      })
      .on("error", function(error) {
          $(".status-message").html(`<i class="fa fa-exclamation-circle"></i> Mint operation failed`);
      });
}

function updateToken() {
  checkMetamask();
  console.log(`Trying to buy one token.`);
  $(".status-message").text(`Minting...`);
  var tokenId = prompt("Enter the token ID you want to update screen");
  if (!tokenId) {
    alert('Token ID must provide!');
  }

  contract.methods.ownerOf(tokenId).call().then(function(owner) {
    if (currentAccount.toLowerCase() != owner.toLowerCase()) {
      alert("You are not the owner of this token");
    } else {
      const left = web3js.eth.abi.encodeParameter("uint256", leftCode);
      const right = web3js.eth.abi.encodeParameter("uint256", rightCode);
      contract.methods
        .updateScreen(left, right, tokenId)
        .send({ from: currentAccount, value: 0 })
        .on("receipt", function (receipt) {
          $(".status-message").html(
            `<i class="fa fa-check"></i> Congrats! updateScreen success`
          );
          try {
            gtag("event", "mint", {
              event_category: "update",
              event_label: receipt.transactionHash,
            });
          } catch (e) {}
        })
        .on("error", function (error) {
          $(".status-message").html(
            `<i class="fa fa-exclamation-circle"></i> updateScreen operation failed`
          );
        });
    }
  });
  console.log('update', tokenId)
  
}

$(document).ready(function () {
    if (window.ethereum == null) {
        $(".status-message").html(`<i class="fa fa-exclamation-circle"></i> MetaMask isn't installed`);
        // $(".mint button").hide();
    } else {
        ethereum.on('chainChanged', () => { window.location.reload(); });
        ethereum.on('accountsChanged', handleAccountsChanged);
        setTimeout(connect, 500);
        $("#mint-btn").click(mintToken);
        $("#update-btn").click(updateToken);
        start();
    }
});
