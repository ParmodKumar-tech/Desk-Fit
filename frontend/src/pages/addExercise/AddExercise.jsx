import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { addExercise, uploadImage } from '../../api/api.exercises';

export default function AddExercise() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [temp, setTemp] = useState({
    instructions: "",
    focusArea: "",
    commonMistakes: "",
    breathingTips: ""
  });

  const fieldArrayConfigs = [
    {
      label: "INSTRUCTIONS",
      name: "instructions",
      placeholder: "Add Instruction"
    },
    {
      label: "FOCUS AREA",
      name: "focusArea",
      placeholder: "Add Focus Area"
    },
    {
      label: "COMMON MISTAKES",
      name: "commonMistakes",
      placeholder: "Common Mistake"
    },
    {
      label: "BREATHING TIPS",
      name: "breathingTips",
      placeholder: "Breathing Tip"
    }
  ];

  const inputFields = [
    { label: "NAME", name: "name", type: "text" },
    { label: "Upload GIF", name: "gifAnimation", type: "file" },
    { label: "Video URL", name: "url", type: "url" },
    { label: "DURATION", name: "duration", type: "text" }
  ];

  const validate = Yup.object({
    name: Yup.string().required("*Required"),
    gifAnimation: Yup.mixed()
      .required("*Required")
      .test("FILE_TYPE", "*File should be a gif", value => value && value.type === "image/gif"),
    url: Yup.string().required("*Required"),
    duration: Yup.string().required("*Required"),
    instructions: Yup.array().of(Yup.string()).min(1, "*Add at least one instruction"),
    focusArea: Yup.array().of(Yup.string()).min(1, "*Add at least one focus area"),
    commonMistakes: Yup.array().of(Yup.string()).min(1, "*Add at least one common mistake"),
    breathingTips: Yup.array().of(Yup.string()).min(1, "*Add at least one breathing tip"),
  });

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    let imageUrl = formData.gifAnimation;
    if (imageUrl && imageUrl instanceof File) {
      const data = new FormData();
      data.append("file", imageUrl);
      data.append("upload_preset", "DeskFit_gif");
      data.append("cloud_name", "dhrqts9ml");
      const uploaded = await uploadImage(data);
      imageUrl = uploaded; 
      
    }
    const payload = { ...formData, gifAnimation: imageUrl };
    const result = await addExercise(payload);
    setIsLoading(false);
    if (result) {
      toast.success(result.message);
      navigate("/");
    }
    else{
      toast.error(result?.message || result);
    }
    
  };

  return (
    <div className='w-full flex items-center justify-center p-14 mt-10'> 
      <div className="font-medium w-full lg:w-[60%] h-auto border rounded border-black p-4 flex flex-col justify-start my-4">
        <h1 className="bold text-2xl text-center underline">Add Exercise Information</h1>
        <div className='w-[90%] mx-auto'>
          <Formik
            initialValues={{
              name: '',
              gifAnimation: '',
              url: '',
              duration: '',
              instructions: [],
              focusArea: [],
              commonMistakes: [],
              breathingTips: [],
            }}
            validationSchema={validate}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, values }) => (
              <Form>
                {inputFields.map((field) =>
                  field.type === "file" ? (
                    <div key={field.name} className="flex flex-col justify-between my-6">
                      <h3 className='text-[#0077ff] font-bold'>{field.label}</h3>
                      <input
                        className="border w-full rounded border-sky-500 p-2"
                        type="file"
                        name={field.name}
                        accept="image/gif"
                        onChange={e => setFieldValue(field.name, e.currentTarget.files[0])}
                      />
                      <ErrorMessage name={field.name} component="div" className="text-red-500 text-sm" />
                    </div>
                  ) : (
                    <div key={field.name} className="flex flex-col justify-between my-6">
                      <h3 className='text-[#0077ff] font-bold'>{field.label}</h3>
                      <Field
                        className="border w-full rounded border-sky-500 p-2"
                        type={field.type}
                        placeholder={field.name}
                        name={field.name}
                      />
                      <ErrorMessage name={field.name} component="div" className="text-red-500 text-sm" />
                    </div>
                  )
                )}

                {fieldArrayConfigs.map(field => (
                  <div key={field.name} className="flex flex-col justify-between my-7">
                    <h3 className='text-[#0077ff] font-bold'>{field.label}</h3>
                    <FieldArray name={field.name}>
                      {({ push, remove, form }) => (
                        <>
                          <div className='flex gap-2 items-center'>
                            <Field
                              className="border w-full rounded border-sky-500 p-2 mb-3"
                              placeholder={field.placeholder}
                              name={field.name}
                              value={temp[field.name]}
                              onChange={e => setTemp(prev => ({ ...prev, [field.name]: e.target.value }))}
                            />
                            <Link
                              type="button"
                              onClick={() => {
                                if (temp[field.name].trim()) {
                                  push(temp[field.name].trim());
                                  setTemp(prev => ({ ...prev, [field.name]: "" }));
                                }
                              }}
                              className="bg-black text-white p-1 rounded"
                            >
                              Add
                            </Link>
                          </div>
                          <ul>
                            {form.values[field.name].map((item, idx) => (
                              <li key={idx}>
                                {item}
                                <button
                                  type="button"
                                  onClick={() => remove(idx)}
                                  className="ml-2 text-sm text-red-500"
                                >
                                  Remove
                                </button>
                              </li>
                            ))}
                          </ul>
                          <ErrorMessage name={field.name} component="div" className="text-red-500 text-sm" />
                        </>
                      )}
                    </FieldArray>
                  </div>
                ))}

                <div className="flex flex-col justify-between my-2">
                  <button
                    disabled={isLoading}
                    className="w-full font-bold rounded px-4 py-1 border border-gray-800 hover:text-cyan-400"
                    type="submit"
                  >
                    {isLoading ? "Loading..." : "Submit"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
