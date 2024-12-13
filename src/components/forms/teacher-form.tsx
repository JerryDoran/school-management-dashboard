'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type TeacherFormProps = {
  type: 'create' | 'update';
  data?: any;
};

const teacherSchema = z.object({
  username: z.string().min(3, 'User name must be at least 3 characters long!'),
  email: z.string().email({ message: 'Invalid email address!' }),
  password: z.string().min(6, 'Password must be at least 6 characters long!'),
  firstName: z.string().min(1, 'First name is required!'),
  lastName: z.string().min(1, 'Last name is required!'),
  phone: z.string().min(1, 'Phone number is required!'),
  address: z.string().min(1, 'Address is required!'),
  birthday: z.date({ message: 'Birthday is required!' }),
  sex: z.enum(['male', 'female'], { message: 'Sex is required!' }),
  image: z.instanceof(File, { message: 'Image is required!' }),
});

export default function TeacherForm({ type, data }: TeacherFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(teacherSchema),
  });
  
  return (
    <form action='' className='p-4 flex flex-col gap-4'>
      <input type='text' />
      <button className='bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center'>
        Delete
      </button>
    </form>
  );
}
