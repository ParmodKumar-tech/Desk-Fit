import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Formik,Form,Field,ErrorMessage  } from 'formik';
import * as Yup from 'yup'; 
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../authContent';
import { signup } from '../../api/api.user';


function Signup() {
    
    const [loading,setLoading]=useState(false);
    const {
        setCurrentUserId,
        setCurrentUserToken,
        setCurrentUsername
    }=useAuth();

    const navigate=useNavigate();
    console.log("Signup render");
    const inputFields=[
        {label:"Username", name:"username"},
        {label:"Email", name:"email"},
        {label:"Password", name:"password"}
    ]

    let handleForm=async(formData)=>{
        setLoading(true);
        const Signup=await signup(formData);
        setLoading(false);
        
        if(Signup.success){
        localStorage.setItem("userId",Signup.userId);
        localStorage.setItem("token",Signup.token);
        localStorage.setItem("username",Signup.username);
        setCurrentUserToken(Signup.token);
        setCurrentUserId(Signup.userId);
        setCurrentUsername(Signup.username);
        toast.success(Signup.message);
        navigate('/');
        return;
        }
        toast.error(Signup?.message || Signup);

          
    }

    const validate=Yup.object({
        username: Yup.string().min(4,"minimum 4 characters/more").required("*Required"),
        email:Yup.string().email("email is invalid").required("*Required"),
        password:Yup.string().min(5,"minimum 5 digit/character").required("*Required")
    })



    return (
        <Formik
        initialValues={{username:'',email:'',password:''}}
        validationSchema={validate}
        onSubmit={handleForm}
        >

        {()=>(

            <div className='w-[80%] h-[80vh]  mt-[2rem] flex items-center justify-center mx-auto md:w-[50%]'>
            <Form className='flex flex-col justify-center'>
            <h2 className='font-semibold text-4xl my-5'>SignUp to join Us</h2>
            
            {inputFields.map((field,id)=>(
            
            <React.Fragment key={id}>
            <div className='flex gap-1'>
            <label htmlFor={field.name} className='font-semibold'>{field.label}</label>
            <ErrorMessage name={field.name} component="div" className="text-red-500 " />
            </div>
            
            <Field  id={field.name} 
            className='rounded border  p-1 border-blue-500 my-2' 
            type={field.name=="email"?"email":"text"} 
            placeholder={field.name}
            name={field.name} />
            </React.Fragment>

            ))}
            
            <button disabled={loading} className='rounded bg-[#0077ff] text-white p-1 my-1 font-semibold' type='submit'>{loading?"Loading...":"Sign up"}</button>
            <Link to={"/login"} >Already have an account, <span className='text-decoration-line: underline font-bold'>Login</span></Link>
            </Form>
        </div>
        )}
     
        </Formik>  
     );
}

export default Signup;