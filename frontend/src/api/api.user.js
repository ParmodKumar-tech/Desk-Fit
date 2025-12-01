import axios from "axios";
export const USER_API_END_POINT="https://desk-fit-backend.vercel.app/api/v1";

export const signup=async(formData)=>{
       try{
            const res=await axios.post(`${USER_API_END_POINT}/user/signup`,formData);
            if(res.data.success){
                return res.data;
            }
        }
            catch(error){
                return error.response.data || "something went wrong.";
            }
}



export const login=async(formData)=>{
     try{
        const res=await axios.post(`${USER_API_END_POINT}/user/login`,formData)
        if(res.data.success){
            return res.data; 
        }
        }
        
        catch(error){
           return error.response.data || "something went wrong."; 
           
        }
}

