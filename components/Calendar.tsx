'use client';                                                                                                                                                               
                                                                                                                                                                              
  import { useState } from 'react';                                                                                                                                           
                                                                                                                                                                              
  export default function Calendar() {                                                                                                                                        
    const [currentDate, setCurrentDate] = useState(new Date());                                                                                                               
                                                                                                                                                                                                                                                                                                                        
    const changeMonth = (delta: number) => {                                                                                                                                  
      const newDate = new Date(currentDate);                                                                                                                                  
      newDate.setMonth(newDate.getMonth() + delta);                                                                                                                           
      setCurrentDate(newDate);                                                                                                                                                
    };                                                                                                                                                                        
                                                                                                                                                                              
    return (                                                                                                                                                                  
      <div className="bg-white rounded-lg shadow-lg p-6">                                                                                                                                                                                                                                                        
        <div className="flex items-center justify-between mb-6">                                                                                                              
          <button                                                                                                                                                             
            onClick={() => changeMonth(-1)}                                                                                                                                   
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"                                                                                 
          >                                                                                                                                                                   
            Previous                                                                                                                                                          
          </button>                                                                                                                                                           
                                                                                                                                                                              
          <h2 className="text-2xl font-bold">                                                                                                                                 
            {currentDate.toLocaleDateString('en-US', {                                                                                                                        
              month: 'long',                                                                                                                                                  
              year: 'numeric'                                                                                                                                                 
            })}                                                                                                                                                               
          </h2>                                                                                                                                                               
                                                                                                                                                                              
          <button                                                                                                                                                             
            onClick={() => changeMonth(1)}                                                                                                                                    
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"                                                                                 
          >                                                                                                                                                                   
            Next                                                                                                                                                              
          </button>                                                                                                                                                           
        </div>                                                                                                                                                                
                                                                                                                                                                              
        <p className="text-gray-500">Calendar grid coming soon...</p>                                                                                                         
      </div>                                                                                                                                                                  
    );                                                                                                                                                                        
  }    