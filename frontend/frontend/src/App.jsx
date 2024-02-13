import './App.css'
import AgentRegistrationForm from './Pages/AgentRegistrationForm'
import CustomerRegistrationForm from './Pages/CustomerRegistrationForm'
import PropertyForm from './Pages/PropertyForm'
import PropertyList from './Pages/PropertyList'
// index.js
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
 

  return (
    <>
    <h1>Real Estate Properties</h1>
    <CustomerRegistrationForm/>
      <PropertyList/>
      <PropertyForm/>
      <AgentRegistrationForm/>
    </>
  )
}

export default App