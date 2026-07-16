import { useState } from 'react'
import emailjs from '@emailjs/browser'
import './App.css'

function App() {
  const [grade, setgrade] = useState("")
  const [invalidPhone, setInvalidPhone] = useState(false)
  const [error, setError] = useState("")
  const [submit, setsubmit] = useState(false)
  const [group, setgroup] = useState("")
  const [studentName, setStudentName] = useState("")
  const [phone, setPhone] = useState("")
  const [parentPhone, setParentPhone] = useState("")
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  
  function handleSend() {
    if (!studentName || !phone || !parentPhone) {
      setTimeout(() => {
         setError("Please fill all fields")
              setTimeout(() => {
                setError("")
              }, 5000);
      }, 50);
      setInvalidPhone(true)
      return
    }
    if (phone.trim().length !== 11 || parentPhone.trim().length !== 11 || !phone.trim().startsWith("01") || !parentPhone.trim().startsWith("01") || isNaN(phone) || isNaN(parentPhone) ) {
       setTimeout(() => {
         setError("Please enter valid phone numbers")
              setTimeout(() => {
                setError("")
              }, 5000);
      }, 50);
      setInvalidPhone(true)
      return
    }
    if(phone.trim() === parentPhone.trim()){
      setTimeout(() => {
         setError("Student and parent phone numbers cannot be the same")
              setTimeout(() => {
                setError("")
              }, 5000);
      }, 50);
      setInvalidPhone(true)
      return
    }
    if(phone.trim() === "01145335636" || parentPhone.trim() === "01145335636"){
      setTimeout(() => {
         setError("This phone number is our contact number, please enter a different one")
              setTimeout(() => {
                setError("")
              }, 5000);
      }, 50);
      setInvalidPhone(true)
      return
    }
    if(studentName.trim().length < 4 || studentName.trim().length > 30){
      setTimeout(() => {
         setError("Please enter a valid name")
              setTimeout(() => {
                setError("")
              }, 5000);
      }, 50);
      setInvalidPhone(true)
      return
    }
    setLoading(true)
    setInvalidPhone(false)
    emailjs.send(
      "service_2ac6iee",
      "template_7z1d9cs",
      {
        grade: grade,
        group: group,
        student_name: studentName,
        phone: phone,
        parent_phone: parentPhone,
      },
      "HaYR2qNVjiwhpY3Df"
    ).then(() => {
      setSent(true)
      setLoading(false)
    }).catch((err) => {
      console.error(err)
      setError("Something went wrong, try again")
      setLoading(false)
    })
  }
  function Facebook(){
    window.open("https://www.facebook.com/alaa.abobakr.1")
  }

  return (
    <>
      <main className="main">
        <h1>Welcome to MR Alaa reservation plateform 2026/2027</h1>
        <h3>Your way to the fullmark !</h3>
             
    
       
     

       

          {!submit && <>
            <h2 className='center'>Choose your grade</h2>
            <section className="sec" onClick={()=> setgrade("")}>

              <div className="div" onClick={(e)=> {e.stopPropagation();setgrade("primary 5")}}>
                Primary 5
                {grade === "primary 5" && <>
                  <p>Choose your group:</p>
                  <div className="option">
                    <p onClick={()=> {setsubmit(true);setgroup("Saturday")}}>Saturday(2:30 PM)</p>
                
                   
                  </div>
                </>}
              </div>

              <div className="div" onClick={(e)=> {e.stopPropagation();setgrade("primary 6")}}>
                Primary 6
                {grade === "primary 6" && <>
                  <p>Choose your group:</p>
                  <div className="option">
                 
                    <p onClick={()=> {setsubmit(true);setgroup("Thursday")}}>Thursday (2:30 PM)</p>
                   
                  </div>
                </>}
              </div>

              <div className="div" onClick={(e)=> {e.stopPropagation();setgrade("prep1")}}>
                Prep.1
                {grade === "prep1" && <>
                  <p>Choose your group:</p>
                  <div className="option">
                    <p onClick={()=> {setsubmit(true);setgroup("Monday")}}>Monday (2:30 PM)</p>
                 
                   
                  </div>
                </>}
              </div>

              <div className="div" onClick={(e)=> {e.stopPropagation();setgrade("prep2")}}>
                Prep.2
                {grade === "prep2" && <>
                  <p>Choose your group:</p>
                  <div className="option">
                    <p onClick={()=> {setsubmit(true);setgroup("Sunday")}}>Sunday (4:30 PM)</p>
                    <p onClick={()=> {setsubmit(true);setgroup("Tuesday")}}>Tuesday (4:30 PM)</p>
                   
                  </div>
                </>}
              </div>

              <div className="div" onClick={(e)=> {e.stopPropagation();setgrade("prep3")}}>
                Prep.3
                {grade === "prep3" && <>
                  <p>Choose your group:</p>
                  <div className="option">
                    <p onClick={()=> {setsubmit(true);setgroup("Sunday")}}>Sunday (2:30 PM)</p>
                    <p onClick={()=> {setsubmit(true);setgroup("Wednesday")}}>Wednesday (2:30 PM)</p>
                     <p onClick={()=> {setsubmit(true);setgroup("Thursday")}}>Thursday (4:30 PM)</p>
                  </div>
                </>}
              </div>

              <div className="div" onClick={(e)=> {e.stopPropagation();setgrade("sec1")}}>
                Sec.1
                {grade === "sec1" && <>
                  <p>Choose your group:</p>
                  <div className="option">
                    <p onClick={()=> {setsubmit(true);setgroup("Monday")}}>Monday (6:30 PM)</p>
                      <p onClick={()=> {setsubmit(true);setgroup("Tuesday")}}>Tuesday (2:30 PM)</p>
                    <p onClick={()=> {setsubmit(true);setgroup("Wednesday")}}>Wednesday (4:30 PM)</p>
                  </div>
                </>}
              </div>
                       <i class="fa-brands fa-facebook" id="facebook-icon" onClick={Facebook}></i>
            </section>
          </>}

          {submit && <>
            <aside>
              <h1>Grade: {grade}</h1>
              <h2>Group: {group}</h2>

              {sent ? (<>
                <h2 style={{color:"green", textAlign:"center"}}><i class="fa-solid fa-circle-check"></i> Sent successfully!</h2>
                <p className='refresh'>Wait until the responce on whatsApp</p>
             </> ) : (
                <div className="form">
                  <input
                    type="text"
                    placeholder='Enter your name'
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className={invalidPhone ? "invalid" : ""}
                    onFocus={()=> setInvalidPhone(false)}
                  />
                  <input
                    type="text" 
                    placeholder='Enter your number(WhatsApp)'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={invalidPhone ? "invalid" : ""}
                    onFocus={()=> setInvalidPhone(false)}
                  />
                  <input
                    type="text"
                    placeholder='Enter your Parent number(WhatsApp)'
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    className={invalidPhone ? "invalid" : ""}
                    onFocus={()=> setInvalidPhone(false)}
                  />
                  <button onClick={handleSend} disabled={loading}>
                    {loading ? "Sending..." : "Send"}
                  </button>
                </div>
              )}
                 <i class="fa-brands fa-facebook" id="facebook-icon" onClick={Facebook}></i>
              <button className='back' disabled={loading} onClick={()=>{setsubmit(false);setgrade("")}}>Back</button>
            </aside>
          </>}

       

        {error && (
          <div className="error">
            <h2>⚠️ {error}</h2>
          </div>
        )}

      </main>
    </>
  )
}

export default App
