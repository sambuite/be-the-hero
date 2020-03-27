import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

import './styles.css';

export default function NewIncident(){
   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('');
   const [value, setValue] = useState('');

   const ongId = localStorage.getItem('ongId');

   const history = useHistory();

   async function handleNewIncident(e){
      e.preventDefault();

      const data = {
         title,
         description,
         value
      }

      await api.post('incidents', data, {
         headers: {
            Authorization: ongId
         }
      });

      try {
         alert('Seu caso foi cadastrado');

         history.push('/profile');
         
      } catch (error) {
         alert('Erro no cadastro. Tente Novamente!')
      }

   }

   return (
      <div className="new-incident-container">
         <div className="content">
         <section>
               <img src={logoImg} alt="Be The Hero"/>
               <h1>Cadastrar novo caso</h1>
               <p>Descreva detalhadamente para encontrar um herói para resolver isso</p>
               <Link to="/profile" className="back-link">
                  <FiArrowLeft size={16} color="#e02041" />
                  Voltar para home
               </Link>
            </section>

            <form onSubmit={handleNewIncident}>
               <input 
                  placeholder="Título do caso"
                  value={title} 
                  onChange={e => setTitle(e.target.value)}
               />
               <textarea 
                  placeholder="Descrição" 
                  value={description} 
                  onChange={e => setDescription(e.target.value)}
               />
               <input 
                  placeholder="Valor em reais"
                  value={value} 
                  onChange={e => setValue(e.target.value)}
               />

               <div className="button-group">
                  <Link to="/profile" className="button cancel" type="submit" >Cancelar</Link>

                  <button className="button" type="submit" >Cadastrar</button>
               </div>
               
            </form>
         </div>
      </div>
   );
}