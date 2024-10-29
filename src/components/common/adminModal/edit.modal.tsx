import { GoodInfo } from "@/type/good";
import { Button, Card, CardBody, CardFooter, CardHeader, Modal, ModalBody, ModalContent, ModalFooter, Input } from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";

interface ViewProductModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  goodInfo: GoodInfo;
}

const ViewProductModal: React.FC<ViewProductModalProps> = ({
  isOpen,
  onOpenChange,
  goodInfo,
}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [set, setSet] = useState('');
  const [filePreview, setFilePreview] = useState<string>('');
  useEffect(() => {
    setName(goodInfo.name);
    setPrice(goodInfo.price.toString());
    setSet(goodInfo.set.toString());
    setFilePreview(goodInfo.coverImage);
  }, [isOpen])


  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleButtonClick = () => {
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    file && formData.append('file', file);
    formData.append('productData', JSON.stringify({
      name: name,
      price: Number(price),
      set: Number(set),
    }));

    try {
      const response = await fetch(`/api/upload/${goodInfo.id}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        onOpenChange(false);
        setFile(null);
        setFilePreview('');
        window.location.assign('/admin/products');

      } else {
        const error = await response.json();
        console.error("Upload failed:", error.message);
      }
    } catch (error) {
      console.error("Error while uploading:", error);
    }



  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              <Card className="space-y-3 m-6">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <h4 className="font-bold text-large">Edit Product</h4>
                </CardHeader>
                <CardBody className="overflow-visible w-full">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative overflow-visible w-full h-[300px]">
                      <input
                        id="file-input"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                      />
                      <Image
                        src={filePreview}
                        alt="Product Image"
                        width={200}
                        height={100}
                        className="w-full h-full "
                      />
                      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Button color="danger" onClick={handleButtonClick} endContent={<FaCamera />}>

                        </Button>
                      </div>
                    </div>
                    <Input
                      label="Product Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <Input
                      label="Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                    <Input
                      label="Set (yds)"
                      value={set}
                      onChange={(e) => setSet(e.target.value)}
                      required
                    />
                  </form>
                </CardBody>
                <CardFooter className="flex justify-between">
                  <Button color="primary" type="submit" onClick={handleSubmit}>
                    Save Changes
                  </Button>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cancel
                  </Button>
                </CardFooter>
              </Card>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ViewProductModal;