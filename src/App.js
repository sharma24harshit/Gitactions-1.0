import './App.css';
import { useState} from "react";
import axios from "axios";

function App() {
 const [data, setData] = useState([]);
 const[loading, setLoading] = useState(false);

  const handleClick = async (value)=>{
    setLoading(true);
    try {
      const res = await axios(`https://api.github.com/search/repositories?q=stars:%3E1+language:${value}`)
      setData(res.data.items);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  
  };

   const handledivClick  = (path)=>{
    window.location.href = (`${path}`);
  }

  
  return (
    <div className="App">
      
        <div className='heading_btns' >
           <div onClick={()=>handleClick("all")} >All</div>
           <div onClick={()=>handleClick("HTML")} >HTML</div>
           <div onClick={()=>handleClick("CSS")} >CSS</div>
           <div onClick={()=>handleClick("Javascript")} >Javascript</div>
         </div> 

        { (loading) ?  <h1 style={{textAlign:"center"}} >...Loading</h1> :
        <div className='main_box' >
          {data && data.map((el)=>(
            // language  forks_count  stargazers_count  full_name
            <div key={el.id} onClick={()=>handledivClick(el.clone_url)} >
             <h3>Repository name: {el.full_name}</h3> 
              <h4>Language: {el.language}</h4>
              <h4>Stars count: {el.stargazers_count}</h4>
              <h4> Forks count:{el.forks_count}</h4>
            </div>
          ))}
        </div>
        } 
     
    </div>
  );
  
}

export default App;


