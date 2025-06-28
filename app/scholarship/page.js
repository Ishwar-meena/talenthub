'use client';
import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { saveStudentData } from "@/actions/schlorshipActions";
import { SendEmail } from "@/lib/sendEmail";
const Scholarship = () => {

  const [examName, setExamName] = useState([
    '8th', '10th', '12th', 'neet', 'IIT', 'NIT', 'government exam', 'college exams'
  ])

  const [userForm, setUserForm] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [file, setFile] = useState(null);
  const [fileLink, setFileLink] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const fileRef = useRef(null);
  const { data: session } = useSession();


  const handleChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fileLink) return alert("please upload marksheet");
    setIsSubmit(true);

    try {
      const response = await saveStudentData(userForm);

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);
      setIsSaved(true);
      // send a notification email to user after successful submission;
      const result = await SendEmail({ email: session.user.email, username: userForm.name, type: 'schlorship' })
      const data = await result.json();

      if (data.success) {
        console.log(data.message);
      } else {
        console.log(data.message);
      }

      setUserForm({}); // reset form after submission
      setUserForm({ userId: session.user.id });
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setIsSubmit(false);
    }
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

  // this function upload user files on cloudinary
  const uploadFile = async (e) => {
    e.preventDefault();
    if (!file) return;
    if (!fileValidate(file)) return alert("please upload a correct file type");

    try {
      setIsSubmit(true);

      const formdata = new FormData();
      formdata.set('file', file); // setfile 
      toast.warning('file is uploading...');
      // save to cloudinary 
      const response = await fetch('/api/upload',
        {
          method: 'POST',
          body: formdata,
        }
      );

      const data = await response.json();
      // show error
      if (data?.error) {
        toast.error(data.error);
      }
      // if data uploaded successfully
      if (data?.message) {
        toast.success(data.message);
        setUserForm({ ...userForm, marksheet: data.url }); // set link in userform
        setFileLink(data.url); // check file link is in form when submit
      }

    } catch (error) {
      console.error(error);
      toast.error(error.message);
      throw error;
    } finally {
      if (fileRef.current) {
        fileRef.current.value = "";
      }
      setFile(null);
      setIsSubmit(false);
    }

  }

  useEffect(() => {
    if (session?.user?.id) {
      setUserForm((prev)=>({ ...prev, userId: session.user.id }));
    }
  }, [session])


  if (!session) {
    return <p className="text-center text-2xl mt-10 ">Please login to Access This page.</p>
  }

  return (
    <div>
      <div>
        <h1 className='text-center font-medium sm:text-3xl text-xl my-6'>Welcome to Our Student Excellence Scholarship Portal!</h1>
      </div>
      <h2 className='text-center sm:text-xl text-lg my-2'>Fill Schlorship Form</h2>
      {
        isSaved && <div className="text-center text-red-500 italic text-lg my-2">please check your application status on dashboard</div>
      }

      <div className='flex justify-center items-center'>
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto p-6 bg-slate-100 border border-gray-300 rounded-xl shadow-sm space-y-6"
        >
          {/* Full Name */}
          <div>
            <input
              required
              name="name"
              onChange={handleChange}
              value={userForm.name || ""}
              type="text"
              placeholder="Enter your name"
              className="w-full bg-white py-2 px-5 rounded-md border border-gray-400 outline-0 focus:border-gray-600"
            />
          </div>

          {/* Father & Mother Name */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              required
              name="fathername"
              onChange={handleChange}
              value={userForm.fathername || ""}
              type="text"
              placeholder="Enter your father name"
              className="flex-1 bg-white py-2 px-5 rounded-md border border-gray-400 outline-0 focus:border-gray-600"
            />
            <input
              required
              name="mothername"
              onChange={handleChange}
              value={userForm.mothername || ""}
              type="text"
              placeholder="Enter your mother name"
              className="flex-1 bg-white py-2 px-5 rounded-md border border-gray-400 outline-0 focus:border-gray-600"
            />
          </div>

          {/* Institution & City */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              required
              name="insistitution"
              onChange={handleChange}
              value={userForm.insistitution || ""}
              type="text"
              placeholder="Enter your institution name"
              className="flex-1 bg-white py-2 px-5 rounded-md border border-gray-400 outline-0 focus:border-gray-600"
            />
            <input
              required
              name="city"
              onChange={handleChange}
              value={userForm.city || ""}
              type="text"
              placeholder="Enter your city name"
              className="flex-1 bg-white py-2 px-5 rounded-md border border-gray-400 outline-0 focus:border-gray-600"
            />
          </div>

          {/* Exam & Result */}
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              required
              name="exam"
              onChange={handleChange}
              value={userForm.exam || ""}
              className="flex-1 bg-white capitalize py-2 px-5 rounded-md border border-gray-400 outline-0 focus:border-gray-600"
            >
              <option value="">Choose your exam name</option>
              {examName.length > 0 &&
                examName.map((exam, idx) => (
                  <option key={idx} value={exam}>
                    {exam}
                  </option>
                ))}
            </select>
            <input
              required
              name="result"
              onChange={handleChange}
              value={userForm.result || ""}
              type="text"
              placeholder="Enter your percentage/marks"
              className="flex-1 bg-white py-2 px-5 rounded-md border border-gray-400 outline-0 focus:border-gray-600"
            />
          </div>

          {/* File Upload */}
          <div>
            <label htmlFor="marksheet" className="block mb-2 text-gray-700 font-medium">
              Upload your {userForm.exam || "exam"} marksheet
            </label>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <input
                id="marksheet"
                type="file"
                accept="image/*,application/pdf"
                ref={fileRef}
                onChange={(e) => setFile(e.target.files[0])}
                className="bg-white w-full sm:w-[30rem] py-2 px-5 rounded-md border border-gray-400 outline-0 focus:border-gray-600"
              />
              <button
                type="button"
                onClick={uploadFile}
                disabled={isSubmit}
                className="bg-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed px-4 py-2 text-white rounded-md"
              >
                Upload
              </button>
            </div>
            <small className="text-sm text-gray-500 mt-1 block">
              Allowed file types: .jpeg, .jpg, .png, .webp, .pdf
            </small>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmit}
            className="w-full bg-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed text-white py-3 text-xl font-semibold rounded-md transition hover:bg-blue-600"
          >
            Submit
          </button>
        </form>

      </div>
    </div>
  )
}

export default Scholarship
