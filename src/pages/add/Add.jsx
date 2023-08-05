import React, { useReducer, useState } from "react";
import "./Add.scss";
import { courseReducer, INITIAL_STATE } from "../../reducers/courseReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";


const Add = () => {
    // State to manage file uploads
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadingAll, setUploadingAll] = useState(false);
  // Use a reducer to manage course state
  const [state, dispatch] = useReducer(courseReducer, INITIAL_STATE);
// const currentUser = getCurrentUser();
// const userId = currentUser._id;
  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
    
  };
    // Event handler for input changes
  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value.trim(),
    });
    e.target[0].value = "";
  };

  const handleCoverImageUpload = async () => {
  
    try {
      // Upload cover image
      const coverImage = await upload(singleFile);

      setUploading(true);
       // Dispatch the action to update the course state with the uploaded images
      dispatch({ type: "ADDCOVER_IMAGES", payload: { coverImage } });
    } catch (err) {
      console.log(err);
    }
  };
  
  const handleAdditionalImagesUpload = async () => {
    
    try {
// Upload additional images
      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          
          return url;
        })
      );
      setUploadingAll(true);
       // Dispatch the action to update the course state with the uploaded images
      dispatch({ type: "ADD_IMAGES", payload: {  images } });
    } catch (err) {
      console.log(err);
    }
  };
  
  const navigate = useNavigate();

  const queryClient = useQueryClient();
 // Use the useMutation hook from react-query to handle the course creation mutation
  const mutation = useMutation({
   
    mutationFn: (course) => {
      return newRequest.post("/courses", course);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myCourses"]);
    },
  });

  // Event handler for submitting the course form
  const handleSubmit = (e) => {
    e.preventDefault();
   
    mutation.mutate(state);
    navigate("/mycourses")
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Course</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Course Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. I am going to teach"
              onChange={handleChange}
            />
             {/* Course Category */}
            <label htmlFor="">Category</label>
            <select name="courseCategory" id="courseCategory" onChange={handleChange}>

              <option value="Accounting">Accounting</option>
              <option value="AIServices">AI Services</option>
              <option value="ComputerScience">Computer Science</option>
              <option value="Design">Design</option>
              <option value="Development">Development</option>
              <option value="ITAndSoftware">IT & Software</option>
              <option value="Music">Music</option>
              <option value="Marketing">Marketing</option>
              <option value="LifeStyle">LifeStyle</option>
              

            </select>
                {/* Image Upload Section */}
            <div className="images">
              <div className="imagesInputs">
                 {/* Cover Image Upload */}
                <label htmlFor="">Cover Image (please click upload )</label>
                <div>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <button onClick={handleCoverImageUpload} className="up1">
                {uploading ? "uploaded" : "Upload"}
              </button>
              </div>
              {/* Additional Images Upload */}
                <label htmlFor="">Upload Images (please click upload )</label>
                <div>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
                <button  className="up2" onClick={handleAdditionalImagesUpload}>
                {uploadingAll ? "uploaded" : "Upload"}
              </button>
              
                </div>
              </div>
              
            </div>
            <label htmlFor="">Description</label>
            <textarea
              name="desc"
              id=""
              placeholder="Brief descriptions to introduce your Course "
              cols="0"
              rows="16"
              onChange={handleChange}
            ></textarea>
           
          </div>
          {/* Section for Course Details */}
          <div className="details">
            
            <label htmlFor="">Short Description</label>
             {/* Short Description of the course */}
            <textarea
              name="shortDesc"
              onChange={handleChange}
              id=""
              placeholder="Short description of your course"
              cols="30"
              rows="10"
            ></textarea>
            <label htmlFor="">Course Duration (e.g. 3 days)</label>
            {/* Course Duration input */}
            <input type="number" name="duration" onChange={handleChange} />
            <label htmlFor="">How many session you are planning to provide</label>
             {/* Number of sessions input */}
            <input
              type="number"
              name="numberOfClass"
              onChange={handleChange}
            />
            <label htmlFor="">What you will Teach</label>
              {/* Form to add main topics */}
            <form action="" className="add" onSubmit={handleFeature}>
              <input type="text" placeholder="e.g. page design" />
              <button type="submit">add</button>
            </form>
             {/* List of added main topics */}
            <div className="addedFeatures">
              {state?.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            {/* Course Price */}
            <label htmlFor="">Price</label>
            <input type="number" onChange={handleChange} name="price" />
            <button onClick={handleSubmit}>Create Course</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
