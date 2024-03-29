import React, {useState} from "react"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import {AiOutlineCopy} from 'react-icons/ai'


const numbers = '0123456789'
const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz"
const specialCharacters = "!'^+%&/()=?_#$½§{[]}|;:>÷`<.*-@é"




function App() {
  const [password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(20)
  const [includeUppercase, setIncludeUppercase] = useState(false)
  const [includeLowercase,setIncludeLowercase] = useState(false)
  const [includeNumbers,setIncludeNumbers] = useState(false)
  const [includeSymbols,setIncludeSymbols] = useState(false)

  const handleGeneratePassword = (e) => {
    if(!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
      toast.error('You must select atleast one option', {position:'top-center'})
    }

    let characterList = ''

    if(includeLowercase){
      characterList = characterList + lowerCaseLetters
    }
    if(includeUppercase) {
      characterList = characterList + upperCaseLetters
    }
    if(includeNumbers) {
      characterList = characterList + numbers
    }

    if(includeSymbols) {
      characterList = characterList + specialCharacters;
    }
    setPassword(createPassword(characterList))
  }

    const createPassword = (characterList) => {
      let password = "";
      const characterListLength = characterList.length;
      for(let i = 0; i< passwordLength; i++) {
        const characterIndex = Math.round(Math.random() * characterListLength)
        password = password + characterList.charAt(characterIndex)
      }
      return password;
    }

    const copyToClipboard = () => {
      const newTextArea = document.createElement('textarea');
      newTextArea.innerHTML = password;
      document.body.appendChild(newTextArea);
      newTextArea.select();
      document.execCommand('copy');
      newTextArea.remove();
    }

    const handleCopyPassword = (e) => {
      if (password === "" ){
        toast.error('Rien ) copier', {position: 'top-center'});
      }
      else {
        copyToClipboard();
        toast.success('Mot de passe copié avec succès', {position:'top-center'})
      }
    }


 return(
  <div className="App">
    <h1>Generateur de Mot de Passe</h1>
    <ToastContainer/>
    <div className="wrapper">
      <div className="generator">
        <div className="generator__password">
          <h3>{password}</h3>
          <button className="copy__btn" onClick={handleCopyPassword}>
              <AiOutlineCopy/>
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="password-strengh">Taille du mot de passe</label>
          <input 
          defaultValue={passwordLength}
          onChange={(e) => setPasswordLength(e.target.value)}
          type="number"
           name="password-strength" 
           max="20"
           min="10"
            />
        </div>
        <div className="form-group">
          <label htmlFor="uppercase-letters">Ajouter des lettres majuscules</label>
          <input
          checked={includeUppercase}
          onChange={(e) => setIncludeUppercase(e.target.checked)}
          type='checkbox' 
           name="uppercase-letters"
           id="uppercase-letters" 
          
            />
        </div>
        <div className="form-group">
          <label htmlFor="lowercase-letters">Ajouter des lettres minuscules</label>
          <input
          checked={includeLowercase}
          onChange={(e) => setIncludeLowercase(e.target.checked)} 
          type='checkbox'
           name="lowercase-letters"
           id="lowercase-letters" 
         
            />
        </div>
        <div className="form-group">
          <label htmlFor="include-numbers">Ajouter des chiffres</label>
          <input 
          checked={includeNumbers}
          onChange={(e) => setIncludeNumbers(e.target.checked)}
          type='checkbox'
           name="include-numbers" 
           id="include-numbers"
        
            />
        </div>
        <div className="form-group">
          <label htmlFor="include-symbols">Ajouter des symboles</label>
          <input 
          checked={includeSymbols}
          onChange={(e) => setIncludeSymbols(e.target.checked)}
          type='checkbox'
           name="include-symbols" 
           id="include-symbols"
           
            />
        </div>
        <button onClick={handleGeneratePassword} className="gr__log__button">
          Generer 
        </button>
      </div>
    </div>
  </div>
 )
}

export default App;