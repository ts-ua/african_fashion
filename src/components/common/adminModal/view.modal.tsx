import { GoodInfo } from "@/type/good";
import { Button, Card, CardBody, CardFooter, CardHeader, Modal, ModalBody, ModalContent, ModalFooter, Skeleton } from "@nextui-org/react";
import Image from "next/image";

interface ViewProductModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  goodInfo: GoodInfo;
}

const ViewProductModal: React.FC<ViewProductModalProps> = ({
  isOpen,
  onOpenChange,
  goodInfo
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              <Card className="space-y-3 m-6 ">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <h4 className="font-bold text-large">{goodInfo.name}</h4>
                </CardHeader>
                <CardBody className="overflow-visible w-full h-[300px]  py-2">
                  <Image
                    src={goodInfo.coverImage}
                    alt="back"
                    width={200}
                    height={100} // Set to a positive height
                    className="w-full h-full "
                  />
                </CardBody>
                <CardFooter className="flex justify-between">
                  <h4 className="font-bold text-large">$ {goodInfo.price} / {goodInfo.set} yds</h4>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Confirm
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