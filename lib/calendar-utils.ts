export const getDaysInMonth = (date: Date): number => {                                                                                                                     
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();                                                                                                    
  };                                                                                                                                                                          
                                                                                                                                                                              
  export const getFirstDayOfMonth = (date: Date): number => {                                                                                                                 
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();                                                                                                         
  };                                                                                                                                                                          
                                                                                                                                                                              
  export const isToday = (day: number | null, currentDate: Date): boolean => {                                                                                                
    if (!day) return false;                                                                                                                                                   
    const today = new Date();                                                                                                                                                 
    return (                                                                                                                                                                  
      day === today.getDate() &&                                                                                                                                              
      currentDate.getMonth() === today.getMonth() &&                                                                                                                          
      currentDate.getFullYear() === today.getFullYear()                                                                                                                       
    );                                                                                                                                                                        
  };                                                                                                                                                                          
                                                                                                                                                                              
  export const generateCalendarDays = (currentDate: Date): (number | null)[] => {                                                                                             
    const daysInMonth = getDaysInMonth(currentDate);                                                                                                                          
    const firstDay = getFirstDayOfMonth(currentDate);                                                                                                                         
    const days: (number | null)[] = [];                                                                                                                                       
                                                                                                                                                                                                                                                                                                        
    for (let i = 0; i < firstDay; i++) {                                                                                                                                      
      days.push(null);                                                                                                                                                        
    }                                                                                                                                                                         
                                                                                                                                                                                                                                                                                                                                      
    for (let day = 1; day <= daysInMonth; day++) {                                                                                                                            
      days.push(day);                                                                                                                                                         
    }                                                                                                                                                                         
                                                                                                                                                                              
    return days;                                                                                                                                                              
  };  