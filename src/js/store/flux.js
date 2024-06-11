const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: null,
			contactIdToDelete: null,
			error: null
		},
		actions: {
			loadContacts: async () => {
				let data = null;
				const store = getStore();
				setStore({...store, error:null});
				try{
					const res = await fetch('https://playground.4geeks.com/contact/agendas/huber0018');

					if(!res.ok){
						if(res.status == 404){
							const actions = getActions();
							await actions.createAgenda();
							setStore({...store, contacts:[]});
							return;
						}
						console.log("Error obteniendo contactos");
						throw "Error obteniendo contactos";
					}

					data = await res.json();
					if(!data.contacts){
						throw "Error en respuesta, contactos no existe";
					}

					const contacts = data.contacts;
					setStore({ ...store, contacts:contacts });

				}catch(exception){
					console.log("Excepcion obteniendo contactos", exception,data);
					setStore({...store, contacts:[]});
				}
			},
			createAgenda: async () => {
				try{
					const res = await fetch('https://playground.4geeks.com/contact/agendas/huber0018', {
						method:'POST'
					});

					if(!res.ok){
						throw "Error creando Agenda";
					}
				}catch(exception){
					throw exception;
				}
			},
			createContact: async (contact) =>{
				let store = getStore();
				setStore({...store, error:null});
				try{
					const res = await fetch('https://playground.4geeks.com/contact/agendas/kath/huber0018', {
						method:'POST',
						body: JSON.stringify(contact),
						headers: {'content-type': 'application/json'}
					});

					if(!res.ok){
						throw "Error creando contacto";
					}

					const addedContact = await res.json();

					store = getStore()
					setStore({...store, contacts:[...store.contacts, addedContact]});
					
				}catch(exception){
					console.log("Excepcion obteniendo contactos", exception);
					setStore({...store, error: exception});
				}
				
			},
			getContact:  (contactId) =>{
				const store = getStore();
				const found =  store.contacts.find(contact=> contact.id == contactId );
				return found;
			},
			updateContact: async (contact) => {
				let store = getStore();
				setStore({...store, error:null});
				try{
					const res = await fetch(`https://playground.4geeks.com/contact/agendas/huber0018/contacts/${contact.id}`, {
						method:'PUT',
						body: JSON.stringify(contact),
						headers: {'content-type': 'application/json'}
					});

					if(!res.ok){
						throw "Error actualizando contacto.";
					}

					const updatedContact = await res.json();
				
					store = getStore();
					
					setStore({...store, contacts:[...store.contacts.filter(x=> x.id != contact.id), updatedContact]});
				}catch(exception){
					console.log("Excepcion actualizando contacto", exception);
					setStore({...store, error: exception});
				}
			
			},
			deleteContact: async (contactId)=>{
				let store = getStore();
				setStore({...store, contactIdToDelete:null, error:null});

				try{
					const res = await fetch(`https://playground.4geeks.com/contact/agendas/huber0018/contacts/${contactId}`, {
						method:'DELETE',
						headers: {'content-type': 'application/json'}
					});

					if(!res.ok){
						throw "Error actualizando contacto.";
					}

					store = getStore()
					setStore({...store, contacts: store.contacts.filter(x=> x.id != contactId)});
				}catch(exception){
					console.log("Excepcion actualizando contacto", exception);
					setStore({...store, error: exception});
				}
			},
			setIdToDelete: (contactId)=>{
				const store = getStore();
				setStore({...store, contactIdToDelete: contactId})
			}
		}
	};
};

export default getState;