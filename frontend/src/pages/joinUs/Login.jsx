import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Formik,Form,ErrorMessage,Field} from 'formik';
import * as Yup from 'yup';

import { useAuth } from '../../authContent';
import { login } from '../../api/api.user';

function Login() {

    const navigate=useNavigate();
 
    const [loading,setLoading]=useState(false);
    const {
        setCurrentUserId,
        setCurrentUserToken,
        setCurrentUsername
    }=useAuth();

    const inputFields=[
        {label:"Email", name:"email"},
        {label:"Password", name:"password"}
    ]


    let handleForm=async(formData)=>{
        setLoading(true);

        const Login=await login(formData);
        setLoading(false);

        if(Login.success){
        toast.success(Login.message);
        localStorage.setItem("userId",Login.userId);
        localStorage.setItem("username",Login.username);
        localStorage.setItem("token",Login.token);

        setCurrentUserToken(Login.token);
        setCurrentUserId(Login.userId);
        setCurrentUsername(Login.username);
        navigate('/');
        return;
        }

        toast.error(Login?.message || Login);
        
        
    }

    const validate=Yup.object({
        email:Yup.string().email("enter valid email").required("*Required"),
        password:Yup.string().required("*Required")
    })


    return (
        <Formik
        initialValues={{email:'',password:''}}
        validationSchema={validate}
        onSubmit={handleForm}
        >
        {()=>(

        <div className='w-[80%] h-[80vh]  mt-[2rem] flex items-center justify-center mx-auto md:w-[50%]'>
            <Form className='flex flex-col justify-center '>

            <h2 className='font-semibold text-4xl my-5'>Login! | DeskFit</h2>
            
            {inputFields.map((field,id)=>(
            <React.Fragment key={id}>
            <div className='flex gap-1'>
            <label htmlFor={field.name} className='font-semibold'>{field.label}</label>
            <ErrorMessage name={field.name} component="div" className='text-red-500' />
            </div>

            <Field  id={field.name} className='rounded border  p-1 border-blue-500 my-2' type={field.name=="email"?"email":"text"} placeholder={field.name} name={field.name} />
           </React.Fragment>
            ))}
           
            <button disabled={loading} className=' my-1 rounded bg-[#0077ff] text-white p-1 font-semibold' type='submit'>{loading?"Loading...":"Login"}</button>
            <Link to={"/signup"} >New User, <span className='text-decoration-line: underline font-bold'>Register Now!</span></Link>
            </Form>
        </div>
        )}
        </Formik>
     );
}

export default Login;