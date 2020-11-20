
  import { get, post } from 'axios';

  export const walletEnroll = async (userId) => {
    const url = '/wallet/users';
    let res;
    console.log(userId);
    await post(url, {
      "username" : userId,
      "orgName" : "Org1",
    }).then(function (response) {
      res = response;
    })
    return res;
  }

  export const walletGet = async (fcn, args) => {
    const url = '/wallet/channels/mychannel/chaincodes/kit_pay';
    let res;
    await get(url, {
      params: {
        peers: ["peer0.org1.example.com", "peer0.org2.example.com"],
        fcn: fcn,
        args: args,
      }
    }).then(function (response) {
      res = response;
      console.log(response);
    });
    return res;
  }

  export const walletPost = async (fcn, args) => {
    const url = `/wallet/channels/mychannel/chaincodes/kit_pay`
    let res;
    await post(url, {
      peers : ["peer0.org1.example.com", "peer0.org2.example.com"],
      fcn : fcn,
      args : args,
      transient : 'transient',
    }).then(function (response) {
      res = response;
      console.log(res);
    })
    return res;
  }
