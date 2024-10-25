import { useState } from 'react'
import './App.css'
import Banner from './Components/Banner/Banner'
import AvailableBtn from './Components/FunctionalSection/AvailableBtn'
import Navber from './Components/Navber/Navber'
import Footer from './Components/Footer/Footer'

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [selectedPlayer, setSelectedPlayer]= useState([])

  // add player to selected player
  const addPlayerToSelectedPlayer= player=> {
    if(selectedPlayer.length===6){
      toast('You can not select more than 6 players')
      return
    }
    const allReadyAdded= selectedPlayer.find(addedPlayer=>addedPlayer.playerId == player.playerId)

    if(allReadyAdded){
      toast('This Player is already Selected', {position: "top-right"})
    }
    else{
      setSelectedPlayer([...selectedPlayer, player])
    }
    
  }


  // remove 
  const handleRemove = id=>{
    
    

    const updatedPlayer= selectedPlayer.filter(upPlayer=>upPlayer.playerId !== id)
    setSelectedPlayer(updatedPlayer)
    
  }


  // end add player

  const [isActive, setIsActive]= useState({
    available:true,
    status: "available"
  })

  const handleIsActiveState = (status) =>{
    if(status=="available"){
      setIsActive({
        available:true,
        status:'available'
      })
    }else{
      setIsActive({
        available: false,
        status: "selected"
      })
    }
  }

  // add money
  const [donateMoney, setDonateMondy]=useState(0)
  const addMoney=()=>{

    setDonateMondy(donateMoney+60000)
  }

  

  // reduce money
  const reduceMoney=(money)=>{
    if(donateMoney<=money){
      toast('You do not have enough money to hire this player.')
    }else{
      setDonateMondy(donateMoney-money)
    }
    


    
  }

  return (
    
    <>
    {/* nav section */}
    <Navber donateMoney={donateMoney} ></Navber>
    {/* banner section */}
    <Banner addMoney={addMoney}></Banner>
    {/* Functional btn */}
    <AvailableBtn 
    selectedPlayer={selectedPlayer}
    addPlayerToSelectedPlayer={addPlayerToSelectedPlayer} 
    handleIsActiveState={handleIsActiveState} 
    isActive={isActive}
    reduceMoney={reduceMoney}
    handleRemove={handleRemove}>
   
    </AvailableBtn>
    {/* Footer Section */}
    <Footer></Footer>
     
    </>
  )
}

export default App
