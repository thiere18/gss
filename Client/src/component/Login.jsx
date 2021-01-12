import React, { useState}from 'react';


export default function SignIn() {
  const [username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(username)

}
    return (
      <section className="py-5 bg-success ">  
    <div className="container">
      <div className="row">
          <div className="col">
            <h1 className="display-1 text-center">Gss</h1>
        </div>
          </div>
          <div className="row ">
            <div className="col-md-6 my-3 height">
              <div className="card card-body bg-dark">
                <div className="card-title text-center text-white">
                  <h2 className="text-capitalize">Sign in</h2>
                  <p>New user</p>
                </div>
                {/* end of title */}
                <form onSubmit={handleSubmit}>
                  {/* Nom d'utilisateur */}
                  <div className="input-group my-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Nom d'utilisateur</span>
                    </div>
                    <input className="form-control form-control-lg outline-danger "
                      type="text" name="username"
                      value={username}
                      onChange={(e) =>(setUsername(e.target.value))}
                    />
                  </div>
                  {/* mot de passe */}
                  <div className="input-group my-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Mot de passe</span>
                    </div>
                    <input className="form-control form-control-lg outline-danger "
                      type="password" 
                      name='username'
                      value={password}
                      onChange={(e) =>(setPassword(e.target.value))}

                    />
                  </div>
                  <button type="submit"
                    className="btn btn-outline-success btn-block text-uppercase"
                  >connexion</button>
                </form>
              </div>
            </div>
            <div className="col-md-6 my-3  ">
              <p className="text-center mt-3">Ceci est une application de gestion de stock
              veuillez vous identifier afin de pouvoir acceder a la plateforme et de
              pouvpoir gerer vos biens comme ca se doit</p>
            </div>
            
          </div>
          
    </div>
  </section>
        );
    
}