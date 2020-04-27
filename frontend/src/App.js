import React from 'react'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./ducks";
import Routes from './Routes'
import './globalmobile.css'
import Footer from './Core/Footer'


const App = ()=>{
  return(
    <>
     <Provider store={store}>
      <PersistGate loading={() => <div>loading</div>} persistor={persistor}>
        <Routes />
        <Footer/>
      </PersistGate>
     </Provider>
    </>
  )
}

export default App;