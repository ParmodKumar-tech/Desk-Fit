
import axios from "axios";
export const RESOURCE_API_END_POINT="https://desk-fit-backend.vercel.app/api/v1";
// export const RESOURCE_API_END_POINT="http://localhost:4000/api/v1";

export const getAllExecrise= async()=>{
     try{
        const res=await axios.get(`${RESOURCE_API_END_POINT}`);
                if(res.data.success){
                return res.data;
            }    
        }

    catch(error){
            return error.response.data || "something went wrong.";
        }
}

export const getExercise=async(id,token)=>{
    try{
        const res=await axios.get(`${RESOURCE_API_END_POINT}/exercise-info/${id}`);
        if(res.data.success){
            return res.data;
        }
    }
    catch(error){
        return error.response.data || "something went wrong.";
    }
}


export const uploadImage=async(data)=>{
    
    try{
        const res=await axios.post("https://api.cloudinary.com/v1_1/dhrqts9ml/image/upload",data);
        if(res.data.url){
            console.log(res.data.url);
            return res.data.url;
        }    
    }
    catch(error){
        return error.response.data || "Failed to upload the image.";
    }
}


export const addExercise=async(formData)=>{
     try {
        const res=await axios.post(`${RESOURCE_API_END_POINT}/exercise`,formData);
            console.log(res.data);
            if(res.data.success){
                return res.data;
            }
            
        } catch (error) {
           return error.response.data || "something went wrong.";

        }
}