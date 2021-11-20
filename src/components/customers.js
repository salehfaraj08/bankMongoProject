import React from "react";
import axios from "axios";
import Customer from "./customer";


const Customers = () => {
    const [customers, setCustomers] = React.useState([]);

    React.useEffect(() => {
        axios.get("https://bank-server-saleh.herokuapp.com").then((res) => {
            if (res.status === 200) {
                setCustomers(res.data);
            }
        });
    }, []);
    const handleTransfer = (id, amount) => {
        let reciever = customers.find(customer => customer._id ===id);
        reciever.cash += parseInt(amount);
        console.log(reciever,customers);
        setCustomers([...customers]);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2vh' }}>
            {
                customers && customers.length > 0 ? customers.map((customer) => {
                    return <Customer key={customer._id} id={customer._id} name={customer.name} cash={customer.cash} credit={customer.credit} handleTransferTrans={handleTransfer} />
                }) : <div>Loading...</div>
            }
        </div>
    )

}

export default Customers;