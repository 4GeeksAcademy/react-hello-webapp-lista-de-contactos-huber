import React, { useContext, useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';


import { Context } from "../store/appContext";

export const Form = () => {
    const [data, setData] = useState({name:'', phone:'', address:'', email:''});
    const { actions, store } = useContext(Context);
    const { contactId } = useParams();
    const navigate = useNavigate();
    

    useEffect(()=>{
        if(contactId != undefined && store.contacts.length > 0){
            const contact =  actions.getContact(contactId);
            setData(contact);
        }
    }, [store.contacts])

    const setValue = (event)=>{
        setData({...data, [event.target.name]: event.target.value })
    }

    const onSubmit = async (event)=>{
        event.preventDefault();
        
        if(contactId != undefined ){
            await actions.updateContact(data);
        }else{
            await actions.createContact(data);
        }
        if(store.error){
            alert("Error: "+ store.error);
            return;
        }
        navigate('/');
    }

    return (
    <div className="container">
        <div className="row">
            <div className="col">
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="inputName" className="form-label">Full name</label>
                        <input required type="text" name="name" className="form-control" id="inputName" 
                        placeholder="Full name" value={data.name} onChange={setValue} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputEmail1" className="form-label">Email</label>
                        <input required type="email" name="email" className="form-control" id="inputEmail1" 
                        placeholder="Enter email" value={data.email} onChange={setValue} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPhone" className="form-label">Phone</label>
                        <input required type="number" name="phone" className="form-control" 
                        id="inputPhone" placeholder="Enter phone" value={data.phone} onChange={setValue}  />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputAddress" className="form-label">Address</label>
                        <input required type="text" name="address" className="form-control" id="inputAddress" 
                        placeholder="Enter address" value={data.address} onChange={setValue} />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                    <a type="button" className="btn btn-link p-0" href="/">or get back to contact</a>
                </form>
            </div>
        </div>
    </div>
        
    )
}