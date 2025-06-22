'use client';
import { useRef, useState } from "react";
import { toast } from "react-toastify";

const Scholarship = () => {

  const [examName, setExamName] = useState([
    '8th', '10th', '12th', 'neet', 'IIT', 'NIT', 'government exam', 'college exams'
  ])

  const [userForm, setUserForm] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);

  const handleChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
    console.log(userForm);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    setUserForm({ ...userForm, marksheet: "https://www.cloudinary.com/marksheet" });
    console.log(userForm);
    setIsSubmit(false);
  }

  // this validate a file is valid type or not for images and pdf
  const fileValidate = (file) => {
    const fileTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf'
    ];

    if (!fileTypes.includes(file.type)) return false;
    return true;
  }

  const uploadFile = async (e) => {
    e.preventDefault();
    console.log("file is");

    if (!file) return;
    console.log("file is222");

    if (!fileValidate(file)) return alert("please upload a correct file type");

    try {
      setIsSubmit(true);
      const formdata = new FormData();
      formdata.set('file', file);

      console.log('file is uploading...');
      // save to cloudinary 
      const response = await fetch('/api/upload',
        {
          method: 'POST',
          body: formdata,
        }
      );

      console.log("file is uploaded");
      const data = await response.json();
      // show error
      if(data?.error){
        toast.error(data.error);
      }
      // if data uploaded successfully
      if(data?.message){
        toast.success(data.success);
        console.log(data.url);
      }

    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setFile(null);
      setIsSubmit(false);
      if(fileRef.current){
        fileRef.current.value = "";
      }
    }

  }

  return (
    <div>
      <div>
        <h1 className='text-center font-medium text-3xl my-8'>Welcome to Our Student Excellence Scholarship Portal!</h1>
      </div>
      <h2 className='text-center text-xl'>Fill Schlorship Form</h2>
      <div className='flex justify-center items-center'>
        <form
          onSubmit={handleSubmit}
          className='border border-gray-300 p-4 rounded-md bg-slate-100'
        >
          <div>
            <input
              required
              name="studentname"
              onChange={handleChange}
              value={userForm.studentname || ""}
              type="text"
              placeholder='Enter your name'
              className='bg-white w-xl py-2 px-5 rounded-md border border-gray-400 outline-0 focus:border-gray-600'
            />
          </div>
          <div className='my-1.5'>
            <input
              required
              name="fathername"
              onChange={handleChange}
              value={userForm.fathername || ""}
              type="text"
              placeholder='Enter your father name'
              className='bg-white w-[17rem] mr-4 py-2 px-5 rounded-md border border-gray-400 outline-0 focus:border-gray-600'
            />
            <input
              required
              name="mothername"
              onChange={handleChange}
              value={userForm.mothername || ""}
              type="text"
              placeholder='Enter your mother name'
              className='bg-white w-[17rem] ml-4 py-2 px-5 rounded-md border border-gray-400 outline-0 focus:border-gray-600'
            />
          </div>
          <div className='my-1.5'>
            <input
              required
              name="insistitution"
              onChange={handleChange}
              value={userForm.insistitution || ""}
              type="text"
              placeholder='Enter your insistitution name'
              className='bg-white w-[17rem] mr-4 py-2 px-5 rounded-md border border-gray-400 outline-0 focus:border-gray-600'
            />
            <input
              required
              name="city"
              onChange={handleChange}
              value={userForm.city || ""}
              type="text"
              placeholder='Enter your city name'
              className='bg-white w-[17rem] ml-4 py-2 px-5 rounded-md border border-gray-400 outline-0 focus:border-gray-600'
            />
          </div>
          <div className='my-1.5'>
            <select
              required
              name="exam"
              onChange={handleChange}
              value={userForm.exam || ""}
              className='bg-white capitalize w-[17rem] mr-4 py-2 px-5 rounded-md border border-gray-400 outline-0 focus:border-gray-600'
            >
              <option value="">choose your exam name</option>
              {
                examName.length > 0 &&
                examName.map((exam, idx) => {
                  return <option key={idx} value={exam}>{exam}</option>
                })
              }
            </select>
            <input
              required
              name="percentage"
              onChange={handleChange}
              value={userForm.percentage || ""}
              type="text"
              placeholder='Enter your percentage'
              className='bg-white w-[17rem] ml-4 py-2 px-5 rounded-md border border-gray-400 outline-0 focus:border-gray-600'
            />
          </div>
          <div className='my-1.5'>
            <label htmlFor="marksheet" className="block mb-1 text-gray-700">
              Upload your {userForm ? userForm?.exam : ''} marksheet
            </label>
            <input
              required
              id="marksheet"
              type="file"
              accept="image/*,application/pdf"
              ref={fileRef}
              onChange={e => setFile(e.target.files[0])}
              className='bg-white w-[30rem] mr-4 py-2 px-5 rounded-md border border-gray-400 outline-0 focus:border-gray-600'
            />
            <button
              onClick={uploadFile}
              disabled={isSubmit}
              className="bg-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed p-2 text-white cursor-pointer rounded-sm"
            >upload</button>
          </div>
          <small>upload .jpeg .jpg .png .webp .pdf file</small>
          <button type="submit" disabled={isSubmit} className='w-full disabled:cursor-not-allowed disabled:bg-blue-300 cursor-pointer bg-blue-500 my-2 p-1 rounded-md text-white font-medium text-2xl'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Scholarship
