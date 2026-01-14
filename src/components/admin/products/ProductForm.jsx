import { useEffect, useState } from 'react'
import InputField from "../../shared/InputField";
import SelectTextField from '../../shared/SelectTextField';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';

const ProductForm = ({ setOpen, product, update=false}) => {

    const [loader, setLoader] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState();
    const { categories } = useSelector((state) => state.products);

     const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm({
        mode: "onTouched"
    });


  return (
    <div className='py-5 relative h-full'>
        <form className='space-y-4'
            onSubmit="">
            <div className='flex md:flex-row flex-col gap-4 w-full'>
                <InputField 
                    label="Product Name"
                    required
                    id="productName"
                    type="text"
                    message="This field is required*"
                    register={register}
                    placeholder="Product Name"
                    errors={errors}
                    />

                {!update && (
                    <SelectTextField
                        label="Select Categories"
                        select={selectedCategory}
                        setSelect={setSelectedCategory}
                        lists={categories}
                    />
                )}
            </div>

            <div className='flex md:flex-row flex-col gap-4 w-full'>
                <InputField 
                    label="Price"
                    required
                    id="price"
                    type="number"
                    message="This field is required*"
                    placeholder="Product Price"
                    register={register}
                    errors={errors}
                    />

                    <InputField 
                    label="Quantity"
                    required
                    id="quantity"
                    type="number"
                    message="This field is required*"
                    register={register}
                    placeholder="Product Quantity"
                    errors={errors}
                    />
            </div>
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <InputField
            label="Discount"
            id="discount"
            type="number"
            message="This field is required*"
            placeholder="Product Discount"
            register={register}
            errors={errors}
          />
          <InputField
            label="Special Price"
            id="specialPrice"
            type="number"
            message="This field is required*"
            placeholder="Product Discount"
            register={register}
            errors={errors}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
            <label htmlFor='desc'
              className='font-semibold text-sm text-slate-800'>
                Description
            </label>

            <textarea
                rows={5}
                placeholder="Add product description...."
                className={`px-4 py-2 w-full border outline-hidden bg-transparent text-slate-800 rounded-md ${
                    errors["description"]?.message ? "border-red-500" : "border-slate-700" 
                }`}
                maxLength={255}
                {...register("description", {
                    required: {value: true, message:"Description is required"},
                })}
                />

                {errors["description"]?.message && (
                    <p className="text-sm font-semibold text-red-600 mt-0">
                        {errors["description"]?.message}
                    </p>
                )}
        </div>

        <div className='flex w-full justify-between items-center absolute bottom-14'>
            <Button disabled={loader}
                    onClick={() => setOpen(false)}
                    variant='outlined'
                    className='text-white py-[10px] px-4 text-sm font-medium'>
                Cancel
            </Button>

            <Button
                disabled={loader}
                type='submit'
                variant='contained'
                color='primary'
                className='bg-custom-blue text-white  py-[10px] px-4 text-sm font-medium'>
                {loader ? (
                    <div className='flex gap-2 items-center'>
                        <Spinners /> Loading...
                    </div>
                ) : (
                    "Save"
                )}
            </Button>
        </div>
        </form>
    </div>
  )
}

export default ProductForm