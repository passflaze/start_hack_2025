import Charts from './components/Charts'
import { UserHeader } from './components/common/UserHeader'


let demoUser = {
  name: "MR. RANFONI",
  age: 22,
  netWorth: "$1,000,000"
}

function App() {
  return (
    <>
    
    <UserHeader user={demoUser}/>
    
      <Charts/>
     
     
    </>
    
  )
}

export default App


