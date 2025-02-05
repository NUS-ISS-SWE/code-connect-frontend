import React, {useState} from 'react';
import Header from '../components/Header';
import Textbox from '../components/Textbox';

const ProfilePage = () => {
    const [text, setText] = useState("");

  return (
  <div>
    <Header text={"Code Connect"}/>
    <Header text={"Profile Page"}/>
<div className="bg-gray-900 h-screen flex items-center justify-center w-[100vw]">
    <div>
      {/* ✅ Profile Section */}
      <div className="bg-white p-10 rounded-lg shadow-lg w-[100%vw] md:w-[100%] mt-5">
        <h1 className="font-bold text-2xl text-center mb-4">Profile Page</h1>

        {/* ✅ Full Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Full Name</label>
          <Textbox
            placeholder="Enter your name"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {/* ✅ Job Title */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Job Title</label>
          <Textbox placeholder="Software Engineer" value="" onChange={() => {}} />
        </div>

        {/* ✅ Company */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Company</label>
          <Textbox placeholder="Current Company" value="" onChange={() => {}} />
        </div>

        {/* ✅ Location */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Location</label>
          <Textbox placeholder="Singapore" value="" onChange={() => {}} />
        </div>

        {/* ✅ Contact Information */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Contact</label>
          <Textbox placeholder="Email or Phone" value="" onChange={() => {}} />
        </div>

        {/* ✅ About Me */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">About Me</label>
          <textarea
            className="w-full border rounded p-2"
            rows="3"
            placeholder="Write something about yourself..."
          ></textarea>
        </div>

        {/* ✅ Skillset */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Skillset</label>
          <Textbox placeholder="React, Node.js, C#" value="" onChange={() => {}} />
        </div>
           </div>
      </div>
      </div>
      </div>
//Full Name
//Profile Picture
//Job Title
//CurrentCompany
//Location
//Contact Information
//About Me
//Certifications
//Education
//Work Experience
//Skillset
//Programming Languages


  );
};

export default ProfilePage;