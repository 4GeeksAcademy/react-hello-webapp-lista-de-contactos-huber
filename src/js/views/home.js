import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

import userImagen from "../../img/balon.jpg";

import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	const deleteContact = ()=>{
			actions.deleteContact(store.contactIdToDelete);
	}

	return (<>
	<div className="container">
		<div className="row">
			<div className="col">
				<div className="my-3 text-end ">
					<a type="button" className="btn btn-success" href="/contact-add"> Add new contacto</a>
				</div>
				<div>
					{ store.contacts && store.contacts.length > 0 && store.contacts.map(contact => (<div key={contact.id} className="card">
						<div className="row g-0">
							<div className="col-md-2 ms-5 text-center">
								<img src={userImagen} className="my-2 contact__img" alt="Profile picture"/>
							</div>
							<div className="col-md-5">
							<div className="card-body lh-lg">
								<h5 className="card-title fw-normal">{contact.name}</h5>
								<p className="card-text text-black-50"><i className="fa fa-map-marker-alt me-2"></i> {contact.address}</p>
								<p className="card-text text-black-50"><i className="fa fa-phone me-2"></i> {contact.phone}</p>
								<p className="card-text text-black-50"><i className="fa fa-envelope me-2"></i> {contact.email}</p>
							</div>
							</div>
							<div className="col-md-4 my-2 text-end">
								<a className="text-dark me-5" href={'/contact-edit/'+contact.id} ><i className="fa fa-edit"></i></a>
								<a className="text-dark" onClick={()=>{actions.setIdToDelete(contact.id)}} href="#deleteModal" data-bs-toggle="modal"><i className="fa fa-trash"></i></a>
							</div>
						</div>
					</div>))}
					{store.contacts && store.contacts.length == 0 && <>
						<div className="alert alert-warning" role="alert">
							No tienes contactos, agrega uno!
						</div>
					</>}
				</div>

			</div>
		</div>
	</div>

	<div className="modal" id="deleteModal">
		<div className="modal-dialog">
			<div className="modal-content">
				<div className="modal-header">
					<h5 className="modal-title">Are you sure?</h5>
					<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div className="modal-body">
					<p>If you delete this thing the entire universe will go down!</p>
				</div>
				<div className="modal-footer">
					<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">NO!!</button>
					<button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={deleteContact} >Yes!!</button>
				</div>
			</div>
		</div>
	</div>
	</>)
};