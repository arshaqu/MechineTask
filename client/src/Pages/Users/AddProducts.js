import React, { useState } from 'react'
import './Allrounder.css'
import axios from 'axios';

function AddProducts() {

    const initialValues = {
        description: "",
        category: "", 
        model: "",
        price: "",
        size: "",
        color: "",
        product: "",
        image: [],
      };
    
      const [values, setValues] = useState(initialValues);
    
      const onFinish = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let i = 0; i < values.image.length; i++) {
            formData.append("image", values.image[i]);
          }
        formData.append("description", values.description);
        formData.append("category", values.category); 
        formData.append("model", values.model);
        formData.append("price", values.price);
        formData.append("size", values.size);
        formData.append("color", values.color);
        formData.append("product", values.product);
    
        console.log(values.image.length);

        
    try {
        const response = await axios.post('/api/user/addProduct', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
        window.location.reload(); // Reload the current page

      } catch (error) {
        console.error('Error sending data to the backend:', error);
      }
}


    return (
            <div style={{}} className='Font_Family inner_box mt-5'>
                   <form encType="multipart/form-data">
        <div style={{ width: "935px" }} className="mb-4">
            <h1>ADD PRODUCTS</h1>
          <label
            htmlFor="file_input"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Upload file
          </label>
          <input
            id="file_input"
            type="file"
            name="image"
            className="form-control w-full text-sm text-gray-900 border border-gray-600 rounded-lg cursor-pointer bg-gray-50 focus:outline-none dark:text-gray-600 dark:bg-gray-800 dark:border-gray-800 dark:placeholder-gray-500 hover:bg-gray-200 dark:hover:bg-gray-900 shadow-md"
            aria-describedby="file_input_help"
            multiple
            onChange={(e) => {
              setValues({
                ...values,
                image: e.target.files,
              });
              console.log(values);
            }}
          />
        </div>


        <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex' }}>
        <div>      
         <input
          onChange={(e) => {
            setValues({
              ...values,
              product: e.target.value,
            });
            console.log(values);
          }}
          type="text"
          name="product"
          className="inputs"
          placeholder="Product Name"
          required
        />
            </div>
      <div className='mx-3 '>
        <input
        
          onChange={(e) => {
            setValues({
              ...values,
              color: e.target.value,
            });
            console.log(values);
          }}
          type="text"
          name="color "
          className="inputs"
          placeholder="Enter the Color"
          required
        />
      </div>
               
              </div>
            </div>

            <div className='mt-3' style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex' }}>
        <div>      
         <input
          onChange={(e) => {
            setValues({
              ...values,
              size: e.target.value,
            });
            console.log(values);
          }}
          type="text"
          name="size"
          className="inputs"
          placeholder="Product size"
          required
        />
            </div>
      <div className='mx-3 '>
        <input
        
          onChange={(e) => {
            setValues({
              ...values,
              model: e.target.value,
            });
            console.log(values);
          }}
          type="text"
          name="model "
          className="inputs"
          placeholder="Enter the Model"
          required
        />
      </div>
               
              </div>
            </div>






            <div className='mt-3' style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex' }}>
        <div>      
         <input
          onChange={(e) => {
            setValues({
              ...values,
              price: e.target.value,
            });
            console.log(values);
          }}
          type="text"
          name="price"
          className="inputs"
          placeholder="Product Price"
          required
        />
            </div>
      <div className='mx-3 '>
        <input
        
          onChange={(e) => {
            setValues({
              ...values,
              category: e.target.value,
            });
            console.log(values);
          }}
          type="text"
          name="category "
          className="inputs"
          placeholder="Enter the category"
          required
        />
      </div>
               
              </div>
            </div>

            <div className='mt-3'>
            <input
        
        onChange={(e) => {
          setValues({
            ...values,
            description: e.target.value,
          });
          console.log(values);
        }}
        type="text"
        name="description "
        className="inputs_D"
        placeholder="Write the description"
        required
      />
            </div>
            <button
             style={{
                margin:0,
                height:'40px',
                width: "400px",
                backgroundColor: "#A1C398",
                color: "white",
                fontFamily: "serif",
                border:'0',
                borderRadius:'8px',
                marginLeft:'280px'
                
              }}
      className=" mt-3"
      onClick={onFinish}
    >
      Submit
    </button>

        </form>
            </div>

    
    
  )
}

export default AddProducts



