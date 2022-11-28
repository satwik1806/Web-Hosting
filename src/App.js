import React, { useEffect, useState } from 'react'
import FormInputComponent from "./Component/FormInputComponent";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


function App() {
  const published_url = "https://docker-nextjs-5atq7r3y7a-uc.a.run.app/"
  const [showtext, setShowText] = useState(false)

  const validationSchema = yup.object().shape({
    reponame: yup.string().required("Name is required "),
    githubpat: yup.string().required("Github pat is required ")
  });
  
  const {
    register,
    trigger,
    control,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    watch,
    reset,
    setValue: setValuesFieldForm,
    getValues
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async (data) => {
    console.log(data);
    fetch('https://api.github.com/repos/satwik1806/Web-Hosting/actions/workflows/workflow.yml/dispatches', {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': 'Bearer ${add satwik1806 PAT, please contact}',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify({ref: "main", inputs: {reponame: data.reponame, githubpat: data.githubpat}})
    }).then(()=>{
      setShowText(true);
    })
  };

  return (
    <div
      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
    >
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div class="px-6 py-4 mt-8 mb-8 flex flex-col ">
            <div class="font-bold text-lg mb-2 ">Welcome to WEB hosting service</div>
            <div className="grid grid-cols-1 sm:grid-cols-1">
              <div className=" block " >

                <div className="mt-4">
                  <form onSubmit={handleSubmit(onSubmit)}>

                    <FormInputComponent
                      label="Repo name"
                      name="reponame"
                      placeholder="Please enter your Repo name"
                      control={control}
                      error={errors.reponame?.message}
                      required
                    />
                    <FormInputComponent
                      label="Github pat"
                      name="githubpat"
                      placeholder="Enter a githubpat"
                      control={control}
                      type="password"
                      error={errors.githubpat?.message}
                      required
                    />
                    {
                      showtext ? (<>
                      Try this link after 10 mins - <a href={published_url} className='underline'>{published_url}</a>
                      </>) : (<div className="col-span-12  sm:flex sm:items-center sm:gap-4 mt-4">
                        <button onClick={onSubmit}
                          className="w-full inline-block px-12 py-3 text-sm rounded-md font-medium text-white transition bg-[#5c8de8] hover:bg-darkBlue"
                        >
                          Submit                      
                      </button>

                      </div>)
                    }


                  </form>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
