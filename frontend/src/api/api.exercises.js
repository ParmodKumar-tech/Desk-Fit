
import axios from "axios";
export const RESOURCE_API_END_POINT="https://desk-fit-7grh-backend.vercel.app/api/v1";

export const getAllExecrise= async()=>{
     try{
        const res=await axios.get(`${RESOURCE_API_END_POINT}/`);
                if(res.data.success){
                return res.data;
            }    
        }

    catch(error){
            return error.response.data || "something went wrong.";
        }
}

export const getExercise=async(id)=>{
    try{
        const res=await axios.get(`${RESOURCE_API_END_POINT}/exercise-info/${id}`,{withCredentials:true});
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
        return res.data.secure_url.replace("/upload/", "/upload/f_auto,q_auto,w_400/");
        
    }  

    catch(error){
        return error.response.data || "Failed to upload the image.";
    }
}


export const addExercise=async(formData)=>{
     try {
        const res=await axios.post(`${RESOURCE_API_END_POINT}/exercise`,formData,{withCredentials:true});
            if(res.data.success){
                return res.data;
            }
            
        } catch (error) {
           return error.response.data || "something went wrong.";

        }
}
