'use client';

import React, { useRef, useState } from 'react';
import {
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { SubTypes, types } from "../admin/data";
import { FaCamera } from "react-icons/fa";

interface ProductModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedSubType, setSelectedSubType] = useState('');

  const handleTypeChange = (e: any) => {
    setSelectedType(e.target.value);
    setSelectedSubType('');
  };

  const handleSubTypeChange = (e: any) => {
    setSelectedSubType(e.target.value);
  };

  const selectedTypeObj = SubTypes.find(item => item.title === selectedType);
  const subTypes = selectedTypeObj ? selectedTypeObj.subTypes : [];

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const [inputData, setInputData] = useState<{ price?: number; set?: number; }>({
    price: undefined,
    set: undefined,
  });
  const handleInputChange = (key: 'price' | 'set', value: any) => {
    setInputData((prev) => ({ ...prev, [key]: value }));
  };

  const handleConfirm = async () => {
    if (!imageSrc) {
      console.error("No image selected");
      return;
    }

    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      console.error("No image file selected");
      return;
    }
    const formData = new FormData();
    const imageFile = fileInput.files[0];
    formData.append('image', imageFile);
    formData.append('productData', JSON.stringify({
      name: selectedSubType,
      price: inputData.price,
      set: inputData.set,
      maxGuests: 0,
      type: selectedType,
      recommended: false,
    }));

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        onOpenChange(false);
        setInputData({ price: undefined, set: undefined, });
        setImageSrc(null);
        setSelectedSubType('');
      } else {
        console.error("Upload failed.");
      }
    } catch (error) {
      console.error("Error while uploading:", error);
    }

  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">New Product</ModalHeader>
            <ModalBody>
              <Select
                className="max-w-full"
                label="Select Type"
                value={selectedType}
                onChange={handleTypeChange}
              >
                {SubTypes.map((item, index) => (
                  <SelectItem key={item.title} >
                    {item.title}
                  </SelectItem>
                ))}
              </Select>
              <Select
                className="max-w-full"
                label="Select SubType"
                value={selectedSubType}
                onChange={handleSubTypeChange}
                disabled={!selectedType}
              >
                {selectedType && subTypes.length > 0 ? (
                  subTypes.map((subType, index) => (
                    <SelectItem key={subType} value={subType}>
                      {subType}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem key="no-subtypes">No subtypes available</SelectItem>
                )}
              </Select>
              <div className="flex py-2 px-1 justify-between gap-4">
                <Input
                  type="number"
                  label="Price"
                  placeholder="0.00"
                  labelPlacement="outside"
                  value={inputData.price !== undefined ? inputData.price.toString() : ''}
                  onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">$</span>
                    </div>
                  }
                />
                <Input
                  type="number"
                  label="Set"
                  placeholder="0"
                  labelPlacement="outside"
                  value={inputData.set !== undefined ? inputData.set.toString() : ''}
                  onChange={(e) => handleInputChange('set', parseInt(e.target.value))}
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">Yds</span>
                    </div>
                  }
                />
              </div>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <Button color="success" onClick={handleButtonClick} endContent={<FaCamera />}>
                Take a photo
              </Button>

              {imageSrc && (
                <div className='my-4 w-full h-[200px] flexCenter'>
                  <img
                    src={imageSrc}
                    alt="Preview"
                    className='w-1/2 h-full rounded-lg'
                  />
                </div>
              )}

            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleConfirm}>
                Confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ProductModal;