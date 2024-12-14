'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import FormInput from '../form-input';
import Image from 'next/image';

type ResultFormProps = {
  type: 'create' | 'update';
  data?: any;
};

const resultSchema = z.object({
  username: z.string().min(3, 'User name must be at least 3 characters long!'),
  email: z.string().email({ message: 'Invalid email address!' }),
  password: z.string().min(6, 'Password must be at least 6 characters long!'),
  firstName: z.string().min(1, 'First name is required!'),
  lastName: z.string().min(1, 'Last name is required!'),
  phone: z.string().min(1, 'Phone number is required!'),
  address: z.string().min(1, 'Address is required!'),
  bloodType: z.string().min(1, 'Blood type is required!'),
  birthday: z.date({ message: 'Birthday is required!' }),
  sex: z.enum(['male', 'female'], { message: 'Sex is required!' }),
  image: z.instanceof(File, { message: 'Image is required!' }),
});

type Inputs = z.infer<typeof resultSchema>;

export default function ResultForm({ type, data }: ResultFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(resultSchema),
  });

  function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <form
      action=''
      className='p-4 flex flex-col gap-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className='text-xl font-semibold'>Create Result</h1>
      <span className='text-xs text-gray-400 font-medium'>
        Authentication Info
      </span>

      <div className='flex flex-col lg:flex-row gap-4'>
        <FormInput
          label='User Name'
          register={register}
          name='username'
          defaultValue={data?.username}
          error={errors?.username!}
        />
        <FormInput
          label='Email'
          type='email'
          register={register}
          name='email'
          defaultValue={data?.email}
          error={errors?.email!}
        />
        <FormInput
          label='Password'
          type='password'
          register={register}
          name='password'
          defaultValue={data?.password}
          error={errors?.password!}
        />
      </div>

      <span className='text-xs text-gray-400 font-medium'>Personal Info</span>
      <div className='flex flex-col lg:flex-row gap-4'>
        <FormInput
          label='First Name'
          register={register}
          name='firstname'
          defaultValue={data?.firstname}
          error={errors?.firstName!}
        />
        <FormInput
          label='Last Name'
          register={register}
          name='lastname'
          defaultValue={data?.lastname}
          error={errors?.lastName!}
        />
        <FormInput
          label='Phone'
          type='phone'
          register={register}
          name='phone'
          defaultValue={data?.phone}
          error={errors?.phone!}
        />
      </div>
      <FormInput
        label='Address'
        register={register}
        name='address'
        defaultValue={data?.address}
        error={errors?.address!}
      />
      <div className='flex flex-col lg:flex-row gap-4'>
        <FormInput
          label='Blood Type'
          register={register}
          name='bloodType'
          defaultValue={data?.bloodType}
          error={errors?.bloodType!}
        />
        <FormInput
          label='Birthday'
          type='date'
          register={register}
          name='birthday'
          defaultValue={data?.birthday}
          error={errors?.birthday!}
        />
        <div className='flex flex-col gap-2 w-full'>
          <label
            htmlFor='username'
            className='text-sm font-medium text-gray-500'
          >
            Sex
          </label>
          <select
            {...register('sex')}
            defaultValue={data?.sex}
            className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
          >
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </select>
          {errors?.sex?.message && (
            <span className='text-red-500 text-xs'>
              {errors?.sex?.message?.toString()}
            </span>
          )}
        </div>
        <div className='flex flex-col gap-2 w-full  lg:pt-2 lg:px-2 lg:mt-6'>
          <label
            htmlFor='image'
            className='text-sm font-medium text-gray-500 flex items-center gap-2 cursor-pointer'
          >
            <Image src='/upload.png' alt='button' width={28} height={28} />
            <span className='text-xs'>Upload a photo</span>
          </label>
          <input
            type='file'
            id='image'
            {...register('image')}
            className='hidden'
          />

          {errors?.image?.message && (
            <span className='text-red-500 text-xs'>
              {errors?.image?.message?.toString()}
            </span>
          )}
        </div>
      </div>
      <button className='bg-blue-400 text-white py-2 px-4 rounded-md border-none w-max '>
        {type === 'create' ? 'Create' : 'Update'}
      </button>
    </form>
  );
}
