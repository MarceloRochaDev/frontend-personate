import React from 'react'
import {Link } from 'react-router-dom'
import api from '../../services/api'

import Nav from '../templates/Nav'
export default class Home extends React.Component{
    state={
        isLoggedIn:false,

        //// states testes abaixo

        points:0,
        listPoints:[],


    }


    async componentDidMount(){

        const payload=JSON.parse(localStorage.getItem('__userKey'))

        // console.log(payload.token)
        let token=''
        if(payload){
             token=payload.token
        }
        if(token !== ''){
            this.setState({isLoggedIn:true})
        }else{
            this.setState({isLoggedIn:false})
        }
    }

    async handlePoints(e){
        e.preventDefault()
        let {points}=this.state
        const payload=JSON.parse (localStorage.getItem('__userKey'))
        const token=payload.token
        // points=toString(points)
        // console.log(typeof(points))
        console.log(points)
        // console.log(token)

        const data={
            status_text:points
        }
        
        
        api.defaults.headers.common['Authorization'] = `Token ${token}`
        await api.post('http://localhost:8080/api/feed/',data)
            .then(res=>{
                console.log(res)
            }).catch(err=>{
                console.log(err)
            })

    }

    async handleListPoints(e){
        e.preventDefault()

        await api.get('http://localhost:8080/api/feed/')
            .then(res=>{
                console.log(res)
        

            }).catch(err=>{
                console.log(err)
            })
    }

    render(){
        const {isLoggedIn, points } = this.state
        // console.log(this.props)

        return(
            <div
          
            >
              <Nav isLoggedIn={isLoggedIn} history={this.props.history} />
              <div className='mt-3 pt-2 d-flex'>
                 {!!isLoggedIn ? <div
                  style={{
                    width:'100%',
                    height:"100%"
                }}
                 >Logado !!!!

                 Somente testes abaixo !!!

                <label for='points' className='ml-3'>Alterar pontuação</label>
                 <input 
                 id='points'
                 onChange={e=>{
                     this.setState({points:e.target.value})
                    //  console.log(points)
                 }}
                 value={points}
                 />
                 <button
                 onClick={e=>{
                     this.handlePoints(e)
                 }}
                 >Enviar</button>

                <label for='list' className='ml-3'>Listar pontuações</label>
                
                 <button
                 onClick={e=>{
                     this.handleListPoints(e)
                 }}
                 >Listar</button>
                 
                 
                 </div>:
                 
                 <div 
                 style={{
                     width:'100%',
                     height:"100%"
                 }}
                 className='d-flex flex-column m-3'
                 >
                     
                     <h2 className='text-center font-weight-bold'> Bem vindo ao Personate</h2>
                     <h3 className='text-muted text-center m-3'> Para uma melhor experiencia, cadastre-se para jogar</h3>

<div
className='conteiner-home form-conteiner'
style={{
    border:"solid 5px",
    alignSelf:"center",
    padding:'25px'
    
}}
>


<div className="d-flex "

>

                     <Link to='/Signin'>

                   <h4 
                   className='text-left'
                   style={{
                       color:"white"
                   }}
                   ><i class="fa fa-fire mr-1" style={{color:"red"}} aria-hidden="true"></i>Jogar como usuario cadastrado</h4>
                     </Link>
</div>

                   <p className='font-weight-bold ml-5 pl-3'  
                    style={{
                       color:"white"
                   }}>Ou</p>
<div className='d-flex'>

                   <Link to=''>

                   <h4
                    className='text-left '
                    style={{
                        color:"white"
                    }}
                    ><i class="fa fa-fire mr-1" style={{color:"red"}} aria-hidden="true"></i>Jogar como visitante </h4>
                   </Link>
</div>
                </div>
                 </div>}
              </div>
         
            </div>
        )
    }
}