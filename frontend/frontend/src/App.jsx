import './App.css'
import AgentRegistrationForm from './Pages/AgentRegistrationForm'
import Appointments from './Pages/Appointments'
import CustomerRegistrationForm from './Pages/CustomerRegistrationForm'
import PropertyForm from './Pages/PropertyForm'
import PropertyList from './Pages/PropertyList'
// index.js
import 'bootstrap/dist/css/bootstrap.min.css';
import PropertySearch from './Pages/PropertySearch'


function App() {
 

  return (
    <>
    <h1>Real Estate Properties</h1>
    <CustomerRegistrationForm/>
    <PropertySearch/>
      <PropertyList/>
      <PropertyForm/>
      <AgentRegistrationForm/>
      <Appointments/>
      
    </>
  )
}

export default App
