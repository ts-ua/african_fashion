'use client'

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FaGoogle } from "react-icons/fa";
import { Avatar, Button, Input } from '@nextui-org/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { User } from 'next-auth';

export default function EditProfile() {
  const { status, data } = useSession();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [userData, setUserData] = useState({
    id: (data?.user as { id: string })?.id,
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePhoneChange = (value: string) => {
    setUserData((prevData) => ({ ...prevData, phone: value }));
  };


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleButtonClick = () => {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };



  const handleUserProfile = async (e: any) => {
    e.preventDefault();

    if (!file) {
      console.error("No image selected");
      return;
    }
    console.log("id:", userData.id)
    const formData = new FormData();
    formData.append('file', file);
    formData.append('UpdatedData', JSON.stringify({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      phone: userData.phone
    }));

    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        window.location.assign("/");
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="min-h-screen justify-center text-center flex flex-col items-center bg-gray-50 dark:bg-gray-800">
      <div className='flex flex-col border dark:border-primaryHotefy-lighter dark:bg-[#18181b] items-center justify-center p-8 rounded-lg max-w-md shadow-lg'>

        <form className="flex flex-col gap-4 items-center w-full" onSubmit={handleUserProfile}>
          <div className='flex justify-center items-center gap-4 p-6'>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <Avatar
              isBordered
              as='button'
              className="transition-transform w-24 h-24"
              color="secondary"
              name=""
              src={filePreview ? filePreview : data?.user?.image || undefined}
              onClick={handleButtonClick}
            />
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              {data?.user?.name}
            </h1>
          </div>
          <Input
            fullWidth
            placeholder={data?.user?.name || undefined}
            label="UserName"
            name="name"
            value={userData?.name}
            onChange={handleChange}
            type="text"
            required
          />
          <Input
            fullWidth
            placeholder={data?.user?.email || undefined}
            label="Email"
            name="email"
            value={userData?.email}
            onChange={handleChange}
            type="email"
            required
          />
          <div className="w-full">
            <PhoneInput
              country={'us'}
              value={userData?.phone}
              onChange={handlePhoneChange}
              inputStyle={{
                width: '100%',
                border: 'none',
                padding: '25px 50px',
                background: '#27272A',
              }}
              dropdownStyle={{
                background: '#27272A',
                color: 'gray'
              }}
              placeholder="Enter your phone number"
            />
          </div>
          <div className='w-full gap-4 flex'>

            <Button
              type="submit"
              className="w-full bg-secondary text-white float-left"
            >
              Save
            </Button>
            <Button
              className="w-full text-white float-right "
              color="danger"
              onClick={() => router.push('/')}
            >
              Cancel
            </Button>
          </div>
        </form>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
        </div>
      </div>
    </div>
  );
}
