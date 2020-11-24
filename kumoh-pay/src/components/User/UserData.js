import { post, get } from 'axios';

  // 유저 정보 목록 (전체)
  export const handleDataAll = async (userGroups, setData) => {
    if(userGroups === "전체"){
      await fetch("/api/users/all")
    .then((response) => response.json())
    .then((data) =>
        setData(data)
    )
    .catch(err => console.log(err));
    }else if(userGroups === "판매자"){
      await fetch("/api/users/seller")
    .then((response) => response.json())
    .then((data) =>
        setData(data)
    )
    .catch(err => console.log(err));
    }else{
      await fetch("/api/users/user")
    .then((response) => response.json())
    .then((data) =>
        setData(data)
    )
    .catch(err => console.log(err));
    };
  };

  // 유저 정보 목록 (검색)
  export const handleData = (userGroups, setData, searchKey, searchKeyword) => {
    if(userGroups === "전체"){
      handleAllSearch(setData, searchKey, searchKeyword);
    }else if(userGroups === "판매자"){
      handleSellerSearch(setData, searchKey, searchKeyword);
    }else{
      handleUserSearch(setData, searchKey, searchKeyword);
    };
  };

  const handleAllSearch = async (setData, searchKey, searchKeyword) => {
    searchKey === "id" ?
      await fetch("/api/users/all/id/" + searchKeyword)
      .then((response) => response.json())
      .then((data) => {
      setData(data)
      }) :
      await fetch("/api/users/all/name/" + searchKeyword)
      .then((response) => response.json())
      .then((data) =>
      setData(data)
      )
  }

  const handleSellerSearch = async (setData, searchKey, searchKeyword) => {
    searchKey === "id" ?
      await fetch("/api/users/seller/id/" + searchKeyword)
      .then((response) => response.json())
      .then((data) =>
      setData(data)
      ) :
      await fetch("/api/users/seller/name/" + searchKeyword)
      .then((response) => response.json())
      .then((data) =>
      setData(data)
      )
  }

  const handleUserSearch = async (setData, searchKey, searchKeyword) => {
    searchKey === "id" ?
      await fetch("/api/users/user/id/" + searchKeyword)
      .then((response) => response.json())
      .then((data) =>
      setData(data)
      ) :
      await fetch("/api/users/user/name/" + searchKeyword)
      .then((response) => response.json())
      .then((data) =>
      setData(data)
      )

  }

  // 유저 삭제
  export const deleteUser = async (id) => {
    const url = '/api/users/delete';
    await post(url, {
        id : id
    });
};

  // 정산 유저 목록
  export const handleCalcData = async (setData) => {
    await fetch("/api/users/calc")
    .then((response) => response.json())
    .then((data) =>
    setData(data)
    ).catch(err => console.log(err));
  }
