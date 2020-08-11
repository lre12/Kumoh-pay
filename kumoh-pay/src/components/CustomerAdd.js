import React from 'react'
import { post } from 'axios';

class CustomerAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            userName: '',
            major: '',
            gender: '',
            charge: ''
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.addCustomer = this.addCustomer.bind(this)
    }

    handleFormSubmit(e) {
        console.log(this.state)
        e.preventDefault()
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
            })
            window.location.reload();
    }


    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer() {
        const url = '/api/customers';
        return post(url, {
            id : this.state.id,
            name : this.state.userName,
            major : this.state.major,
            gender : this.state.gender,
            charge : this.state.charge
        })
    }

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                학번: <input type="text" name="id" value={this.state.id} onChange={this.handleValueChange} /><br />
                이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /><br />
                학과: <input type="text" name="major" value={this.state.major} onChange={this.handleValueChange} /><br />
                성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} /><br />
                잔액: <input type="number" name="charge" value={this.state.charge} onChange={this.handleValueChange} /><br />
                <button type="submit">추가하기</button>
            </form>
        )
    }
}

export default CustomerAdd
