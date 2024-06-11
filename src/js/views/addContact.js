import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.css";
import { Form } from "../component/form";

export const AddContact = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<h1 className="text-center mt-4">Add a new contact</h1>
			<Form />
			
		</>
	);
};