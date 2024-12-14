import { FieldError } from 'react-hook-form';

type FormInputProps = {
  label: string;
  type?: string;
  register: any;
  name: string;
  defaultValue?: string;
  error: FieldError;
  rest?: React.InputHTMLAttributes<HTMLInputElement>;
};

export default function FormInput({
  label,
  type = 'text',
  register,
  name,
  defaultValue,
  error,
  rest,
}: FormInputProps) {
  return (
    <div className='flex flex-col gap-2 w-full '>
      <label htmlFor='username' className='text-sm font-medium text-gray-500'>
        {label}
      </label>
      <input
        type={type}
        {...register(name)}
        {...rest}
        defaultValue={defaultValue}
        className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
      />
      {error?.message && (
        <span className='text-red-500 text-xs'>
          {error.message?.toString()}
        </span>
      )}
    </div>
  );
}
